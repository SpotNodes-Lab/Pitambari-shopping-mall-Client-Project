import { motion } from "framer-motion"
import styled from "styled-components"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  align?: "left" | "center" | "right"
  className?: string
}

const Wrapper = styled.div<{ $align: NonNullable<SectionHeaderProps["align"]> }>`
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;

  ${({ $align }) => {
    switch ($align) {
      case "center":
        return `
          align-items: center;
          text-align: center;
          margin-left: auto;
          margin-right: auto;
        `
      case "right":
        return `
          align-items: flex-end;
          text-align: right;
          margin-left: auto;
        `
      case "left":
      default:
        return `
          align-items: flex-start;
          text-align: left;
        `
    }
  }}
`

const Title = styled(motion.h2)`
  font-family: var(--font-headline);
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-on-surface);

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`

const Underline = styled(motion.div)`
  height: 0.25rem;
  width: 6rem;
  background-color: var(--color-primary);
  margin-top: 1rem;
  transform-origin: left;
`

const Subtitle = styled(motion.p)`
  max-width: 28rem;
  margin-top: 1rem;
  font-family: var(--font-body);
  color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
`

export function SectionHeader({
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  return (
    <Wrapper $align={align} className={className}>
      <Title
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </Title>

      {align === "left" && (
        <Underline
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
      )}

      {subtitle && (
        <Subtitle
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {subtitle}
        </Subtitle>
      )}
    </Wrapper>
  )
}
