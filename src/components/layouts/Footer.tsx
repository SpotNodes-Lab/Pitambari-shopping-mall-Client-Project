import { Link } from "react-router-dom"
import { Globe, Share2, Mail } from "lucide-react"
import styled from "styled-components"

const FooterRoot = styled.footer`
  background-color: var(--color-surface-container-low);
  width: 100%;
  padding-top: 5rem;
  padding-bottom: 2.5rem;
`

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;

  font-family: var(--font-body);
  font-size: 0.875rem;
  line-height: 1.7;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    padding-left: 3rem;
    padding-right: 3rem;
  }
`

const Column = styled.div`
  opacity: 0.9;
  transition: opacity 200ms ease;

  &:hover {
    opacity: 1;
  }
`

const BrandTitle = styled.span`
  font-family: var(--font-headline);
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--color-on-surface);
  margin-bottom: 1rem;
  display: block;
  letter-spacing: -0.02em;
`

const Paragraph = styled.p`
  color: color-mix(in srgb, var(--color-on-surface) 70%, transparent);
  margin-bottom: 1.5rem;
`

const SocialRow = styled.div`
  display: flex;
  gap: 1rem;
`

const SocialButton = styled.button`
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  color: var(--color-primary);
  transition: color 200ms ease;

  &:hover {
    color: var(--color-primary-container);
  }
`

const ColumnTitle = styled.h4`
  font-family: var(--font-headline);
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-primary);
`

const LinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;
`

const FooterLink = styled(Link)`
  color: color-mix(in srgb, var(--color-on-surface) 70%, transparent);
  text-decoration: none;
  transition: color 200ms ease, text-decoration-color 200ms ease;

  &:hover {
    color: var(--color-primary);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

const NewsletterForm = styled.form`
  display: flex;
  align-items: center;
  border-bottom: 1px solid color-mix(
    in srgb,
    var(--color-on-surface) 20%,
    transparent
  );
  padding-bottom: 0.5rem;
  transition: border-color 200ms ease;

  &:focus-within {
    border-bottom-color: var(--color-primary);
  }
`

const NewsletterInput = styled.input`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;

  color: var(--color-on-surface);
  font-size: 0.75rem;
  font-style: italic;

  &::placeholder {
    color: color-mix(in srgb, var(--color-on-surface) 50%, transparent);
  }
`

const NewsletterButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;

  color: var(--color-primary);
  font-family: var(--font-headline);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  transition: color 200ms ease;

  &:hover {
    color: var(--color-primary-container);
  }
`

const FooterBottom = styled.div`
  margin-top: 5rem;
  border-top: 1px solid color-mix(
    in srgb,
    var(--color-on-surface) 5%,
    transparent
  );
  padding-top: 2.5rem;
  text-align: center;

  color: color-mix(in srgb, var(--color-on-surface) 50%, transparent);
  font-size: 0.75rem;
`

export function Footer() {
  return (
    <FooterRoot>
      <FooterGrid>
        {/* Brand Column */}
        <Column>
          <BrandTitle>Pitambari Shopping Mall</BrandTitle>
          <Paragraph>
            Redefining luxury through tradition. Every stitch tells a story of
            heritage, reimagined for the contemporary soul.
          </Paragraph>
          <SocialRow>
            <SocialButton aria-label="Website">
              <Globe size={20} strokeWidth={1.5} />
            </SocialButton>
            <SocialButton aria-label="Share">
              <Share2 size={20} strokeWidth={1.5} />
            </SocialButton>
            <SocialButton aria-label="Email">
              <Mail size={20} strokeWidth={1.5} />
            </SocialButton>
          </SocialRow>
        </Column>

        {/* About Us */}
        <Column>
          <ColumnTitle>Explore</ColumnTitle>
          <LinkList>
            <li>
              <FooterLink
                to="/about"
              >
                About us
              </FooterLink>
            </li>
            <li>
              <FooterLink
                to="/gallery"
              >
                Gallery
              </FooterLink>
            </li>
          </LinkList>
        </Column>

        {/* Showrooms / Contact */}
        <Column>
          <ColumnTitle>Showrooms</ColumnTitle>
          <LinkList>
            <li>
              <FooterLink
                to="/showrooms"
              >
                View showrooms
              </FooterLink>
            </li>
            <li>
              <FooterLink
                to="/contact"
              >
                Contact form
              </FooterLink>
            </li>
          </LinkList>
        </Column>

        {/* Newsletter */}
        <Column>
          <ColumnTitle>Newsletter</ColumnTitle>
          <p style={{ color: "color-mix(in srgb, var(--color-on-surface) 70%, transparent)", marginBottom: "1rem" }}>
            Subscribe to receive updates on new collections and exclusive
            previews.
          </p>
          <NewsletterForm>
            <NewsletterInput
              type="email"
              placeholder="Email Address"
              required
            />
            <NewsletterButton
              type="submit"
            >
              Join
            </NewsletterButton>
          </NewsletterForm>
        </Column>
      </FooterGrid>

      <FooterBottom>
        © {new Date().getFullYear()} Pitambari Shopping Mall. All Rights
        Reserved.
      </FooterBottom>
    </FooterRoot>
  )
}
