import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_HERO_SLIDES } from "@/constants";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const AUTO_MS = 5500;

export function GalleryHeroSlideshow() {
  const slides = GALLERY_HERO_SLIDES;
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion, slides.length]);

  const current = slides[index];

  return (
    <Section
      aria-roledescription="carousel"
      aria-label="Featured gallery highlights"
    >
      <Container>
        <Viewport>
          <AnimatePresence mode="wait" initial={false}>
            <SlideLayer
              key={current.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 1.02, filter: "blur(6px)" }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, scale: 1, filter: "blur(0px)" }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, scale: 0.99, filter: "blur(4px)" }
              }
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.75,
                ease: EASE,
              }}
            >
              <KenBurns
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.04, 1] }
                }
                transition={
                  prefersReducedMotion
                    ? undefined
                    : {
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }
                }
                style={{ transformOrigin: "50% 50%" }}
              >
                <SlideImage
                  src={current.image}
                  alt={current.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </KenBurns>
              <Vignette aria-hidden />
              <Shine
                aria-hidden
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: "120%", opacity: [0, 0.12, 0] }}
                transition={{
                  duration: 2.4,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              />
            </SlideLayer>
          </AnimatePresence>

          <NavButton
            type="button"
            aria-label="Previous slide"
            onClick={() => go(-1)}
          >
            <ChevronLeft size={26} strokeWidth={1.5} />
          </NavButton>
          <NavButton
            type="button"
            $side="right"
            aria-label="Next slide"
            onClick={() => go(1)}
          >
            <ChevronRight size={26} strokeWidth={1.5} />
          </NavButton>
        </Viewport>

        <Dots role="tablist" aria-label="Slide indicators">
          {slides.map((s, i) => (
            <Dot
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1} of ${slides.length}`}
              $active={i === index}
              onClick={() => goTo(i)}
            />
          ))}
        </Dots>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding-top: 0;
  padding-bottom: clamp(2rem, 5vw, 3.25rem);
  background: linear-gradient(180deg, #faf9f7 0%, #ffffff 55%);
`;

const Container = styled.div`
  /* Full gallery rail width (matches image grid below) */
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: calc(var(--page-gutter-x, 1.5rem) + env(safe-area-inset-left, 0px));
  padding-right: calc(var(--page-gutter-x, 1.5rem) + env(safe-area-inset-right, 0px));
`;

const Viewport = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  border-radius: clamp(10px, 1.2vw, 16px);
  overflow: hidden;
  aspect-ratio: 16 / 9;
  min-height: clamp(300px, 56vw, 440px);
  max-height: min(72vh, 640px);
  box-shadow:
    0 24px 60px rgba(20, 18, 14, 0.12),
    0 0 0 1px rgba(0, 0, 0, 0.04) inset;

  @media (max-width: 768px) {
    aspect-ratio: 4 / 3;
    min-height: clamp(240px, 62vw, 360px);
    max-height: min(58vh, 520px);
  }
`;

const SlideLayer = styled(motion.div)`
  position: absolute;
  inset: 0;
`;

const KenBurns = styled(motion.div)`
  position: absolute;
  inset: 0;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Slight horizontal bias helps left-weighted editorial crops feel centered in frame */
  object-position: 46% 48%;
  display: block;

  @media (max-width: 768px) {
    object-position: 50% 45%;
  }
`;

const Vignette = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 90% 85% at 50% 50%,
    transparent 35%,
    rgba(0, 0, 0, 0.14) 100%
  );
`;

const Shine = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 38%;
  height: 100%;
  pointer-events: none;
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.22) 48%,
    rgba(255, 255, 255, 0) 100%
  );
  mix-blend-mode: soft-light;
`;

const NavButton = styled.button<{ $side?: "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(p) => (p.$side === "right" ? "right: 0.75rem;" : "left: 0.75rem;")}
  z-index: 4;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(0, 0, 0, 0.28);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition:
    background 0.25s ease,
    transform 0.25s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.45);
    transform: translateY(-50%) scale(1.05);
  }

  @media (max-width: 480px) {
    width: 38px;
    height: 38px;
    ${(p) => (p.$side === "right" ? "right: 0.5rem;" : "left: 0.5rem;")}
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.1rem;
  flex-wrap: wrap;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: ${(p) => (p.$active ? "1.65rem" : "7px")};
  height: 7px;
  border-radius: 999px;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${(p) =>
    p.$active
      ? "color-mix(in srgb, var(--color-primary) 88%, #000)"
      : "rgba(0, 0, 0, 0.18)"};
  transition:
    width 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    background 0.25s ease;
  opacity: ${(p) => (p.$active ? 1 : 0.55)};

  &:hover {
    opacity: 1;
  }
`;
