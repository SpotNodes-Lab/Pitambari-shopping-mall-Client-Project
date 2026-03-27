import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";

/** Matches SectionHeader / site section motion */
const BANNER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  fetchHomepage,
  normalizeMainBanner,
  type HomepageMainBanner,
} from "@/services/cmsApi";

// Import local assets
import slide1 from "@/assets/mainBanner1.png";
import slide2 from "@/assets/mainBanner2.png";
import slide3 from "@/assets/mainBanner3.png";
const staticBannerTop =
  "https://shreedholisatiretailmall.com/wp-content/uploads/2025/10/A-15.jpg";
const staticBannerBottom =
  "https://shreedholisatiretailmall.com/wp-content/uploads/2025/10/C-14-1.png";

const staticBannerHoverTransition = {
  duration: 0.55,
  ease: BANNER_EASE,
};

type BannerSlide = {
  id: number;
  image: string;
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  buttonText: string;
};

/** Static hero when CMS has no carousel or API is unavailable. */
const FALLBACK_SLIDES: BannerSlide[] = [
  {
    id: 1,
    image: slide1,
    eyebrow: "LUXURY COLLECTION",
    headingLine1: "Festive Edit:",
    headingLine2: "25% Off",
    buttonText: "SHOP NOW",
  },
  {
    id: 2,
    image: slide2,
    eyebrow: "HERITAGE WEAR",
    headingLine1: "Timeless",
    headingLine2: "Elegance",
    buttonText: "EXPLORE",
  },
  {
    id: 3,
    image: slide3,
    eyebrow: "WEDDING SPECIAL",
    headingLine1: "Bridal",
    headingLine2: "Masterpieces",
    buttonText: "VIEW COLLECTION",
  },
];

const OVERLAY_TEMPLATES = FALLBACK_SLIDES.map(
  ({ eyebrow, headingLine1, headingLine2, buttonText }) => ({
    eyebrow,
    headingLine1,
    headingLine2,
    buttonText,
  }),
);

function buildSlidesFromApiCarousel(urls: string[]): BannerSlide[] {
  return urls.map((image, i) => {
    const t = OVERLAY_TEMPLATES[i % OVERLAY_TEMPLATES.length];
    return {
      id: i + 1,
      image,
      eyebrow: t.eyebrow,
      headingLine1: t.headingLine1,
      headingLine2: t.headingLine2,
      buttonText: t.buttonText,
    };
  });
}

