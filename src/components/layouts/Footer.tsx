import { Link } from "react-router-dom"
import { Globe, Share2, Mail } from "lucide-react"
import styled from "styled-components"
import footerLogo from "@/assets/pitambri-logo-removebg-preview.png"

const FooterRoot = styled.footer`
  background-color: var(--color-footer-surface);
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
  font-family: "Playfair Display", "Baskerville", serif;
  font-size: clamp(1.15rem, 2.5vw, 1.45rem);
  font-weight: 600;
  color: var(--color-on-footer);
  margin-bottom: 0.35rem;
  display: block;
  letter-spacing: 0.38em;
  text-transform: uppercase;
`

const BrandTagline = styled.span`
  font-family: var(--font-label);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--color-on-footer-muted);
  display: block;
  margin-bottom: 1.25rem;
`

const Address = styled.address`
  margin: 0 0 1.5rem;
  padding: 0;
  font-style: normal;
  color: var(--color-on-footer-muted);
  font-size: 0.8rem;
  line-height: 1.65;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const AddressLine = styled.span`
  display: block;
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
  color: var(--color-on-footer);
  transition: color 200ms ease, transform 200ms ease;

  &:hover {
    color: var(--color-footer-accent);
    transform: translateY(-2px);
  }
`

const ColumnTitle = styled.h4`
  font-family: var(--font-headline);
  font-weight: 600;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-footer-accent);
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
  color: var(--color-on-footer-muted);
  text-decoration: none;
  transition: color 200ms ease, text-decoration-color 200ms ease;

  &:hover {
    color: var(--color-on-footer);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
`

const FooterBottom = styled.div`
  margin-top: 5rem;
  border-top: 1px solid color-mix(
    in srgb,
    var(--color-on-footer) 14%,
    transparent
  );
  padding-top: 2.5rem;
  text-align: center;

  color: var(--color-on-footer-muted);
  font-size: 0.75rem;
`

const LogoColumn = styled(Column)`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`

const FooterLogo = styled.img`
  width: clamp(180px, 20vw, 280px);
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.22));
`

export function Footer() {
  return (
    <FooterRoot>
      <FooterGrid>
        {/* Brand Column */}
        <Column>
          <BrandTitle>Pitambari</BrandTitle>
          <BrandTagline>Atelier &amp; Showrooms</BrandTagline>
          <Address>
            <AddressLine>PITAMBARI</AddressLine>
            <AddressLine>LAL BAZAR, PITAMBARI ROAD,</AddressLine>
            <AddressLine>BETTIAH, BIHAR, 845438,</AddressLine>
            <AddressLine>WEST CHAMPARAN</AddressLine>
          </Address>
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

        <LogoColumn>
          <FooterLogo src={footerLogo} alt="Pitambari logo" loading="lazy" />
        </LogoColumn>

      </FooterGrid>

      <FooterBottom>
        © {new Date().getFullYear()} Pitambari. All Rights
        Reserved.
      </FooterBottom>
    </FooterRoot>
  )
}
