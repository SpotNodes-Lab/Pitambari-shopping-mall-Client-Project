import styled from "styled-components"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useMemo, useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email."),
  phone: z
    .string()
    .min(10, "Phone number should be at least 10 digits.")
    .regex(
      /^[0-9+ ]+$/,
      "Phone number can contain only digits, +, and spaces."
    ),
  message: z.string().min(10, "Message should be at least 10 characters."),
})

type FormValues = z.infer<typeof formSchema>
const PITAMBRI_MAP_URL = "https://maps.app.goo.gl/ejHV9zB84yHDPtrj9"
const PITAMBRI_MAP_EMBED_URL =
  "https://www.google.com/maps?q=Pitambari%20Patna&z=15&output=embed"

export function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const contactInfo = useMemo(
    () => [
      { label: "Email", value: "pitambari.bth@gmail.com" },
      { label: "Phone", value: "6203121811" },
      { label: "Hours", value: "9 am to 8pm" },
    ],
    []
  )

  async function onSubmit(_values: FormValues) {
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
  }

  return (
    <Section>
      <Container>
        <Grid>
          <FormCard>
            <FormTitle>Get in Touch</FormTitle>
            <FormSubtitle>
              Tell us what you need and our team will get back to you shortly.
            </FormSubtitle>

            {submitted ? (
              <Success>
                <SuccessTitle>Message sent</SuccessTitle>
                <SuccessText>
                  Thanks! We will reach out soon to help with your enquiry.
                </SuccessText>
              </Success>
            ) : (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Field>
                  <Label>Name</Label>
                  <Input
                    placeholder="Your name"
                    error={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && <Error>{errors.name.message}</Error>}
                </Field>

                <Field>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    error={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && <Error>{errors.email.message}</Error>}
                </Field>

                <Field>
                  <Label>Phone</Label>
                  <Input
                    placeholder="Phone number"
                    error={!!errors.phone}
                    {...register("phone")}
                  />
                  {errors.phone && <Error>{errors.phone.message}</Error>}
                </Field>

                <Field>
                  <Label>Message</Label>
                  <Textarea
                    placeholder="How can we help?"
                    error={!!errors.message}
                    {...register("message")}
                  />
                  {errors.message && <Error>{errors.message.message}</Error>}
                </Field>

                <Button type="submit" disabled={isSubmitting} fullWidthAt="sm">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </Form>
            )}
          </FormCard>

          <InfoCard>
            <InfoTitle>We are here</InfoTitle>
            <InfoText>
              Visit a showroom for the most curated fittings, or send a message
              for custom styling guidance.
            </InfoText>

            <InfoList>
              {contactInfo.map((row) => (
                <InfoRow key={row.label}>
                  <InfoLabel>{row.label}</InfoLabel>
                  <InfoValue>{row.value}</InfoValue>
                </InfoRow>
              ))}
            </InfoList>

            <MapPanel>
              <MapTitle>Pitambari Store Location</MapTitle>
              <MapFrame
                title="Pitambari Store Location"
                src={PITAMBRI_MAP_EMBED_URL}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <MapLink
                href={PITAMBRI_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={16} strokeWidth={1.6} />
                Open in Google Maps
              </MapLink>
            </MapPanel>
          </InfoCard>
        </Grid>
      </Container>
    </Section>
  )
}

const Section = styled.section`
  padding-top: 3rem;
  padding-bottom: 5rem;
  background-color: var(--color-background);
`

const Container = styled.div`
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    gap: 2rem;
  }
`

const FormCard = styled.div`
  border: 1px solid color-mix(
    in srgb,
    var(--color-outline-variant) 25%,
    transparent
  );
  border-radius: var(--radius-xl);
  background-color: var(--color-surface-container-lowest);
  padding: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem;
  }
`

const FormTitle = styled.h1`
  font-family: var(--font-headline);
  font-weight: 900;
  color: var(--color-on-surface);
  letter-spacing: -0.03em;
  font-size: 2.25rem;
  margin-bottom: 0.75rem;
`

const FormSubtitle = styled.p`
  color: color-mix(in srgb, var(--color-on-surface) 70%, transparent);
  line-height: 1.8;
  margin-bottom: 1.5rem;
  max-width: 48ch;
`

const Success = styled.div`
  border-radius: var(--radius-xl);
  border: 1px solid color-mix(
    in srgb,
    var(--color-outline-variant) 20%,
    transparent
  );
  background-color: color-mix(
    in srgb,
    var(--color-surface-container-high) 70%,
    transparent
  );
  padding: 1.25rem;
`

const SuccessTitle = styled.h3`
  font-family: var(--font-headline);
  font-weight: 900;
  color: var(--color-primary);
  margin-bottom: 0.35rem;
`

const SuccessText = styled.p`
  color: color-mix(in srgb, var(--color-on-surface) 70%, transparent);
  line-height: 1.7;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const Label = styled.span`
  font-family: var(--font-label);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
`

const Error = styled.p`
  margin-top: -0.15rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-error);
`

const Textarea = styled.textarea<{ error?: boolean }>`
  width: 100%;
  min-height: 9rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-lg);
  border: 2px solid
    ${({ error }) => (error ? "var(--color-error)" : "transparent")};
  background-color: var(--color-surface-container-high);

  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--color-on-surface);

  &:focus-visible {
    outline: none;
    border-color: ${({ error }) =>
      error ? "var(--color-error)" : "var(--color-primary)"};
  }

  &::placeholder {
    color: color-mix(
      in srgb,
      var(--color-on-surface-variant) 55%,
      transparent
    );
  }
`

const InfoCard = styled.aside`
  border-radius: var(--radius-xl);
  background-color: var(--color-surface-container-high);
  padding: 1.5rem;
  border: 1px solid color-mix(
    in srgb,
    var(--color-outline-variant) 25%,
    transparent
  );
`

const InfoTitle = styled.h2`
  font-family: var(--font-headline);
  font-weight: 900;
  color: var(--color-on-surface);
  letter-spacing: -0.02em;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`

const InfoText = styled.p`
  color: color-mix(in srgb, var(--color-on-surface) 70%, transparent);
  line-height: 1.8;
  margin-bottom: 1.25rem;
`

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const InfoLabel = styled.span`
  font-family: var(--font-label);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
`

const InfoValue = styled.span`
  font-family: var(--font-body);
  color: var(--color-on-surface);
  font-size: 0.95rem;
`

const MapPanel = styled.div`
  margin-top: 1.25rem;
  border-radius: var(--radius-xl);
  background-color: color-mix(
    in srgb,
    var(--color-surface-container-lowest) 60%,
    transparent
  );
  border: 1px solid
    color-mix(in srgb, var(--color-outline-variant) 18%, transparent);
  padding: 1.15rem;
`

const MapTitle = styled.h3`
  font-family: var(--font-headline);
  font-weight: 900;
  margin-bottom: 0.25rem;
  color: var(--color-primary);
`

const MapFrame = styled.iframe`
  width: 100%;
  height: 220px;
  border: 0;
  border-radius: var(--radius-lg);
  display: block;
  margin-top: 0.6rem;
  background-color: var(--color-surface-container-lowest);
`

const MapLink = styled.a`
  margin-top: 0.8rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: var(--font-label);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  text-decoration: none;
  color: var(--color-primary);

  &:hover {
    color: var(--color-primary-container);
  }
`