export function BannerSection() {
  const [apiMainBanner, setApiMainBanner] = useState<HomepageMainBanner | null>(
    null,
  );

  useEffect(() => {
    let cancelled = false;
    fetchHomepage().then((payload) => {
      if (cancelled || !payload?.mainBanner) return;
      setApiMainBanner(payload.mainBanner);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const { resolvedSlides, rightTopSrc, rightBottomSrc, carouselKey } =
    useMemo(() => {
      const norm = normalizeMainBanner(apiMainBanner ?? undefined);
      if (norm.carouselImages.length === 0) {
        return {
          resolvedSlides: FALLBACK_SLIDES,
          rightTopSrc: staticBannerTop,
          rightBottomSrc: staticBannerBottom,
          carouselKey: "fallback",
        };
      }
      const slides = buildSlidesFromApiCarousel(norm.carouselImages);
      let rightTopSrc = staticBannerTop;
      let rightBottomSrc = staticBannerBottom;
      if (norm.rightImages.length >= 2) {
        rightTopSrc = norm.rightImages[0];
        rightBottomSrc = norm.rightImages[1];
      } else if (norm.rightImages.length === 1) {
        rightTopSrc = norm.rightImages[0];
        rightBottomSrc = staticBannerBottom;
      }
      return {
        resolvedSlides: slides,
        rightTopSrc,
        rightBottomSrc,
        carouselKey: norm.carouselImages.join("|"),
      };
    }, [apiMainBanner]);

  const prefersReducedMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: true }, [
    Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const staticBannerWhileHover = prefersReducedMotion
    ? undefined
    : { y: -3, transition: staticBannerHoverTransition };

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );
  
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    // Tween engine for scale "sliding over" depth effect
    const tweenScale = () => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      
      emblaApi.scrollSnapList().forEach((scrollSnap, index) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[index];
        
        slidesInSnap.forEach((slideIndex) => {
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();
              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);
                if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
                if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            });
          }
          
          const tweenValue = 1 - Math.abs(diffToTarget * 0.5); // scale calculation
          const scale = Math.max(0.95, Math.min(1, tweenValue));
          const opacity = Math.max(0.3, Math.min(1, tweenValue + 0.2));
          
          const slideNode = emblaApi.slideNodes()[slideIndex];
          if (slideNode) {
            const inner = slideNode.querySelector('.slide-inner') as HTMLElement;
            if (inner) {
              inner.style.transform = `scale(${scale})`;
              inner.style.opacity = `${opacity}`;
            }
          }
        });
      });
    };
    
    emblaApi.on("scroll", tweenScale);
    tweenScale(); // initial call
    
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("scroll", tweenScale);
    };
  }, [emblaApi, onSelect]);

  return (
    <Section>
      <GridContainer>
        {/* Left Side Slider (70%) */}
        <MainSlider
          key={carouselKey}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.5, ease: BANNER_EASE }}
        >
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {resolvedSlides.map((slide, index) => (
                <EmblaSlide key={`${carouselKey}-${index}`}>
                  <SlideInner className="slide-inner">
                    <SlideImage src={slide.image} alt={`Slide ${index + 1}`} />
                    <SlideOverlay>
                      <OverlayContent>
                        <Eyebrow>{slide.eyebrow}</Eyebrow>
                        <Heading>
                          {slide.headingLine1}
                          <br />
                          {slide.headingLine2}
                        </Heading>
                        <Button variant="primary" size="lg">
                          {slide.buttonText}
                        </Button>
                      </OverlayContent>
                    </SlideOverlay>
                  </SlideInner>
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>

          <SliderControl direction="prev" onClick={scrollPrev} aria-label="Previous slide">
            <ChevronLeft size={28} strokeWidth={1.5} />
          </SliderControl>
          
          <SliderControl direction="next" onClick={scrollNext} aria-label="Next slide">
            <ChevronRight size={28} strokeWidth={1.5} />
          </SliderControl>

          <SliderNav>
            {resolvedSlides.map((_, index) => (
              <NavDot
                key={index}
                $active={index === selectedIndex}
                onClick={() => scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </SliderNav>
        </MainSlider>

        {/* Right Side Static Banners (30%) */}
        <StaticBanners>
          <StaticBanner
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.78, ease: BANNER_EASE }}
            whileHover={staticBannerWhileHover}
          >
            <StaticImage src={rightTopSrc} alt="Bridal Couture" />
          </StaticBanner>

          <StaticBanner
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 1.02, ease: BANNER_EASE }}
            whileHover={staticBannerWhileHover}
          >
            <StaticImage src={rightBottomSrc} alt="New Arrivals" />
          </StaticBanner>
        </StaticBanners>
      </GridContainer>
    </Section>
  );
}

// ==========================================
// Styled Components
// ==========================================

const Section = styled.section`
  width: 100%;
  padding-top: var(--section-y-tight);
  padding-bottom: clamp(0.75rem, 1.5vw, 1.25rem);
  background-color: var(--color-background);
  overflow: hidden;
`;

const GridContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding-left: calc(var(--page-gutter-x) + env(safe-area-inset-left, 0px));
  padding-right: calc(var(--page-gutter-x) + env(safe-area-inset-right, 0px));

  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 6.8fr) minmax(0, 3.2fr);
    height: 600px;
  }
  
  @media (min-width: 1280px) {
    height: 700px;
  }
`;

const MainSlider = styled(motion.div)`
  position: relative;
  width: 100%;
  min-width: 0;
  height: 65vh;
  min-height: 450px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  @media (min-width: 1024px) {
    height: 100%;
    min-height: auto;
  }
`;

const EmblaViewport = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

const EmblaContainer = styled.div`
  display: flex;
  height: 100%;
  touch-action: pan-y;
`;

const EmblaSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  position: relative;
  height: 100%;
  padding: 0;
`;

const SlideInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  transform-origin: center;
  will-change: transform, opacity;
  transition: transform 0.1s ease-out, opacity 0.1s ease-out;
`;

const SlideImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: scale(1) translate3d(0, 0, 0) rotate(0deg);
  transform-origin: 52% 48%;
  filter: brightness(1) saturate(1);
  transition: transform 1.55s cubic-bezier(0.18, 0.82, 0.22, 1),
    filter 1.1s cubic-bezier(0.22, 1, 0.36, 1);

  ${MainSlider}:hover & {
    will-change: transform, filter;
    transform: scale(1.14) translate3d(2.2%, -1.8%, 0) rotate(0.9deg);
    filter: brightness(1.09) saturate(1.14) contrast(1.03);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    ${MainSlider}:hover & {
      transform: scale(1) translate3d(0, 0, 0) rotate(0deg);
      filter: brightness(1) saturate(1);
    }
  }
`;

const SlideOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.2) 40%,
    transparent 100%
  );
  display: flex;
  align-items: center;
  padding: 2.5rem;
  transition: background 0.85s cubic-bezier(0.22, 1, 0.36, 1);

  ${MainSlider}:hover & {
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.42) 0%,
      rgba(0, 0, 0, 0.14) 42%,
      transparent 100%
    );
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

const SliderControl = styled.button<{ direction: "prev" | "next" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.direction === "prev" ? "left: 1rem;" : "right: 1rem;")}
  
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.3s ease;
  
  opacity: 0;
  
  ${MainSlider}:hover & {
    opacity: 1;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-50%) scale(1.05);
  }
  
  @media (min-width: 768px) {
    ${(props) => (props.direction === "prev" ? "left: 2rem;" : "right: 2rem;")}
    width: 52px;
    height: 52px;
  }
`;

const OverlayContent = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #fff;
`;

const Eyebrow = styled.span`
  font-family: var(--font-label);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-size: 0.8rem;
  margin-bottom: 1.2rem;
  opacity: 0.9;

  @media (min-width: 768px) {
    font-size: 0.85rem;
    letter-spacing: 0.2em;
  }
`;

const Heading = styled.h2`
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: clamp(2.5rem, 5.5vw, 4.5rem);
  font-weight: 400;
  line-height: 1.1;
  margin-bottom: 2.5rem;
  color: #fff;
  letter-spacing: -0.01em;
`;

const SliderNav = styled.div`
  position: absolute;
  bottom: 2.5rem;
  left: 2.5rem;
  display: flex;
  gap: 0.75rem;
  z-index: 10;

  @media (min-width: 768px) {
    left: 4rem;
  }
`;

const NavDot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #fff;
  opacity: ${(props) => (props.$active ? 1 : 0.4)};
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  ${(props) =>
    props.$active &&
    `
    transform: scale(1.3);
  `}
`;

const StaticBanners = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;

  @media (min-width: 1024px) {
    height: 100%;
    min-height: 0;
  }
`;

const StaticBanner = styled(motion.div)`
  position: relative;
  width: 100%;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  background-color: #f1f1f1;
  cursor: pointer;
  transition: box-shadow 0.7s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.14);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: box-shadow 0.2s ease;
  }

  /* Fixed square tiles: layout size is never driven by image intrinsic dimensions */
  aspect-ratio: 1 / 1;
  flex: 0 0 auto;

  @media (min-width: 1024px) {
    aspect-ratio: unset;
    flex: 1 1 0;
    min-height: 0;
  }
`;

const StaticImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transform: scale(1) translate3d(0, 0, 0);
  transform-origin: 50% 78%;
  filter: brightness(1) saturate(1);
  transition: transform 1.5s cubic-bezier(0.18, 0.82, 0.22, 1),
    filter 1.05s cubic-bezier(0.22, 1, 0.36, 1);

  ${StaticBanner}:hover & {
    will-change: transform, filter;
    transform: scale(1.2) translate3d(0, -4.5%, 0);
    filter: brightness(1.08) saturate(1.18) contrast(1.04);
  }

  ${StaticBanners} ${StaticBanner}:first-of-type & {
    transform-origin: 68% 42%;
  }

  ${StaticBanners} ${StaticBanner}:first-of-type:hover & {
    transform: scale(1.2) translate3d(3.5%, -3%, 0) rotate(0.65deg);
  }

  ${StaticBanners} ${StaticBanner}:last-of-type & {
    transform-origin: 32% 58%;
  }

  ${StaticBanners} ${StaticBanner}:last-of-type:hover & {
    transform: scale(1.2) translate3d(-3.5%, -3%, 0) rotate(-0.65deg);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform-origin: center;

    ${StaticBanner}:hover &,
    ${StaticBanners} ${StaticBanner}:first-of-type:hover &,
    ${StaticBanners} ${StaticBanner}:last-of-type:hover & {
      transform: scale(1) translate3d(0, 0, 0);
      filter: brightness(1) saturate(1);
    }
  }
`;

