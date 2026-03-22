import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MapPin } from "lucide-react";

// In a real app, this data would come from your dataStore/backend
const mockOfferData = {
  eyebrow: "Season Exclusive",
  title: "The Grand Wedding Offers",
  description:
    "Step into the season of celebrations. Discover our newly arrived curated collection of bridal lehengas, sherwanis, and exquisite festive wear. Visit our showroom to explore exclusive in-store offers.",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA1X4s4mH8XnZ9Ej_Jq8KF2mVZkHngt_KQwIhtBAZHj-HkZZlKKA9aDepzpyfvT6ghjF2d1KWOse79zHzPjwYqzct4FgcdWK4TYVBQmjyHp7Qcoc6pPEYyjLTA8r8u4oeRG2kURJMmHk4kbSf51mw1nuJ7jnLV0ctWRLC2xBo_-wpVKwxF_SoBTDpluoTtfHLULc2Vp5X5_kLFEJE6QOty9W_NbEfSJleQboEqY5gJuQc-gL3vViuza990kcfQV5e2haKB4Gzv6RpI",
  validityText: "Valid across all Pitambari Shopping Mall showrooms.",
};

export function PrivilegeSale() {
  return (
    <Section>
      <Container>
        <AnnouncementCard
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Left Side: The Offer Details */}
          <ContentSide>
            <EyebrowWrapper>
              <DecorativeDiamond />
              <TitleEyebrow>{mockOfferData.eyebrow}</TitleEyebrow>
              <DecorativeDiamond />
            </EyebrowWrapper>

            <Title>{mockOfferData.title}</Title>

            <Description>{mockOfferData.description}</Description>

            <ValidityText>{mockOfferData.validityText}</ValidityText>

            <ActionContainer>
              <VisitButton to="/showrooms">
                <MapPin size={18} />
                Find Your Nearest Showroom
              </VisitButton>
            </ActionContainer>
          </ContentSide>

          {/* Right Side: The Admin Image */}
          <ImageSide>
            <OfferImage
              src={mockOfferData.image}
              alt={mockOfferData.title}
              loading="lazy"
            />
          </ImageSide>
        </AnnouncementCard>
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

const AnnouncementCard = styled(motion.div)`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 8px; /* Slightly rounded for an elegant card feel */
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  min-width: 0; /* lets card shrink inside padded ancestors on narrow viewports */
  box-sizing: border-box;

  /* Switch to horizontal layout on desktop */
  @media (min-width: 900px) {
    flex-direction: row;
    min-height: 400px;
  }
`;

const ContentSide = styled.div`
  width: 100%;
  min-width: 0; /* critical: flex child may otherwise refuse to shrink → horizontal clip */
  max-width: 100%;
  box-sizing: border-box;
  padding: clamp(1.65rem, 5vw, 3rem) clamp(1.1rem, 4.5vw, 2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #eaeaea;

  @media (max-width: 899px) {
    /* Extra air so serif headline ascenders aren’t clipped by card overflow */
    padding-top: clamp(1.75rem, 5.5vw, 2.25rem);
  }

  @media (min-width: 900px) {
    width: 50%;
    padding: 4rem;
    border-bottom: none;
    border-right: 1px solid #eaeaea;
  }
`;

const EyebrowWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  margin-bottom: 1.5rem;
  max-width: 100%;
  min-width: 0;
`;

const DecorativeDiamond = styled.div`
  width: 6px;
  height: 6px;
  background-color: var(--color-primary);
  transform: rotate(45deg);
  opacity: 0.7;
`;

const TitleEyebrow = styled.span`
  font-family: var(--font-label);
  font-weight: 700;
  letter-spacing: clamp(0.12em, 1.2vw, 0.2em);
  text-transform: uppercase;
  font-size: clamp(0.7rem, 2.8vw, 0.8rem);
  color: var(--color-primary);
  max-width: 100%;
  text-align: center;
  overflow-wrap: anywhere;
`;

const Title = styled.h2`
  font-family: "Playfair Display", "Baskerville", serif; /* Elegant serif */
  font-size: clamp(1.65rem, 5vw, 2.5rem);
  color: #222222;
  margin: 0 0 clamp(1rem, 3vw, 1.5rem);
  line-height: 1.28;
  font-weight: 500;
  width: 100%;
  max-width: min(100%, 22rem);
  overflow-wrap: anywhere;
  hyphens: auto;
  box-sizing: border-box;

  @media (max-width: 899px) {
    padding-top: 0.15em; /* keeps ascenders inside overflow:hidden card */
  }

  @media (min-width: 900px) {
    max-width: none;
    line-height: 1.2;
    padding-top: 0;
  }
`;

const Description = styled.p`
  color: #555555;
  margin: 0 0 clamp(1.25rem, 4vw, 2rem);
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  line-height: 1.62;
  width: 100%;
  max-width: min(100%, 26rem);
  overflow-wrap: break-word;
  word-wrap: break-word; /* Safari */
  box-sizing: border-box;
`;

const ValidityText = styled.p`
  font-family: var(--font-label);
  font-size: clamp(0.65rem, 2vw, 0.75rem);
  text-transform: uppercase;
  letter-spacing: clamp(0.05em, 0.8vw, 0.08em);
  color: #888888;
  margin: 0 0 clamp(1.5rem, 4vw, 2.5rem);
  padding: 0 0 1rem;
  border-bottom: 1px solid #eaeaea;
  width: 100%;
  max-width: min(100%, 22rem);
  line-height: 1.5;
  overflow-wrap: break-word;
  word-wrap: break-word;
  box-sizing: border-box;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: min(100%, 22rem);
  min-width: 0;
`;

const VisitButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: #ffffff;
  padding: clamp(0.85rem, 2.5vw, 1rem) clamp(0.85rem, 3.5vw, 2rem);
  border-radius: 4px;
  font-family: var(--font-headline);
  font-size: clamp(0.68rem, 2vw, 0.9rem);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: clamp(0.04em, 0.6vw, 0.1em);
  text-decoration: none;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  text-align: center;
  box-sizing: border-box;
  flex-wrap: wrap;
  row-gap: 0.35rem;

  @media (min-width: 900px) {
    width: auto;
    max-width: none;
    flex-wrap: nowrap;
    letter-spacing: 0.1em;
  }

  &:hover {
    background-color: #222222;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ImageSide = styled.div`
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #0c0c0c;
  flex-shrink: 0;

  /* Mobile: short band — caps viewport use (no huge letterbox like tall aspect-ratio + contain) */
  @media (max-width: 899px) {
    height: clamp(200px, 30dvh, 260px);
    max-height: 260px;
  }

  @media (min-width: 900px) {
    width: 50%;
    flex: 1 1 50%;
    align-self: stretch;
    min-height: 0;
    height: auto;
    background-color: transparent;
  }
`;

const OfferImage = styled.img`
  display: block;
  width: 100%;
  max-width: 100%;
  height: 100%;
  object-fit: cover;
  /* Slightly above center: face + torso + most of lehenga in a short crop */
  object-position: center 38%;

  @media (min-width: 900px) {
    object-position: center;
    min-height: 100%;
  }
`;
