import styled from "styled-components";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Bird,
  Hourglass,
  BookOpen,
  LayoutGrid,
  ShieldCheck,
  Flower2,
} from "lucide-react";

type ValueItem = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

const items: ValueItem[] = [
  {
    id: "craftsmanship",
    icon: Bird,
    title: "Exquisite Craftsmanship",
    description:
      "At Pitambari Shopping Mall, every piece is a masterpiece, intricately designed with precision and passion. Our artisans blend age-old techniques with modern aesthetics to create lehengas, sarees, sherwanis, and suits that exude unmatched elegance and charm.",
  },
  {
    id: "fabrics",
    icon: Hourglass,
    title: "Premium Fabrics",
    description:
      "We believe that luxury begins with quality. Our carefully sourced fabrics, from rich silks to delicate chiffons and fine wool blends, ensure that every outfit—be it bridal wear, party ensembles, or tailored suits—feels as premium as it looks.",
  },
  {
    id: "legacy",
    icon: BookOpen,
    title: "Trusted Legacy",
    description:
      "With years of expertise in ethnic and contemporary fashion, Pitambari Shopping Mall has built a reputation for excellence. Our deep-rooted traditions and commitment to quality make us a preferred destination for those who value authenticity and style.",
  },
  {
    id: "collection",
    icon: LayoutGrid,
    title: "Diverse Collection",
    description:
      "From opulent bridal lehengas to sophisticated sherwanis, from elegant sarees to modern Indo-western styles, our collection caters to every occasion. Whether it's a grand wedding, a festive celebration, or a refined evening affair, we have something for everyone.",
  },
  {
    id: "experience",
    icon: ShieldCheck,
    title: "Exceptional Client Experience",
    description:
      "We are dedicated to making every shopping experience seamless and memorable. From personalized assistance to custom tailoring, our team ensures that every client finds their perfect fit, style, and comfort in every purchase.",
  },
  {
    id: "designs",
    icon: Flower2,
    title: "Trendsetting Designs",
    description:
      "Fashion is ever-evolving, and so are we. Our designers create outfits that strike the perfect balance between tradition and modernity, ensuring that you always stand out with a timeless yet contemporary look.",
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
              <Item key={it.id}>
                <IconBadge aria-hidden>
                  <Icon size={24} strokeWidth={1.2} />
                </IconBadge>
                <Title>{it.title}</Title>
                <Description>{it.description}</Description>
              </Item>
            );
          })}
        </Grid>
      </Container>
    </Section>
  );
}

const Section = styled.section`
  padding-top: var(--section-y);
  padding-bottom: var(--section-y-tight);
  background-color: #fcfbf9;
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
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
`;

/* Flat layout on dotted section (no card panels) */
const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    &:hover {
      transform: none;
    }
  }
`;

const IconBadge = styled.div`
  width: clamp(4.25rem, 12vw, 5rem);
  height: clamp(4.25rem, 12vw, 5rem);
  border-radius: 50%;
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
  margin: 0 0 0.4rem;
  letter-spacing: 0.02em;
  max-width: min(100%, 20rem);
`;

const Description = styled.p`
  font-family: var(--font-body);
  font-size: clamp(0.8rem, 2.2vw, 0.9rem);
  color: #777777;
  font-weight: 400;
  max-width: min(100%, 22rem);
  margin: 0 auto;
  line-height: 1.55;
`;
