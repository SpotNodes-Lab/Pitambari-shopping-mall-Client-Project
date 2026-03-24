import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";
import { PageBanner } from "@/components/shared/PageBanner";
import virast1 from "@/assets/virasat/virast1.jpeg";
import virasat10 from "@/assets/virasat/virasat10.jpeg";
import virasat12 from "@/assets/virasat/virasat12.jpeg";
import virasat9 from "@/assets/virasat/virasat9.jpeg";
import virasat7 from "@/assets/virasat/virasat7.jpeg";
import virasat8 from "@/assets/virasat/virasat8.jpeg";
import virasat6 from "@/assets/virasat/virasat6.jpeg";
import virasat5 from "@/assets/virasat/virasat5.jpeg";
import virasat4 from "@/assets/virasat/virasat4.jpeg";
import virasat3 from "@/assets/virasat/virasat3.jpeg";
import virasat2 from "@/assets/virasat/virasat2.jpeg";

const paragraphs = [
  "Virasat is a tribute to timeless heritage and enduring craftsmanship - a silver jewellery brand born as a sub-brand of Pitambari Jewel Studio. While Pitambari celebrates gold, diamonds, and Polki, Virasat is dedicated to preserving the beauty and legacy of silver in its most artistic form.",
  "Founded by Riyaa Sharad Sikaria and co-founded by Sharad Sikaria, Virasat brings together traditional aesthetics with contemporary sensibilities. Each piece is thoughtfully designed to reflect culture, elegance, and individuality - turning silver into a statement of both style and heritage.",
  "At Virasat, we believe jewellery should be as unique as the person wearing it. That is why we offer complete customization, allowing our clients to create pieces that are deeply personal and truly one-of-a-kind.",
  "With our in-house manufacturing in Surat and Jaipur, we ensure exceptional craftsmanship while maintaining an affordable pricing range, making premium silver jewellery accessible without compromise.",
  "We also connect with our customers through curated exhibitions across various cities, offering a closer look at our collections and the stories behind them.",
  "Virasat is not just jewellery - it is a legacy you wear, a story you carry, and a heritage you pass on.",
];

const images = [
  virast1,
  virasat10,
  virasat12,
  virasat9,
  virasat7,
  virasat8,
  virasat6,
  virasat5,
  virasat4,
  virasat3,
  virasat2,
];

export function VirasatPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PageBanner title="Virasat" breadcrumb="Home > Our Businesses > Virasat" />
      <Section>
        <AmbientGlow
          aria-hidden
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.92 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        />
        <Container>
          <AboutCard
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TagLine>Silver Legacy</TagLine>
            <Heading>About Virasat</Heading>
            {paragraphs.map((paragraph, index) => (
              <Paragraph
                key={paragraph}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.45,
                  delay: prefersReducedMotion ? 0 : index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {paragraph}
              </Paragraph>
            ))}
          </AboutCard>

          <SubHeading
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            Virasat Collection
          </SubHeading>
          <GalleryGrid>
            {images.map((image, index) => (
              <ImageCard
                key={image}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 22 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : Math.min(index * 0.05, 0.35),
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={prefersReducedMotion ? undefined : { y: -7, scale: 1.015 }}
              >
                <ImageCount>{`${index + 1}`.padStart(2, "0")}</ImageCount>
                <img src={image} alt={`Virasat jewellery ${index + 1}`} loading="lazy" />
                <ImageOverlay aria-hidden />
              </ImageCard>
            ))}
          </GalleryGrid>
        </Container>
      </Section>
    </>
  );
}

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f9f8f5 0%, #faf9f7 44%, #f5f2ed 100%);
  padding: 3rem 0 5rem;
`;

const Container = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 1.25rem;
  position: relative;
  z-index: 1;
`;

const AmbientGlow = styled(motion.div)`
  position: absolute;
  width: min(42rem, 80vw);
  height: min(42rem, 80vw);
  top: -11rem;
  left: -10rem;
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(
    circle,
    rgba(156, 138, 111, 0.23) 0%,
    rgba(156, 138, 111, 0.08) 36%,
    transparent 70%
  );
`;

const AboutCard = styled(motion.article)`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(130, 110, 78, 0.15);
  backdrop-filter: blur(4px);
  padding: clamp(1rem, 1.5vw, 2rem);
  box-shadow: 0 18px 38px rgba(40, 34, 24, 0.08);
`;

const TagLine = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: rgba(110, 89, 55, 0.92);
`;

const Heading = styled.h2`
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: clamp(1.9rem, 3.5vw, 3rem);
  margin-bottom: 1rem;
  color: #201a15;
`;

const Paragraph = styled(motion.p)`
  max-width: 980px;
  color: rgba(0, 0, 0, 0.78);
  line-height: 1.75;
  margin-bottom: 1rem;
`;

const SubHeading = styled(motion.h3)`
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-weight: 700;
  color: rgba(56, 44, 28, 0.9);
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const ImageCard = styled(motion.div)`
  position: relative;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(130, 110, 78, 0.16);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 20px 38px rgba(0, 0, 0, 0.18);
  }

  img {
    width: 100%;
    aspect-ratio: 4 / 5;
    object-fit: cover;
    display: block;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.06);
  }
`;

const ImageOverlay = styled.span`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.16) 0%,
    rgba(0, 0, 0, 0.02) 46%,
    transparent 100%
  );
  pointer-events: none;
`;

const ImageCount = styled.span`
  position: absolute;
  top: 0.65rem;
  left: 0.65rem;
  z-index: 2;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 700;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: rgba(0, 0, 0, 0.38);
`;
