import { Link } from "react-router-dom"
import { Globe, Share2, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-surface-container-low w-full pt-20 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-6 md:px-12 max-w-7xl mx-auto font-body text-sm leading-relaxed">
        {/* Brand Column */}
        <div className="opacity-90 hover:opacity-100 transition-opacity">
          <span className="text-xl font-bold text-on-surface mb-4 block tracking-tighter font-headline">
            Digital Atelier
          </span>
          <p className="text-on-surface/70 mb-6">
            Redefining luxury through tradition. Every stitch tells a story of
            heritage, reimagined for the contemporary soul.
          </p>
          <div className="flex gap-4">
            <button
              className="text-primary hover:text-primary-container transition-colors"
              aria-label="Website"
            >
              <Globe size={20} strokeWidth={1.5} />
            </button>
            <button
              className="text-primary hover:text-primary-container transition-colors"
              aria-label="Share"
            >
              <Share2 size={20} strokeWidth={1.5} />
            </button>
            <button
              className="text-primary hover:text-primary-container transition-colors"
              aria-label="Email"
            >
              <Mail size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* About Us */}
        <div className="opacity-90 hover:opacity-100 transition-opacity">
          <h4 className="font-semibold text-primary mb-6 uppercase tracking-widest font-headline">
            About Us
          </h4>
          <ul className="space-y-4">
            <li>
              <Link
                to="/sustainability"
                className="text-on-surface/70 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Sustainability
              </Link>
            </li>
            <li>
              <Link
                to="/heritage"
                className="text-on-surface/70 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Our Heritage
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-on-surface/70 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/stores"
                className="text-on-surface/70 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Store Locator
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div className="opacity-90 hover:opacity-100 transition-opacity">
          <h4 className="font-semibold text-primary mb-6 uppercase tracking-widest font-headline">
            Customer Care
          </h4>
          <ul className="space-y-4">
            <li>
              <Link
                to="/shipping"
                className="text-on-surface/70 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Shipping &amp; Returns
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="text-on-surface/70 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/care"
                className="text-on-surface/70 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Care Instructions
              </Link>
            </li>
            <li>
              <Link
                to="/track"
                className="text-on-surface/70 hover:text-primary underline-offset-4 hover:underline transition-all"
              >
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="opacity-90 hover:opacity-100 transition-opacity">
          <h4 className="font-semibold text-primary mb-6 uppercase tracking-widest font-headline">
            Newsletter
          </h4>
          <p className="text-on-surface/70 mb-4">
            Subscribe to receive updates on new collections and exclusive
            previews.
          </p>
          <form className="flex border-b border-on-surface/20 pb-2 focus-within:border-primary transition-colors">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent border-none focus:outline-none focus:ring-0 w-full text-xs italic text-on-surface placeholder:text-on-surface/50"
              required
            />
            <button
              type="submit"
              className="text-primary font-bold text-xs uppercase tracking-widest hover:text-primary-container transition-colors font-headline"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="mt-20 border-t border-on-surface/5 pt-10 text-center text-on-surface/50 text-xs">
        © {new Date().getFullYear()} Digital Atelier (Shree Dholi Sati). All
        Rights Reserved.
      </div>
    </footer>
  )
}
