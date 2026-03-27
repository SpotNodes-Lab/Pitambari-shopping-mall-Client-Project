import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { VerticalMediaEmbed } from "@/components/shared/VerticalMediaEmbed";
import { useCountUp } from "@/hooks/useCountUp";
import { isEmbeddableMediaUrl } from "@/utils/socialEmbed";

export interface AnalyticsStat {
  end: number;
  suffix: string;
  label: string;
}

interface CustomerAnalyticsSectionProps {
  image: string;
  imageAlt?: string;
  /** Use `contain` for square or logo-style promos so nothing is cropped. */
  imageObjectFit?: "cover" | "contain";
  headline?: string;
  description?: string;
  stats?: readonly AnalyticsStat[];
}

/** Fallback when CMS `insights.stats` is empty (also re-used by `insightsFromHomepage`). */
export const DEFAULT_ANALYTICS_STATS: readonly AnalyticsStat[] = [
  { end: 125, suffix: "+", label: "Unique products" },
  { end: 10, suffix: "k+", label: "Happy customers" },
  { end: 40, suffix: "+", label: "Product dealers" },
  { end: 10, suffix: "+", label: "Awards won" },
];

function StatCard({
  end,
  suffix,
  label,
  active,
  durationMs,
}: AnalyticsStat & { active: boolean; durationMs: number }) {
  const value = useCountUp(end, durationMs, active);
  return (
    <StatCell>
      <StatNumber>
        {value}
        {suffix}
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatCell>
  );
}

export function CustomerAnalyticsSection({
  image,
  imageAlt = "Pitambari collection",
  imageObjectFit = "cover",
  headline = "Best fashion collection for all generations",
  description = "Discover curated fashion and retail for every generation—from children to elders—all under one roof at Pitambari.",
  stats = DEFAULT_ANALYTICS_STATS,
}: CustomerAnalyticsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [countersActive, setCountersActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCountersActive(true);
          observer.disconnect();
        }
      },
      { root: null, threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const useRichMedia = isEmbeddableMediaUrl(image);

  return (
    <Section ref={sectionRef}>
      <Container>
        <Grid>
          <ContentCol
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            <Headline>{headline}</Headline>
            <Subtext>{description}</Subtext>
            <StatsGrid>
              {stats.map((s, idx) => (
                <StatCard
                  key={`${idx}-${s.label}`}
                  {...s}
                  active={countersActive}
                  durationMs={1800}
                />
              ))}
            </StatsGrid>
          </ContentCol>

          <ImageCol
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          >
            <ImageFloat
              animate={
                prefersReducedMotion
                  ? undefined
                  : { y: [0, -10, 0] }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            >
              <MotionImageFrame
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: -6,
                        boxShadow: "0 22px 56px rgba(0, 0, 0, 0.14)",
                        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                      }
                }
              >
                <ImageClip>
                  <ImageReveal
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 1.06 }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, scale: 1 }
                    }
                    viewport={{ once: true, amount: 0.28 }}
                    transition={{
                      duration: 0.95,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <ImageBreathe
                      style={{ transformOrigin: "center center" }}
                      animate={
                        prefersReducedMotion
                          ? undefined
                          : { scale: [1, 1.035, 1] }
                      }
                      transition={
                        prefersReducedMotion
                          ? undefined
                          : {
                              duration: 7,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                      }
                    >
                      {useRichMedia ? (
                        <EmbedMediaShell>
                          <VerticalMediaEmbed
                            url={image}
                            alt={imageAlt}
                          />
                        </EmbedMediaShell>
                      ) : (
                        <Img
                          src={image}
                          alt={imageAlt}
                          loading="lazy"
                          $objectFit={imageObjectFit}
                        />
                      )}
                    </ImageBreathe>
                  </ImageReveal>
                </ImageClip>
              </MotionImageFrame>
            </ImageFloat>
          </ImageCol>
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding-top: clamp(3rem, 8vw, 5.5rem);
  padding-bottom: clamp(3rem, 8vw, 5.5rem);
  background-color: #f8f8f8;
`;

const Container = styled.div`
  max-width: 1250px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  align-items: center;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 0.95fr;
    gap: 4rem;
  }
`;

const ContentCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Headline = styled.h2`
  font-family: var(--font-headline);
  font-weight: 700;
  font-size: clamp(1.35rem, 2.5vw, 1.85rem);
  line-height: 1.25;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #333333;
  margin: 0;
`;

const Subtext = styled.p`
  font-family: var(--font-body);
  font-size: 0.95rem;
  line-height: 1.75;
  color: #666666;
  margin: 0;
  max-width: 36rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;

  @media (min-width: 480px) {
    gap: 1.25rem;
  }
`;

const StatCell = styled.div`
  background: #ffffff;
  border-radius: 2px;
  padding: 1.35rem 1rem;
  text-align: center;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.06);

  @media (min-width: 480px) {
    padding: 1.5rem 1.25rem;
  }
`;

const StatNumber = styled.div`
  font-family: var(--font-headline);
  font-weight: 700;
  font-size: clamp(1.65rem, 4vw, 2.25rem);
  color: #222222;
  line-height: 1.1;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-family: var(--font-label);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #777777;
`;

const ImageCol = styled(motion.div)`
  justify-self: center;
  width: 100%;
  max-width: 420px;

  @media (min-width: 900px) {
    max-width: none;
    justify-self: end;
  }
`;

const ImageFrame = styled.div`
  background: #ffffff;
  padding: 6px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
`;

const ImageFloat = styled(motion.div)``;

const MotionImageFrame = motion(ImageFrame);

const ImageClip = styled.div`
  overflow: hidden;
`;

const ImageReveal = styled(motion.div)``;

const ImageBreathe = styled(motion.div)``;

const EmbedMediaShell = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  background-color: #eeeeee;
`;

const Img = styled.img<{ $objectFit: "cover" | "contain" }>`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: ${({ $objectFit }) => $objectFit};
  object-position: center;
  background-color: #eeeeee;
`;
