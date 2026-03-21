import { motion } from "framer-motion";
import styled from "styled-components";

interface HeroData {
  title: string;
  subtitle: string;
  description: string;
  mainImage: string;
  secondaryImage: string;
}

interface HeroSectionProps {
  data: HeroData | null;
  isLoading: boolean;
}

export function HeroSection({ data, isLoading }: HeroSectionProps) {
  if (isLoading || !data) {
    return <Section $isLoading />;
  }

  const displayTitle = data.title || "Elegance Rooted in Tradition";
  const displayDesc =
    data.description ||
    "Discover a curated symphony of rich silks, intricate zari work, and timeless silhouettes. Experience our grand bridal collections and classic menswear in person.";

  return (
    <Section>
      <Container>
        {/* Left Side: Indian Heritage Showcase */}
        <ContentWrapper
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Subtle background illustration behind the text */}
          <BackgroundMandala>
            <svg
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
            >
              <path d="M50 0C50 25 25 50 0 50C25 50 50 75 50 100C50 75 75 50 100 50C75 50 50 25 50 0Z" />
              <circle cx="50" cy="50" r="30" strokeDasharray="2 4" />
              <circle cx="50" cy="50" r="15" />
            </svg>
          </BackgroundMandala>

          <EyebrowContainer>
            <Eyebrow>Over 80 Years of Legacy</Eyebrow>
          </EyebrowContainer>

          <Title>
            <span className="serif-italic">{displayTitle.split(" ")[0]}</span>{" "}
            <br />
            {displayTitle.split(" ").slice(1).join(" ")}
          </Title>

          <Description>{displayDesc}</Description>

          <DecorativeDivider>
            <svg viewBox="0 0 50 10" fill="currentColor">
              <circle cx="5" cy="5" r="2" />
              <line
                x1="15"
                y1="5"
                x2="35"
                y2="5"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="45" cy="5" r="2" />
            </svg>
          </DecorativeDivider>

          {/* Replaced Buttons with an elegant Showcase Grid */}
          <ShowcaseGrid>
            <FeatureItem>
              <IconWrapper>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 22C12 22 20 16 20 9C20 4.58172 16.4183 1 12 1C7.58172 1 4 4.58172 4 9C4 16 12 22 12 22Z" />
                  <path d="M12 13C14.2091 13 16 11.2091 16 9C16 6.79086 14.2091 5 12 5C9.79086 5 8 6.79086 8 9C8 11.2091 9.79086 13 12 13Z" />
                </svg>
              </IconWrapper>
              <FeatureText>
                <strong>Flagship Showrooms</strong>
                <span>Visit our grand locations</span>
              </FeatureText>
            </FeatureItem>

            <FeatureItem>
              <IconWrapper>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 4L4 5L5 6L6 5L5 4Z" />
                  <path d="M19 4L18 5L19 6L20 5L19 4Z" />
                  <path d="M12 2L15 9h7l-5.5 4.5L18 22l-6-4.5L6 22l1.5-8.5L2 9h7z" />
                </svg>
              </IconWrapper>
              <FeatureText>
                <strong>Bridal Couture</strong>
                <span>Exquisite hand-worked Lehengas</span>
              </FeatureText>
            </FeatureItem>
          </ShowcaseGrid>
        </ContentWrapper>

        {/* Right Side: Editorial Image Composition */}
        <ImageComposition>
          <MainImageWrapper
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <img src={data.mainImage} alt="Bridal Lehenga / Featured Look" />
          </MainImageWrapper>

          <SecondaryImageWrapper
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <img src={data.secondaryImage} alt="Sherwani / Collection Detail" />
          </SecondaryImageWrapper>

          <AccentCircle
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          />
        </ImageComposition>
      </Container>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section<{ $isLoading?: boolean }>`
  min-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 4rem;
  background-color: var(--color-surface-dim);
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1.2fr;
    padding: 0 4rem;
  }
`;

const ContentWrapper = styled(motion.div)`
  max-width: 540px;
  z-index: 10;
  position: relative;
`;

const BackgroundMandala = styled.div`
  position: absolute;
  top: -20%;
  left: -20%;
  width: 300px;
  height: 300px;
  color: var(--color-primary);
  opacity: 0.05;
  z-index: -1;
  pointer-events: none;
`;

const EyebrowContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Eyebrow = styled.span`
  font-family: var(--font-label);
  text-transform: uppercase;
  letter-spacing: 0.25em;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-primary);
`;

const Title = styled.h1`
  font-family: var(--font-headline);
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.15;
  color: var(--color-on-surface);
  margin-bottom: 1.5rem;
  letter-spacing: -0.01em;

  .serif-italic {
    font-family: "Playfair Display", "Baskerville", serif;
    font-style: italic;
    font-weight: 400;
    color: var(--color-primary);
    font-size: 110%;
  }

  @media (min-width: 768px) {
    font-size: 4rem;
  }
  @media (min-width: 1280px) {
    font-size: 5rem;
  }
`;

const Description = styled.p`
  font-family: var(--font-body);
  font-size: 1.125rem;
  line-height: 1.7;
  color: color-mix(in srgb, var(--color-on-surface) 75%, transparent);
  margin-bottom: 1.5rem;
`;

const DecorativeDivider = styled.div`
  width: 50px;
  height: 10px;
  color: var(--color-primary);
  margin-bottom: 2rem;
  opacity: 0.6;
`;

/* --- NEW FEATURE GRID REPLACING BUTTONS --- */
const ShowcaseGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
    gap: 3rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--color-primary) 30%, transparent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  background-color: color-mix(in srgb, var(--color-primary) 5%, transparent);

  svg {
    width: 24px;
    height: 24px;
  }
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  strong {
    font-family: var(--font-headline);
    font-size: 1rem;
    font-weight: 800;
    color: var(--color-on-surface);
  }

  span {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
  }
`;

/* --- RIGHT SIDE (Bulletproof Image Setup) --- */

const ImageComposition = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 600px;

  @media (max-width: 1024px) {
    height: auto;
    justify-content: center;
    padding-top: 2rem;
  }
`;

const MainImageWrapper = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 3 / 4;
  border-radius: 4px;
  right: 2%;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
  }

  @media (max-width: 1024px) {
    max-width: 350px;
  }
`;

const SecondaryImageWrapper = styled(motion.div)`
  position: absolute;
  left: 10%;
  bottom: -1%;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 4 / 5;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  border: 10px solid var(--color-surface-dim);
  z-index: 3;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  @media (max-width: 1024px) {
    left: 0;
    bottom: -10%;
    max-width: 200px;
  }
`;

const AccentCircle = styled(motion.div)`
  position: absolute;
  top: 5%;
  left: 5%;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 2px dashed color-mix(in srgb, var(--color-primary) 50%, transparent);
  opacity: 0.5;
  z-index: -1;
`;
