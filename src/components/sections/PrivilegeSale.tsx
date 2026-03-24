import { motion } from "framer-motion";
import styled from "styled-components";
import bottomHeroImage from "@/assets/bottom-hero-image.webp";

interface PrivilegeSaleProps {
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: string;
}

export function PrivilegeSale({
  imageSrc = bottomHeroImage,
  imageAlt = "Pitambari featured collection",
  imagePosition = "center 30%",
}: PrivilegeSaleProps) {
  return (
    <Section>
      <Container>
        <ImageFrame
          initial={{ opacity: 0, y: 70, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ y: -10, scale: 1.02 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ type: "spring", stiffness: 170, damping: 18 }}
        >
          <HeroImage
            src={imageSrc}
            alt={imageAlt}
            $objectPosition={imagePosition}
            loading="lazy"
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            whileHover={{ scale: 1.14, y: -8, rotate: -0.35 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          />
          <HoverGlow
            initial={{ opacity: 0.08, scale: 1 }}
            whileInView={{ opacity: 0.12, scale: 1 }}
            whileHover={{ opacity: 0.34, scale: 1.08 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
          <Shine
            initial={{ x: "-120%", opacity: 0 }}
            whileInView={{ x: "120%", opacity: [0, 0.22, 0] }}
            viewport={{ once: false, amount: 0.45 }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 2.2,
            }}
          />
        </ImageFrame>
      </Container>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding-top: var(--section-y-loose);
  padding-bottom: var(--section-y-loose);
  background-color: #faf9f7;

  @media (max-width: 899px) {
    padding-top: var(--section-y);
    padding-bottom: var(--section-y);
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: calc(var(--page-gutter-x) + env(safe-area-inset-left, 0px));
  padding-right: calc(var(--page-gutter-x) + env(safe-area-inset-right, 0px));
`;

const ImageFrame = styled(motion.div)`
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.08);
  position: relative;
  transform-origin: center center;
  cursor: pointer;

  &:hover {
    box-shadow:
      0 22px 60px rgba(0, 0, 0, 0.18),
      0 0 0 1px rgba(255, 255, 255, 0.3) inset;
  }
`;

const HeroImage = styled(motion.img)<{ $objectPosition: string }>`
  display: block;
  width: 100%;
  height: clamp(320px, 62vw, 700px);
  object-fit: cover;
  object-position: ${({ $objectPosition }) => $objectPosition};
  will-change: transform;
`;

const HoverGlow = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    120% 75% at 50% 12%,
    rgba(255, 255, 255, 0.45),
    rgba(255, 255, 255, 0.08) 42%,
    rgba(0, 0, 0, 0.18) 100%
  );
  mix-blend-mode: soft-light;
`;

const Shine = styled(motion.div)`
  position: absolute;
  top: -30%;
  left: 0;
  width: 28%;
  height: 160%;
  pointer-events: none;
  background: linear-gradient(
    100deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 45%,
    rgba(255, 255, 255, 0) 100%
  );
  mix-blend-mode: screen;
`;
