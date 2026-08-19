import Link from "next/link";
import { siteConfig, navLinks } from "@/config/site";
// Instagram SVG (not available in installed lucide-react version)

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-charcoal-800 text-ivory/80 mt-auto"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-heading text-2xl text-ivory mb-4">
              <span aria-hidden="true">🌿</span>
              <span>{siteConfig.name}</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-ivory/70">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {siteConfig.instagram !== "[Instagram Handle]" && (
                <a
                  href={`https://instagram.com/${siteConfig.instagram}`}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  aria-label="Instagram"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading text-ivory text-lg mb-4">Explore</h3>
            <ul className="space-y-2" role="list">
              {navLinks.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/70 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h3 className="font-heading text-ivory text-lg mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-ivory/70" role="list">
              <li>
                <Link href="/schedule" className="hover:text-ivory transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-ivory transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-ivory transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-ivory transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-ivory transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs text-ivory/50">{siteConfig.location}</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-ivory/70 hover:text-ivory transition-colors mt-1 block"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/40">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-ivory/40">
            <Link href="/privacy" className="hover:text-ivory/70 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ivory/70 transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
