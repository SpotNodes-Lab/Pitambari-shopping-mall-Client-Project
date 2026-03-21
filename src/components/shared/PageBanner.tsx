import styled from "styled-components";
import { motion } from "framer-motion";

export function PageBanner({
  title,
  breadcrumb,
  subtitle = "Discover our vast collection of masterpieces, capturing the essence of our legacy.",
}: {
  title: string;
  breadcrumb?: string;
  subtitle?: string;
}) {
  return (
    <Banner>
      <Container
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <EyebrowWrapper>
          <DecorativeDiamond />
          <SmallCrumb>{breadcrumb ?? " "}</SmallCrumb>
          <DecorativeDiamond />
        </EyebrowWrapper>

        <Title>
          <span className="serif-italic">The</span> {title}
        </Title>

        <Subtitle>{subtitle}</Subtitle>
      </Container>
    </Banner>
  );
}

// --- Styled Components ---

const Banner = styled.section`
  padding-top: 3rem;
  padding-bottom: 2rem;
  background-color: #fcfbf9; /* Soft, warm ivory */
  border-bottom: 1px solid #eaeaea;
`;

const Container = styled(motion.div)`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const EyebrowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`;

const DecorativeDiamond = styled.div`
  width: 5px;
  height: 5px;
  background-color: var(--color-primary);
  transform: rotate(45deg);
  opacity: 0.6;
`;

const SmallCrumb = styled.div`
  font-family: var(--font-label);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-primary);
`;

const Title = styled.h1`
  font-family: var(--font-headline);
  font-weight: 500;
  color: #222222;
  font-size: 3rem;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;

  .serif-italic {
    font-family: "Playfair Display", "Baskerville", serif;
    font-style: italic;
    color: var(--color-primary);
    font-size: 110%;
  }

  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: #666666;
  max-width: 500px;
  line-height: 1.6;
`;
