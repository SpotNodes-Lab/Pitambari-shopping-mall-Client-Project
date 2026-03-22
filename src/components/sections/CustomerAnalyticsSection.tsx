import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useCountUp } from "@/hooks/useCountUp";

export interface AnalyticsStat {
  end: number;
  suffix: string;
  label: string;
}

interface CustomerAnalyticsSectionProps {
  image: string;
  imageAlt?: string;
  headline?: string;
  description?: string;
  stats?: readonly AnalyticsStat[];
}

const DEFAULT_STATS: readonly AnalyticsStat[] = [
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
  imageAlt = "Pitambari Shopping Mall collection",
  headline = "Best fashion collection for all generations",
  description = "Discover curated fashion and retail for every generation—from children to elders—all under one roof at Pitambari Shopping Mall.",
  stats = DEFAULT_STATS,
}: CustomerAnalyticsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [countersActive, setCountersActive] = useState(false);

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
              {stats.map((s) => (
                <StatCard
                  key={s.label}
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
            <ImageFrame>
              <Img src={image} alt={imageAlt} loading="lazy" />
            </ImageFrame>
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

const Img = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  background-color: #eeeeee;
`;
