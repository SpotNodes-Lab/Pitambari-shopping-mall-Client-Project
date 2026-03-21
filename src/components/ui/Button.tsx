import * as React from "react"
import styled from "styled-components"

export type ButtonVariant = "primary" | "ghost" | "outline" | "glass" | "icon" | "nav"
export type ButtonSize = "default" | "sm" | "lg" | "icon"
export type FullWidthAt = "sm" | "md" | "lg" | "xl"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /**
   * When set, the button is full-width by default and switches to `width: auto`
   * at the given breakpoint (e.g. `sm` => `w-full sm:w-auto`).
   */
  fullWidthAt?: FullWidthAt
}

const StyledButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidthAt?: FullWidthAt
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;

  font-family: var(--font-headline);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;

  border: none;
  cursor: pointer;
  user-select: none;

  transition: background-color 200ms ease, box-shadow 200ms ease,
    transform 100ms ease, color 200ms ease, border-color 200ms ease;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $size }) => {
    switch ($size) {
      case "sm":
        return `
          height: 2.25rem;
          padding: 0 0.75rem;
          border-radius: var(--radius-lg);
          font-size: 0.875rem;
        `
      case "lg":
        return `
          height: 4rem;
          padding: 1.25rem 2.5rem;
          border-radius: var(--radius-xl);
          font-size: 1.125rem;
        `
      case "icon":
        return `
          height: 2.5rem;
          width: 2.5rem;
          padding: 0;
          border-radius: 9999px;
        `
      case "default":
      default:
        return `
          height: 3rem;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-xl);
          font-size: 0.875rem;
        `
    }
  }}

  ${({ $variant }) => {
    switch ($variant) {
      case "ghost":
        return `
          background: transparent;
          color: var(--color-primary);
          &:hover {
            color: var(--color-primary-container);
            text-decoration: underline;
            text-underline-offset: 0.25rem;
          }
        `
      case "outline":
        return `
          background: transparent;
          color: var(--color-on-surface);
          border: 1px solid var(--color-outline-variant);
          &:hover {
            background: var(--color-surface-container-high);
            border-color: var(--color-outline);
          }
        `
      case "glass":
        return `
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--color-on-primary);
          &:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `
      case "icon":
        return `
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          color: var(--color-primary);
          border-radius: 9999px;
          &:hover {
            background: var(--color-primary);
            color: var(--color-on-primary);
          }
        `
      case "nav":
        return `
          background: transparent;
          color: var(--color-on-surface);
          border: 1px solid var(--color-outline-variant);
          border-radius: 9999px;
          &:hover {
            background: var(--color-primary);
            color: var(--color-on-primary);
            border-color: var(--color-primary);
          }
        `
      case "primary":
      default:
        return `
          background: var(--color-primary);
          color: var(--color-on-primary);
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
          &:hover {
            background: var(--color-primary-container);
            box-shadow: 0 18px 35px rgba(0,0,0,0.14);
          }
        `
    }
  }}

  ${({ $fullWidthAt }) =>
    $fullWidthAt
      ? `
    width: 100%;
    @media (min-width: ${
      $fullWidthAt === "sm"
        ? "640px"
        : $fullWidthAt === "md"
          ? "768px"
          : $fullWidthAt === "lg"
            ? "1024px"
            : "1280px"
    }) {
      width: auto;
    }
  `
      : ""}
`

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "default", fullWidthAt, ...props }, ref) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $size={size}
        $fullWidthAt={fullWidthAt}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
