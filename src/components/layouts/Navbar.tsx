import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, MapPin, X } from "lucide-react";
import styled from "styled-components";
import { NAV_LINKS } from "@/constants";
import { useUIStore } from "@/store/uiStore";

export function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu } = useUIStore();
  const location = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const isLinkActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <Header
        $scrolled={isScrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <NavContainer>
          {/* LEFT: Desktop Navigation */}
          <DesktopNav>
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                $active={isLinkActive(link.href)}
              >
                {link.name}
              </NavLink>
            ))}
          </DesktopNav>

          {/* CENTER: Logo */}
          <LogoWrapper>
            <MobileMenuBtn onClick={toggleMobileMenu} aria-label="Menu">
              <Menu size={24} strokeWidth={1.5} />
            </MobileMenuBtn>

            <Logo to="/">
              <span className="brand-name">PITAMBARI</span>
              <span className="brand-tagline">Shopping Mall</span>
            </Logo>

            {/* Mobile Location Icon to balance the hamburger menu */}
            <MobileLocationBtn to="/showrooms" aria-label="Find a Showroom">
              <MapPin size={22} strokeWidth={1.5} />
            </MobileLocationBtn>
          </LogoWrapper>

          {/* RIGHT: Showcase Call to Action */}
          <Actions>
            <LocationCTA to="/showrooms">
              <MapPin size={18} strokeWidth={1.5} />
              <span>Visit a Showroom</span>
            </LocationCTA>
          </Actions>
        </NavContainer>
      </Header>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay
        initial={{ opacity: 0, x: "-100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? "0%" : "-100%",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <CloseMenuBtn onClick={toggleMobileMenu} aria-label="Close menu">
          <X size={28} strokeWidth={1.5} />
        </CloseMenuBtn>

        <MobileLinks>
          {NAV_LINKS.map((link) => (
            <MobileNavLink
              key={link.name}
              to={link.href}
              onClick={toggleMobileMenu}
              $active={isLinkActive(link.href)}
            >
              {link.name}
            </MobileNavLink>
          ))}
        </MobileLinks>

        <MobileFooter>
          <p>Experience the collection in person.</p>
          <LocationCTA to="/showrooms" onClick={toggleMobileMenu}>
            <MapPin size={18} /> Find your nearest store
          </LocationCTA>
        </MobileFooter>
      </MobileMenuOverlay>
    </>
  );
}

// --- Styled Components ---

const Header = styled(motion.header)<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  padding: ${({ $scrolled }) => ($scrolled ? "1rem 0" : "1.5rem 0")};
  background-color: ${({ $scrolled }) =>
    $scrolled ? "rgba(255, 255, 255, 0.95)" : "transparent"};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? "blur(12px)" : "none")};
  border-bottom: ${({ $scrolled }) =>
    $scrolled ? "1px solid rgba(0,0,0,0.05)" : "1px solid transparent"};
  transition: all 0.3s ease;
`;

const NavContainer = styled.div`
  max-width: 1920px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    padding: 0 1.25rem;
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 2.5rem;
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)<{ $active: boolean }>`
  font-family: var(--font-headline);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-decoration: none;
  color: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-on-surface)"};
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ $active }) => ($active ? "100%" : "0%")};
    height: 1px;
    background-color: var(--color-on-surface);
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media (min-width: 769px) {
    justify-content: center;
    gap: 1rem;
    width: auto;
  }
`;

const Logo = styled(Link)`
  text-align: center;
  text-decoration: none;
  display: flex;
  flex-direction: column;

  .brand-name {
    font-family: var(--font-headline);
    font-size: 1.5rem;
    font-weight: 900;
    letter-spacing: 0.1em;
    color: var(--color-on-surface);
  }

  .brand-tagline {
    font-family: var(--font-label);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.25em;
    color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
    margin-top: 0.1rem;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LocationCTA = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-label);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: var(--color-on-surface);
  padding: 0.5rem 1rem;
  border: 1px solid color-mix(in srgb, var(--color-on-surface) 20%, transparent);
  border-radius: 2px;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--color-on-surface);
    color: var(--color-surface);
  }
`;

const MobileMenuBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-on-surface);
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileLocationBtn = styled(Link)`
  color: var(--color-on-surface);
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: var(--color-surface);
  z-index: 100;
  padding: 6rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CloseMenuBtn = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-on-surface);
`;

const MobileLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MobileNavLink = styled(Link)<{ $active: boolean }>`
  font-family: var(--font-headline);
  font-size: 2rem;
  text-decoration: none;
  color: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-on-surface)"};
`;

const MobileFooter = styled.div`
  border-top: 1px solid
    color-mix(in srgb, var(--color-on-surface) 10%, transparent);
  padding-top: 2rem;

  p {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: color-mix(in srgb, var(--color-on-surface) 60%, transparent);
    margin-bottom: 1rem;
  }
`;
