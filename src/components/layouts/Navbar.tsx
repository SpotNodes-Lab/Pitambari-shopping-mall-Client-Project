import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Search, ShoppingBag, User, Menu, X } from "lucide-react"
import { useUIStore } from "@/store/uiStore"
import { NAV_LINKS } from "@/constants"
import { cn } from "@/utils/cn"

export function Navbar() {
  const { isMobileMenuOpen, toggleMobileMenu, cartCount } = useUIStore()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)
  })

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-surface/80 backdrop-blur-xl shadow-sm py-4"
            : "bg-transparent py-6"
        )}
      >
        <nav className="flex justify-between items-center px-6 md:px-12 max-w-[1920px] mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold tracking-tighter text-on-surface z-50 font-headline"
          >
            Digital Atelier
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-8 items-center">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={cn(
                    "font-headline tracking-tight text-sm uppercase transition-colors relative group",
                    link.active
                      ? "text-primary"
                      : "text-on-surface hover:text-primary"
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                      link.active ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6 z-50">
            <button
              className="flex items-center text-on-surface hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={22} strokeWidth={1.5} />
            </button>

            <button
              className="flex items-center text-on-surface hover:text-primary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-primary text-on-primary text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            </button>

            <button
              className="hidden md:flex items-center text-on-surface hover:text-primary transition-colors"
              aria-label="User account"
            >
              <User size={22} strokeWidth={1.5} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden flex items-center text-on-surface hover:text-primary transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={
          isMobileMenuOpen
            ? { opacity: 1, pointerEvents: "auto" as const }
            : { opacity: 0, pointerEvents: "none" as const }
        }
        className="fixed inset-0 z-40 bg-surface flex flex-col pt-24 px-6 md:hidden"
      >
        <ul className="flex flex-col gap-6 items-center">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                onClick={toggleMobileMenu}
                className={cn(
                  "font-headline text-2xl uppercase tracking-widest",
                  link.active
                    ? "text-primary border-b-2 border-primary"
                    : "text-on-surface"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="mt-8">
            <button className="flex items-center gap-2 text-on-surface font-headline uppercase tracking-widest">
              <User size={20} /> Sign In
            </button>
          </li>
        </ul>
      </motion.div>
    </>
  )
}
