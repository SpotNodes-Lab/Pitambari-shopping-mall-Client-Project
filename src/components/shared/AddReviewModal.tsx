import { useEffect, useState } from "react"
import styled from "styled-components"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Star, X } from "lucide-react"
import { Button } from "@/components/ui/Button"

const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Choose a rating.")
    .max(5),
  quote: z
    .string()
    .min(10, "Please write at least a few words.")
    .max(600, "Please keep your review under 600 characters."),
  name: z.string().min(2, "Please enter your name."),
  title: z.string().min(2, "Add a short label (e.g. Customer)."),
})

export type ReviewFormValues = z.infer<typeof reviewSchema>

export function AddReviewModal({
  open,
  onClose,
  onSubmitReview,
}: {
  open: boolean
  onClose: () => void
  onSubmitReview: (values: ReviewFormValues) => void | Promise<void>
}) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      quote: "",
      name: "",
      title: "",
    },
  })

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (open) {
      setSubmitError(null)
      reset({
        rating: 5,
        quote: "",
        name: "",
        title: "",
      })
    }
  }, [open, reset])

  if (!open) return null

  async function onValidSubmit(values: ReviewFormValues) {
    setSubmitError(null)
    try {
      await Promise.resolve(onSubmitReview(values))
      onClose()
    } catch (e: unknown) {
      const message =
        e instanceof globalThis.Error
          ? e.message
          : "Could not submit your review. Please try again."
      setSubmitError(message)
    }
  }

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-review-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <ModalPanel>
        <ModalBody>
          <ModalHeader>
            <TitleBlock>
              <ModalTitle id="add-review-title">Share your experience</ModalTitle>
              <ModalLead>
                We&apos;ll receive your note for our team. Featured stories on
                this page are curated from our admin panel—thank you for taking
                the time to share.
              </ModalLead>
            </TitleBlock>
            <IconClose type="button" onClick={onClose} aria-label="Close">
              <X size={18} strokeWidth={2.25} />
            </IconClose>
          </ModalHeader>

          <Form onSubmit={handleSubmit(onValidSubmit)}>
          <Field>
            <Label htmlFor="review-rating">Rating</Label>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <StarShell>
                  <StarRow
                    id="review-rating"
                    role="group"
                    aria-label="Star rating"
                  >
                    {[1, 2, 3, 4, 5].map((n) => {
                      const on = n <= field.value
                      return (
                        <StarButton
                          key={n}
                          type="button"
                          $active={on}
                          onClick={() => field.onChange(n)}
                          aria-label={`${n} star${n > 1 ? "s" : ""}`}
                        >
                          <Star
                            size={24}
                            strokeWidth={1.4}
                            fill={on ? "#d4af37" : "none"}
                            color={on ? "#d4af37" : "#c9b896"}
                          />
                        </StarButton>
                      )
                    })}
                  </StarRow>
                </StarShell>
              )}
            />
            {errors.rating && <ErrorText>{errors.rating.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="review-quote">Your review</Label>
            <Textarea
              id="review-quote"
              placeholder="What stood out during your visit?"
              $error={!!errors.quote}
              {...register("quote")}
            />
            {errors.quote && <ErrorText>{errors.quote.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="review-name">Name</Label>
            <ModalTextInput
              id="review-name"
              placeholder="e.g. Priya S."
              $error={!!errors.name}
              {...register("name")}
            />
            {errors.name && <ErrorText>{errors.name.message}</ErrorText>}
          </Field>

          <Field>
            <Label htmlFor="review-role">How would you describe yourself?</Label>
            <ModalTextInput
              id="review-role"
              placeholder="e.g. Customer, Bridal shopper"
              $error={!!errors.title}
              {...register("title")}
            />
            {errors.title && <ErrorText>{errors.title.message}</ErrorText>}
          </Field>

          <FooterDivider />

          {submitError && (
            <ErrorText role="alert" style={{ marginTop: "-0.25rem" }}>
              {submitError}
            </ErrorText>
          )}

          <ButtonRow>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Submit review"}
            </Button>
          </ButtonRow>
          </Form>
        </ModalBody>
      </ModalPanel>
    </Overlay>
  )
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 220;
  background: rgba(28, 24, 22, 0.42);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: max(1rem, env(safe-area-inset-top, 0px))
    max(1rem, env(safe-area-inset-right, 0px))
    max(1rem, env(safe-area-inset-bottom, 0px))
    max(1rem, env(safe-area-inset-left, 0px));
  animation: overlayIn 0.22s ease-out;

  @keyframes overlayIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`

const ModalPanel = styled.div`
  width: 100%;
  max-width: min(32rem, 100%);
  max-height: min(92vh, 42rem);
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fdfcfa;
  border-radius: 12px;
  box-shadow:
    0 4px 6px rgba(34, 28, 24, 0.04),
    0 24px 48px rgba(34, 28, 24, 0.12),
    0 0 0 1px rgba(172, 45, 22, 0.06);
  animation: panelIn 0.28s cubic-bezier(0.22, 1, 0.36, 1);

  @keyframes panelIn {
    from {
      opacity: 0;
      transform: translateY(10px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`

/* Padding lives here so width:100% fields stay inside the padded box (flex overflow fix). */
const ModalBody = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  min-width: 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  padding: clamp(1.5rem, 4.5vw, 2rem);
`

const ModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`

const TitleBlock = styled.div`
  flex: 1;
  min-width: 0;
`

const ModalTitle = styled.h2`
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: clamp(1.4rem, 3.8vw, 1.6rem);
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.22;
  margin: 0;
  letter-spacing: -0.02em;
`

const ModalLead = styled.p`
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: #6b6560;
  line-height: 1.55;
  margin: 0.55rem 0 0;
  max-width: 26rem;
`

const IconClose = styled.button`
  flex-shrink: 0;
  border: none;
  cursor: pointer;
  width: 2.375rem;
  height: 2.375rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5c5652;
  background: #ebe8e4;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: #e0dcd6;
    color: #2a2624;
  }

  &:active {
    transform: scale(0.96);
  }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`

const Label = styled.label`
  font-family: var(--font-label);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-primary);
`

const StarShell = styled.div`
  display: inline-flex;
  align-self: flex-start;
  padding: 0.5rem 0.65rem;
  border-radius: 10px;
  background: linear-gradient(180deg, #f5f2ee 0%, #f0ebe5 100%);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.7);
`

const StarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.15rem;
`

const StarButton = styled.button<{ $active: boolean }>`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0.2rem;
  line-height: 0;
  border-radius: 6px;
  transition:
    transform 0.15s ease,
    background-color 0.15s ease;

  &:hover {
    transform: scale(1.12);
    background-color: rgba(255, 255, 255, 0.45);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`

const inputSurface = `
  display: block;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid transparent;
  background-color: #f0ebe6;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  line-height: 1.45;
  color: #2a2624;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: #9a928a;
  }

  &:hover {
    background-color: #ebe5df;
  }

  &:focus-visible {
    outline: none;
    background-color: #ffffff;
    border-color: color-mix(in srgb, var(--color-primary) 35%, transparent);
    box-shadow: 0 0 0 3px
      color-mix(in srgb, var(--color-primary) 12%, transparent);
  }
`

const Textarea = styled.textarea<{ $error?: boolean }>`
  ${inputSurface}
  min-height: 7.25rem;
  resize: vertical;

  ${({ $error }) =>
    $error
      ? `
    border-color: var(--color-error);
    background-color: color-mix(in srgb, var(--color-error) 6%, #f0ebe6);
    &:focus-visible {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-error) 15%, transparent);
    }
  `
      : ""}
`

const ModalTextInput = styled.input<{ $error?: boolean }>`
  ${inputSurface}
  height: 3.125rem;

  ${({ $error }) =>
    $error
      ? `
    border-color: var(--color-error);
    background-color: color-mix(in srgb, var(--color-error) 6%, #f0ebe6);
    &:focus-visible {
      border-color: var(--color-error);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-error) 15%, transparent);
    }
  `
      : ""}
`

const ErrorText = styled.span`
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-error);
`

const FooterDivider = styled.div`
  height: 1px;
  margin-top: 0.15rem;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(42, 38, 36, 0.08) 12%,
    rgba(42, 38, 36, 0.08) 88%,
    transparent
  );
`

const ButtonRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.65rem;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
`
