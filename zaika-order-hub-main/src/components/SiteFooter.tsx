import { Link } from "@tanstack/react-router";
import { SocialMediaLinks } from "@/components/SocialMediaLinks";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface">
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* Chaska */}
        <div>
          <h2 className="font-display text-xl font-semibold">Chaska</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Food pre-booking made fresh. Pre-book your meal and pick your serving time, or place a
            same-day order.
          </p>
          <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide">Quick links</h3>
          <ul className="mt-2 space-y-1 text-sm">
            <li>
              <Link to="/menu" className="text-muted-foreground hover:text-foreground">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/order" className="text-muted-foreground hover:text-foreground">
                Place an order
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="text-muted-foreground hover:text-foreground">
                Reviews
              </Link>
            </li>
          </ul>
          <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide">Food Safety</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            FSSAI License/Registration No.: [To be updated]
          </p>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Legal</h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li>
              <Link to="/privacy-policy" className="text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="text-muted-foreground hover:text-foreground">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link to="/cancellation-refund" className="text-muted-foreground hover:text-foreground">
                Cancellation &amp; Refund
              </Link>
            </li>
            <li>
              <Link to="/disclaimer" className="text-muted-foreground hover:text-foreground">
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Privacy & Data Protection */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">
            Privacy &amp; Data Protection
          </h3>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li>
              <Link to="/dpdpa" className="text-muted-foreground hover:text-foreground">
                DPDPA / Data Protection
              </Link>
            </li>
            <li>
              <Link to="/gdpr" className="text-muted-foreground hover:text-foreground">
                GDPR
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide">Contact</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
            <li>+91 8305994105</li>
            <li>hello@chaska.com</li>
            <li>
              <a
                href="https://wa.me/918305994105?text=Hi%20Chaska%2C%20I%20have%20an%20enquiry."
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                WhatsApp
              </a>
            </li>
          </ul>
          <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide">Connect With Us</h3>
          <div className="mt-2">
            <SocialMediaLinks />
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Chaska. All rights reserved.</p>
        <p className="mt-1">Developed by DigitalXnode</p>
      </div>
    </footer>
  );
}
