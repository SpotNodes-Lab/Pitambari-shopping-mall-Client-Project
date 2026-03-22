import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

/** Matches SectionHeader / site section motion */
const BANNER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// Import local assets
import slide1 from "@/assets/mainBanner1.png";
import slide2 from "@/assets/mainBanner2.png";
import slide3 from "@/assets/mainBanner3.png";
import staticBannerTop from "@/assets/smallBanner1.jpeg";
import staticBannerBottom from "@/assets/SmallBanner2.jpeg";

const slides = [
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

export function BannerSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, watchDrag: true }, [
    Autoplay({ delay: 5500, stopOnInteraction: true, stopOnMouseEnter: true }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.5, ease: BANNER_EASE }}
        >
          <EmblaViewport ref={emblaRef}>
            <EmblaContainer>
              {slides.map((slide, index) => (
                <EmblaSlide key={index}>
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
            {slides.map((_, index) => (
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
          >
            <StaticImage src={staticBannerTop} alt="Bridal Couture" />
            <StaticOverlay>
              <StaticContent>
                <StaticHeading>Bridal Couture</StaticHeading>
                <StaticLink>DISCOVER</StaticLink>
              </StaticContent>
            </StaticOverlay>
          </StaticBanner>

          <StaticBanner
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 1.02, ease: BANNER_EASE }}
          >
            <StaticImage src={staticBannerBottom} alt="New Arrivals" />
            <StaticOverlay>
              <StaticContent>
                <StaticHeading>New Arrivals</StaticHeading>
                <StaticLink>VIEW ALL</StaticLink>
              </StaticContent>
            </StaticOverlay>
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
  transition: transform 0.8s ease;
  display: block;

  ${StaticBanner}:hover & {
    transform: scale(1.05);
  }
`;

const StaticOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.45) 0%,
    rgba(0, 0, 0, 0.1) 40%,
    transparent 100%
  );
`;

const StaticContent = styled.div`
  position: absolute;
  left: 50%;
  bottom: max(
    clamp(1.75rem, 6vmin, 3.25rem),
    calc(env(safe-area-inset-bottom, 0px) + 0.75rem)
  );
  transform: translateX(-50%);
  width: min(100% - 2rem, 22rem);
  max-width: calc(100% - 2rem);
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
  /* Keeps serif descenders / link underline inside overflow-hidden banner */
  padding-bottom: 0.35em;
`;

const StaticHeading = styled.h3`
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: clamp(1.35rem, 4.2vmin, 1.75rem);
  font-weight: 400;
  line-height: 1.2;
  margin: 0 0 0.5rem;
  padding-bottom: 0.08em;
  letter-spacing: 0.02em;
`;

const StaticLink = styled.span`
  font-family: var(--font-label);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 600;
  line-height: 1.35;
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  padding-bottom: 4px;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-bottom-color: #fff;
  }
`;
