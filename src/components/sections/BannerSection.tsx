import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Matches SectionHeader / site section motion */
const BANNER_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
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

/** Carousel uses intrinsic image height / width below this breakpoint */
const BANNER_AUTO_LAYOUT_MQ = "(max-width: 700px)";

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

  @media (max-width: 700px) {
    width: auto;
    max-width: 100%;
    height: auto;
    min-height: 0;
  }

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

  @media (max-width: 700px) {
    width: auto;
    max-width: 100%;
    height: auto;
    min-height: 0;
  }

  @media (min-width: 1024px) {
    height: 100%;
    min-height: auto;
  }
`;

const EmblaViewport = styled.div`
  overflow: hidden;
  height: 100%;
  width: 100%;

  @media (max-width: 700px) {
    width: auto;
    max-width: 100%;
    height: auto;
  }
`;

const EmblaContainer = styled.div`
  display: flex;
  height: 100%;
  touch-action: pan-y;

  @media (max-width: 700px) {
    height: auto;
    align-items: flex-start;
  }
`;

const EmblaSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
  position: relative;
  height: 100%;
  padding: 0;

  @media (max-width: 700px) {
    height: auto;
    min-height: 0;
  }
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

  @media (max-width: 700px) {
    width: auto;
    max-width: 100%;
    height: auto;
    min-height: 0;
    will-change: auto;
    transition: none;
  }
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

  @media (max-width: 700px) {
    position: relative;
    inset: auto;
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: contain;
    object-position: center;
    transform: none;
    filter: brightness(1) saturate(1);

    ${MainSlider}:hover & {
      transform: none;
      filter: brightness(1) saturate(1);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    ${MainSlider}:hover & {
      transform: scale(1) translate3d(0, 0, 0) rotate(0deg);
      filter: brightness(1) saturate(1);
    }
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
  background-color: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.22);
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    opacity 0.25s ease,
    transform 0.25s ease;

  /* Touch / coarse pointers: always visible (no hover) */
  opacity: 0.88;

  @media (hover: hover) and (pointer: fine) {
    opacity: 0;
    ${MainSlider}:hover & {
      opacity: 1;
    }
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.28);
    border-color: rgba(255, 255, 255, 0.45);
    transform: translateY(-50%) scale(1.05);
  }

  &:focus-visible {
    opacity: 1;
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  @media (min-width: 768px) {
    ${(props) => (props.direction === "prev" ? "left: 2rem;" : "right: 2rem;")}
    width: 52px;
    height: 52px;
  }
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



type BannerSlide = {
  id: number;
  image: string;
};

/** Static hero when CMS has no carousel or API is unavailable. */
const FALLBACK_SLIDES: BannerSlide[] = [
  { id: 1, image: slide1 },
  { id: 2, image: slide2 },
  { id: 3, image: slide3 },
];

function buildSlidesFromApiCarousel(urls: string[]): BannerSlide[] {
  return urls.map((image, i) => ({
    id: i + 1,
    image,
  }));
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
    Autoplay({
      delay: 5500,
      /* Keep advancing after prev/next; pause only while pointer is over slider */
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const scrollPrev = useCallback(
    () => emblaApi?.scrollPrev(),
    [emblaApi],
  );

  const scrollNext = useCallback(
    () => emblaApi?.scrollNext(),
    [emblaApi],
  );

  const staticBannerWhileHover = prefersReducedMotion
    ? undefined
    : { y: -3, transition: staticBannerHoverTransition };

  useEffect(() => {
    if (!emblaApi) return;

    const mq = window.matchMedia(BANNER_AUTO_LAYOUT_MQ);

    const clearSlideTweenStyles = () => {
      emblaApi.slideNodes().forEach((slideNode) => {
        const inner = slideNode.querySelector(".slide-inner") as HTMLElement | null;
        if (inner) {
          inner.style.transform = "";
          inner.style.opacity = "";
        }
      });
    };

    // Tween engine for scale "sliding over" depth effect (disabled ≤700px — layout is height:auto)
    const tweenScale = () => {
      if (mq.matches) {
        clearSlideTweenStyles();
        return;
      }

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
            const inner = slideNode.querySelector(".slide-inner") as HTMLElement;
            if (inner) {
              inner.style.transform = `scale(${scale})`;
              inner.style.opacity = `${opacity}`;
            }
          }
        });
      });
    };

    const onBreakpointChange = () => {
      tweenScale();
      emblaApi.reInit();
    };

    emblaApi.on("scroll", tweenScale);
    mq.addEventListener("change", onBreakpointChange);
    tweenScale();

    return () => {
      emblaApi.off("scroll", tweenScale);
      mq.removeEventListener("change", onBreakpointChange);
    };
  }, [emblaApi]);

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
                  </SlideInner>
                </EmblaSlide>
              ))}
            </EmblaContainer>
          </EmblaViewport>

          <SliderControl
            type="button"
            direction="prev"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} strokeWidth={1.5} />
          </SliderControl>

          <SliderControl
            type="button"
            direction="next"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ChevronRight size={28} strokeWidth={1.5} />
          </SliderControl>
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

