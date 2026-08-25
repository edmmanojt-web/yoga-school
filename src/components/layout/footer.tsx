import Link from "next/link";
import { siteConfig, navLinks } from "@/config/site";
import { NagaInfinityMark } from "@/components/ui/logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative bg-charcoal text-ivory/75 mt-auto overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Subtle top gradient accent */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(200,145,58,0.6) 30%, rgba(184,125,59,0.5) 70%, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group mb-5">
              <NagaInfinityMark size={32} className="opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col">
                <span className="font-heading text-[1.3rem] text-ivory tracking-[0.05em] italic leading-none">{siteConfig.name}</span>
                <span className="text-[0.55rem] font-semibold tracking-[0.22em] uppercase text-ivory/35 mt-0.5">Traditional Yoga School</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-ivory/55">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {siteConfig.instagram !== "[Instagram Handle]" && (
                <a
                  href={`https://instagram.com/${siteConfig.instagram}`}
                  className="p-2 rounded-lg bg-white/8 hover:bg-white/15 transition-colors"
                  aria-label="Instagram"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              )}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-ivory/35 mb-5">Explore</h3>
            <ul className="space-y-3" role="list">
              {navLinks.slice(0, 6).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/60 hover:text-ivory transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-[0.7rem] font-semibold tracking-[0.12em] uppercase text-ivory/35 mb-5">Connect</h3>
            <ul className="space-y-3" role="list">
              {[
                { href: "/schedule", label: "Schedule" },
                { href: "/community", label: "Community" },
                { href: "/contact", label: "Contact" },
                { href: "/about", label: "About" },
                { href: "/faq", label: "FAQ" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-ivory/60 hover:text-ivory transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-1">
              <p className="text-xs text-ivory/35">{siteConfig.location}</p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm text-ivory/60 hover:text-ivory transition-colors"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.07] mt-12 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-ivory/30">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-ivory/30">
            <Link href="/privacy" className="hover:text-ivory/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-ivory/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
