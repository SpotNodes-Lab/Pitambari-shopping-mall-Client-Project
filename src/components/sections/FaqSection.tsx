import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { Plus, Minus } from "lucide-react";

// Real data based on your uploaded image, with premium offline-focused answers
const faqData = [
  {
    id: "locations",
    question: "Where is Pitambari located?",
    answer:
      "We operate a single flagship store in Bettiah, Bihar—your destination for our full collections and in-person service. Please visit our Showrooms page for the exact address and directions.",
  },
  {
    id: "products",
    question: "What products are available at Pitambari?",
    answer:
      "We offer an exquisite, curated range of ethnic and festive wear. This includes authentic bridal lehengas, designer sarees, premium menswear (like Sherwanis and Kurta sets), and festive clothing for children.",
  },
  {
    id: "why-shop",
    question: "Why should I shop at Pitambari?",
    answer:
      "With over many years of legacy, we provide an unparalleled in-store experience. You can expect authentic craftsmanship, spacious trial rooms, expert personal styling, and bespoke alterations to ensure your perfect fit.",
  },
  {
    id: "family",
    question: "Can I find clothing for the whole family at Pitambari?",
    answer:
      "Absolutely. We are a complete family fashion destination. Our Bettiah store brings together women's, men's, and children's collections under one roof, so everyone can find the right outfit for weddings, festivals, and special occasions.",
  },
];

export function FaqSection() {
  // Keeps track of which question is currently open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section>
      <Container>
        <Grid>
          {/* Left Side: Editorial Heading */}
          <LeftColumn
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Eyebrow>FAQ</Eyebrow>
            <Title>Know Before You Buy</Title>
            <DecorativeLine />
            <Subtitle>
              Important information and answers to help you make the right
              choice before visiting our showrooms.
            </Subtitle>
          </LeftColumn>

          {/* Right Side: Elegant Accordion */}
          <RightColumn
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <FaqItem key={faq.id}>
                  <FaqQuestion
                    onClick={() => toggleFaq(index)}
                    $isOpen={isOpen}
                  >
                    <span>{faq.question}</span>
                    <IconWrapper>
                      {isOpen ? (
                        <Minus size={18} strokeWidth={1.5} />
                      ) : (
                        <Plus size={18} strokeWidth={1.5} />
                      )}
                    </IconWrapper>
                  </FaqQuestion>

                  {/* Smooth height animation for the answer */}
                  <AnimatePresence>
                    {isOpen && (
                      <FaqAnswerWrapper
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <FaqAnswerText>{faq.answer}</FaqAnswerText>
                      </FaqAnswerWrapper>
                    )}
                  </AnimatePresence>
                </FaqItem>
              );
            })}
          </RightColumn>
        </Grid>
      </Container>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding-top: var(--section-y-loose);
  padding-bottom: var(--section-y-loose);
  background-color: #ffffff; /* Crisp, clean background */
`;

const Container = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: calc(var(--page-gutter-x) + env(safe-area-inset-left, 0px));
  padding-right: calc(var(--page-gutter-x) + env(safe-area-inset-right, 0px));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.75rem, 5vw, 4rem);

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1.5fr; /* Gives slightly more room to the questions */
    align-items: flex-start;
  }
`;

const LeftColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;

  @media (min-width: 900px) {
    position: sticky;
    top: 8rem;
  }
`;

const Eyebrow = styled.span`
  font-family: var(--font-label);
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: "Playfair Display", "Baskerville", serif; /* Elegant styling */
  font-size: clamp(1.65rem, 5vw, 2.5rem);
  font-weight: 500;
  color: #222222;
  margin-bottom: 1rem;
  line-height: 1.15;
`;

const DecorativeLine = styled.div`
  width: 40px;
  height: 2px;
  background-color: var(--color-primary);
  margin-bottom: clamp(1rem, 3vw, 1.5rem);
  opacity: 0.7;
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: clamp(0.95rem, 2.5vw, 1.05rem);
  color: #666666;
  line-height: 1.6;
  max-width: 36rem;
`;

const RightColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 0; /* Removing gap to let borders handle the spacing beautifully */
`;

const FaqItem = styled.div`
  border-bottom: 1px solid #eaeaea;

  &:first-child {
    border-top: 1px solid #eaeaea; /* Caps the top */
  }
`;

const FaqQuestion = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  background: transparent;
  border: none;
  padding: clamp(1.1rem, 3.5vw, 1.75rem) 0;
  cursor: pointer;
  gap: 0.75rem;

  span {
    font-family: var(--font-headline);
    font-size: clamp(0.95rem, 2.8vw, 1.1rem);
    font-weight: 700;
    /* Softens the text slightly unless it's open */
    color: ${({ $isOpen }) => ($isOpen ? "var(--color-primary)" : "#222222")};
    transition: color 0.3s ease;
    padding-right: clamp(0.75rem, 3vw, 2rem);
    line-height: 1.4;
  }

  &:hover span {
    color: var(--color-primary);
  }
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
  color: #222222;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FaqAnswerWrapper = styled(motion.div)`
  overflow: hidden;
`;

const FaqAnswerText = styled.div`
  padding-bottom: clamp(1.1rem, 3vw, 1.75rem);
  font-family: var(--font-body);
  font-size: clamp(0.88rem, 2.4vw, 0.95rem);
  color: #555555;
  line-height: 1.7;
  padding-right: clamp(0.75rem, 3vw, 2rem);
`;
