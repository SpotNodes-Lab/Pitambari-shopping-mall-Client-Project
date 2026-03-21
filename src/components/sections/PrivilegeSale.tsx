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
  validityText: "Valid across all Dholi Sati Retail Mall showrooms.",
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
  padding-top: 6rem;
  padding-bottom: 6rem;
  background-color: #faf9f7;
`;

const Container = styled.div`
  max-width: 1440px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
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

  /* Switch to horizontal layout on desktop */
  @media (min-width: 900px) {
    flex-direction: row;
    min-height: 400px;
  }
`;

const ContentSide = styled.div`
  width: 100%;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid #eaeaea;

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
  gap: 0.75rem;
  margin-bottom: 1.5rem;
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
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: var(--color-primary);
`;

const Title = styled.h2`
  font-family: "Playfair Display", "Baskerville", serif; /* Elegant serif */
  font-size: 2.5rem;
  color: #222222;
  margin-bottom: 1.5rem;
  line-height: 1.15;
  font-weight: 500;

  @media (min-width: 768px) {
    /* font-size: 3.25rem; */
  }
`;

const Description = styled.p`
  color: #555555;
  margin-bottom: 2rem;
  font-family: var(--font-body);
  font-size: 1.05rem;
  line-height: 1.6;
  max-width: 400px;
`;

const ValidityText = styled.p`
  font-family: var(--font-label);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #888888;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eaeaea;
  width: 80%;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const VisitButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: #ffffff;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-family: var(--font-headline);
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #222222;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ImageSide = styled.div`
  width: 100%;
  height: 300px;

  @media (min-width: 900px) {
    width: 50%;
    height: auto; /* Stretches to match the height of the ContentSide */
  }
`;

const OfferImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures whatever banner admin uploads fits the space */
  object-position: center;
`;
