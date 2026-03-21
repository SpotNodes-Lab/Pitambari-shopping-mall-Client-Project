import * as React from "react"
import styled from "styled-components"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

const StyledInput = styled.input<{ $error?: boolean }>`
  width: 100%;
  height: 3rem;
  padding: 0.5rem 1rem;

  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-on-surface);

  background-color: var(--color-surface-container-high);
  border-radius: var(--radius-lg);
  border: 2px solid transparent;

  transition: background-color 200ms ease, border-color 200ms ease,
    opacity 200ms ease;

  &::placeholder {
    color: ${"color-mix(in srgb, var(--color-on-surface-variant) 50%, transparent)"};
  }

  &:focus-visible {
    outline: none;
    background-color: var(--color-surface-container-lowest);
    border-color: ${({ $error }) =>
      $error ? "var(--color-error)" : "var(--color-primary)"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, error, ...props }, ref) => {
    return <StyledInput ref={ref} type={type} $error={error} {...props} />
  }
)
Input.displayName = "Input"

export { Input }
