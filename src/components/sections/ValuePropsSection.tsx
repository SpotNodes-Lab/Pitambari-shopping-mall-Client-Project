import styled from "styled-components";
import { motion } from "framer-motion";
// import { Award, Scissors, Sparkles, HeartHandshake } from "lucide-react";
import { Store, Scissors, UserCheck, Repeat } from "lucide-react";

// const items = [
//   {
//     id: "legacy",
//     icon: Award,
//     title: "80+ Years Legacy",
//     subtitle: "Trusted by generations",
//   },
//   {
//     id: "alterations",
//     icon: Scissors,
//     title: "Custom Alterations",
//     subtitle: "Perfect fit, done in-store",
//   },
//   {
//     id: "quality",
//     icon: Sparkles,
//     title: "Premium Fabrics",
//     subtitle: "Authentic silks & handwork",
//   },
//   {
//     id: "styling",
//     icon: HeartHandshake,
//     title: "Expert Styling",
//     subtitle: "Personal help for your big day",
//   },
// ];

const items = [
  {
    id: "fitting",
    icon: Store,
    title: "Spacious Trial Rooms",
    subtitle: "Try it on and see the magic in person",
  },
  {
    id: "alterations",
    icon: Scissors,
    title: "Instant Alterations",
    subtitle: "Perfected by our in-house tailors",
  },
  {
    id: "assistance",
    icon: UserCheck,
    title: "Personal Assistance",
    subtitle: "Dedicated staff to help you style",
  },
  {
    id: "exchanges",
    icon: Repeat,
    title: "Easy In-Store Exchange",
    subtitle: "Quick and hassle-free size swaps",
  },
];
export function ValuePropsSection() {
  return (
    <Section>
      <Container>
        <Grid
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <Card key={it.id}>
                <IconBadge>
                  <Icon size={24} strokeWidth={1.2} />
                </IconBadge>
                <Title>{it.title}</Title>
                <Subtitle>{it.subtitle}</Subtitle>
              </Card>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}

// --- Styled Components ---

const Section = styled.section`
  padding-top: var(--section-y);
  padding-bottom: var(--section-y-tight);

  /* 1. A warm, luxurious ivory/off-white base color */
  background-color: #fcfbf9;

  /* 2. A very subtle, aesthetic dot/weave pattern */
  background-image: radial-gradient(#e4e0d8 1px, transparent 1px);
  background-size: 28px 28px;
`;

const Container = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: calc(var(--page-gutter-x) + env(safe-area-inset-left, 0px));
  padding-right: calc(var(--page-gutter-x) + env(safe-area-inset-right, 0px));
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.35rem, 4vw, 2.5rem);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
    gap: clamp(1.5rem, 3vw, 2rem);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
`;

const IconBadge = styled.div`
  width: clamp(4.25rem, 12vw, 5rem);
  height: clamp(4.25rem, 12vw, 5rem);
  border-radius: 50%;

  /* Keeping the badge pure white so it stands out against the patterned ivory background */
  background-color: #ffffff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: clamp(0.85rem, 2.5vw, 1.25rem);
  color: #333333;

  svg {
    width: clamp(1.15rem, 4vw, 1.5rem);
    height: clamp(1.15rem, 4vw, 1.5rem);
  }
`;

const Title = styled.h3`
  font-family: var(--font-headline);
  font-size: clamp(0.98rem, 2.8vw, 1.05rem);
  font-weight: 700;
  color: #222222;
  margin-bottom: 0.4rem;
  letter-spacing: 0.02em;
  max-width: 18rem;
`;

const Subtitle = styled.p`
  font-family: var(--font-body);
  font-size: clamp(0.8rem, 2.2vw, 0.85rem);
  color: #777777;
  font-weight: 400;
  max-width: 17rem;
  margin: 0 auto;
  line-height: 1.5;
`;
