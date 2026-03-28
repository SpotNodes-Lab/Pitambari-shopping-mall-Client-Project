import { motion } from "framer-motion";
import styled from "styled-components";

interface AboutStoryProps {
  image: string;
  paragraphs: string[];
  headline?: string;
  eyebrow?: string;
}

export function AboutStorySection({
  image,
  paragraphs,
  headline = "Our Heritage",
  eyebrow = "80+ Years of Trust",
}: AboutStoryProps) {
  return (
    <Section>
      <Container>
        <Grid>
          {/* Left Column: The Editorial Text */}
          <TextCol
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <EyebrowWrapper>
              <DecorativeDiamond />
              <Eyebrow>{eyebrow}</Eyebrow>
              <DecorativeDiamond />
            </EyebrowWrapper>

            <Heading>
              {headline.split(" ").map((word, i) => (
                // Automatically makes the first word italic for that magazine feel
                <span key={i} className={i === 0 ? "serif-italic" : ""}>
                  {word}{" "}
                </span>
              ))}
            </Heading>

            {paragraphs.map((p, idx) => (
              <Paragraph
                key={idx}
                className={idx === 0 ? "lead-paragraph" : ""}
              >
                {p}
              </Paragraph>
            ))}
          </TextCol>

          {/* Right Column: The Framed Image */}
          <ImageCol
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <ImageFrame>
              <Img src={image} alt="Our Heritage" loading="lazy" />
            </ImageFrame>
          </ImageCol>
        </Grid>
      </Container>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding-top: 6rem;
  padding-bottom: 7rem;
  background-color: #ffffff; /* Crisp white to let the images pop */
`;

const Container = styled.div`
  max-width: 1250px; /* Slightly narrower to force a tighter, elegant reading line */
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;

  @media (min-width: 900px) {
    grid-template-columns: 1.1fr 0.9fr; /* Text gets slightly more room */
    gap: 6rem;
  }
`;

const TextCol = styled(motion.div)`
  display: flex;
  flex-direction: column;
  max-width: 48rem;
`;

const EyebrowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const DecorativeDiamond = styled.div`
  width: 5px;
  height: 5px;
  background-color: var(--color-primary);
  transform: rotate(45deg);
  opacity: 0.7;
`;

const Eyebrow = styled.span`
  font-family: var(--font-label);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: var(--color-primary);
`;

const Heading = styled.h2`
  font-family: var(--font-headline);
  font-weight: 500;
  color: #222222;
  font-size: 2.75rem;
  line-height: 1.15;
  margin-bottom: 2rem;
  letter-spacing: -0.01em;

  .serif-italic {
    font-family: "Playfair Display", "Baskerville", serif;
    font-style: italic;
    color: var(--color-primary);
    font-size: 110%;
  }

  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Paragraph = styled.p`
  font-family: var(--font-body);
  color: #555555;
  line-height: 1.8;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;

  /* The first paragraph acts as an introduction, so we make it slightly bolder and larger */
  &.lead-paragraph {
    font-size: 1.1rem;
    color: #333333;
    font-weight: 500;
    margin-bottom: 1.75rem;
  }
`;

const ImageCol = styled(motion.div)`
  position: relative;
`;

const ImageFrame = styled.div`
  position: relative;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5; /* Elegant portrait crop */
  object-fit: cover;
  background-color: #f5f5f5;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
`;
