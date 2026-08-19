"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, navLinks } from "@/config/site";
import { cn } from "@/lib/utils";

interface NavProps {
  user?: { name?: string | null; role?: string } | null;
}

export function Navbar({ user }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-ivory/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-heading text-xl text-forest font-medium"
            aria-label={`${siteConfig.name} — home`}
          >
            <span className="text-2xl" aria-hidden="true">🌿</span>
            <span>{siteConfig.name}</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm transition-colors duration-150",
                  pathname === link.href
                    ? "text-forest font-medium"
                    : "text-charcoal hover:text-forest hover:bg-muted"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                {user.role === "ADMIN" && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm">Admin</Button>
                  </Link>
                )}
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">Dashboard</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign in</Button>
                </Link>
                <Link href="/yoga-beyond-the-mat">
                  <Button variant="primary" size="sm">Start the Journey</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden bg-ivory border-t border-border overflow-hidden transition-all duration-300",
          isOpen ? "max-h-screen" : "max-h-0"
        )}
        aria-hidden={!isOpen}
      >
        <nav className="px-4 py-4 space-y-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-4 py-3 rounded-xl text-sm transition-colors",
                pathname === link.href
                  ? "bg-forest text-ivory font-medium"
                  : "text-charcoal hover:bg-muted"
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border space-y-2">
            {user ? (
              <Link href="/dashboard" className="block">
                <Button variant="outline" size="md" className="w-full">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="ghost" size="md" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link href="/yoga-beyond-the-mat" className="block">
                  <Button variant="primary" size="md" className="w-full">
                    Start the 7-Day Journey
                  </Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
