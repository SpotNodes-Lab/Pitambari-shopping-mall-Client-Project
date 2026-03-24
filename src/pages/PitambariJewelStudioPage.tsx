import { motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";
import { PageBanner } from "@/components/shared/PageBanner";
import pitambariVideo1 from "@/assets/PitambariJweles/pitambariJwels1.mp4";
import pitambariVideo2 from "@/assets/PitambariJweles/pitambariJwels2.mp4";
import pitambariVideo3 from "@/assets/PitambariJweles/pitambariJwels3.mp4";

const paragraphs = [
  "Founded by Riyaa Sharad Sikaria, Pitambari Jewel Studio is a celebration of timeless elegance, craftsmanship, and heritage. Specializing in exquisite gold, diamond, and Polki jewellery, we bring together traditional artistry with modern design to create pieces that are both luxurious and meaningful.",
  "At Pitambari, every creation tells a story. From statement bridal pieces to everyday elegance, our collections are thoughtfully designed and meticulously crafted to reflect individuality and grace.",
  "Expanding our vision, we introduced Virasat - our dedicated silver jewellery line that embodies heritage in its purest form. With intricate detailing and a classic aesthetic, Virasat offers beautifully crafted silver pieces that carry tradition forward with a contemporary touch.",
  "What sets us apart is our commitment to complete customization. We work closely with our clients to turn their ideas into reality, creating jewellery that is truly personal and one-of-a-kind.",
  "Being direct manufacturers based in Surat, we ensure exceptional quality at highly affordable prices, making luxury accessible without compromise.",
  "We also showcase our collections through exclusive exhibitions across various cities, bringing our designs closer to you and creating a more personal shopping experience.",
  "At Pitambari Jewel Studio, we do not just create jewellery - we craft emotions, memories, and heirlooms for generations to cherish.",
];

const videos = [pitambariVideo1, pitambariVideo2, pitambariVideo3];

export function PitambariJewelStudioPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <PageBanner
        title="Pitambari Jewel Studio"
        breadcrumb="Home > Our Businesses > Pitambari Jewel Studio"
      />
      <Section>
        <AmbientGlow
          aria-hidden
          initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.95 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <Container>
          <AboutCard
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 26 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <TagLine>Crafted Legacy</TagLine>
            <Heading>About Pitambari Jewel Studio</Heading>
            {paragraphs.map((paragraph, index) => (
              <Paragraph
                key={paragraph}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : 0.06 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {paragraph}
              </Paragraph>
            ))}
          </AboutCard>

          <SubHeading
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            Featured Videos
          </SubHeading>
          <VideoGrid>
            {videos.map((video, index) => (
              <VideoCard
                key={video}
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.01 }}
              >
                <VideoCount>{`0${index + 1}`}</VideoCount>
                <video
                  controls
                  autoPlay
                  loop
                  playsInline
                  preload="metadata"
                  muted
                >
                  <source src={video} type="video/mp4" />
                </video>
              </VideoCard>
            ))}
          </VideoGrid>
        </Container>
      </Section>
    </>
  );
}

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #f8f6f2 0%, #faf9f7 38%, #f7f4ef 100%);
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
  width: min(44rem, 80vw);
  height: min(44rem, 80vw);
  top: -10rem;
  right: -11rem;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(184, 130, 58, 0.2) 0%,
    rgba(184, 130, 58, 0.08) 35%,
    transparent 68%
  );
  pointer-events: none;
`;

const AboutCard = styled(motion.article)`
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(184, 130, 58, 0.15);
  backdrop-filter: blur(6px);
  padding: clamp(1rem, 1.5vw, 2rem);
  box-shadow: 0 20px 44px rgba(60, 45, 20, 0.08);
`;

const TagLine = styled.p`
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  color: rgba(148, 93, 25, 0.92);
`;

const Heading = styled.h2`
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: clamp(1.9rem, 3.5vw, 3rem);
  margin-bottom: 1rem;
  color: #1f1b16;
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

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const VideoCard = styled(motion.div)`
  position: relative;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(184, 130, 58, 0.14);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.35s ease;

  &:hover {
    box-shadow: 0 18px 38px rgba(0, 0, 0, 0.18);
  }

  video {
    width: 100%;
    display: block;
    aspect-ratio: 9 / 16;
    object-fit: cover;
  }
`;

const VideoCount = styled.span`
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  z-index: 2;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: #fff;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.35);
`;
