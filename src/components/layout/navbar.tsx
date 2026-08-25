"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { NagaInfinityMark } from "@/components/ui/logo";
import { siteConfig, navLinks, practicesLinks } from "@/config/site";
import { cn } from "@/lib/utils";

interface NavProps {
  user?: { name?: string | null; role?: string } | null;
}

export function Navbar({ user }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [practicesOpen, setPracticesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setPracticesOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPracticesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const practicesActive = practicesLinks.some((l) => pathname === l.href);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#FBF7F2]/92 backdrop-blur-2xl border-b border-[#E4D8C8] shadow-[0_2px_20px_rgba(62,53,48,0.06)]"
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-[70px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group flex-shrink-0"
            aria-label={`${siteConfig.name} — home`}
          >
            <NagaInfinityMark
              size={30}
              className="transition-opacity group-hover:opacity-80 flex-shrink-0"
            />
            <div className="flex flex-col justify-center">
              <span
                className="font-heading text-[1.35rem] tracking-[0.06em] text-forest group-hover:text-forest/80 transition-colors leading-none"
                style={{ fontStyle: "italic" }}
              >
                {siteConfig.name}
              </span>
              <span className="hidden sm:block text-[0.56rem] font-semibold tracking-[0.22em] uppercase mt-0.5" style={{ color: "rgba(62,53,48,0.35)" }}>
                Traditional Yoga
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">

            {/* Practices dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setPracticesOpen((p) => !p)}
                className={cn(
                  "flex items-center gap-1 px-3.5 py-2 rounded-lg text-[0.8125rem] font-medium transition-all duration-150",
                  practicesActive
                    ? "text-[#6B4A2A] bg-[#C8913A]/10"
                    : "text-[#3E3530]/65 hover:text-[#3E3530] hover:bg-[#F2E8DA]"
                )}
                aria-expanded={practicesOpen}
                aria-haspopup="true"
              >
                Practices
                <ChevronDown
                  size={13}
                  className={cn("transition-transform duration-200", practicesOpen && "rotate-180")}
                  aria-hidden="true"
                />
              </button>

              {/* Dropdown panel */}
              {practicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 rounded-2xl border shadow-lg overflow-hidden"
                  style={{ background: "#FEFCF9", borderColor: "#E4D8C8", boxShadow: "0 8px 32px rgba(62,53,48,0.12)" }}
                  role="menu"
                >
                  <div className="p-1.5">
                    {practicesLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        role="menuitem"
                        className={cn(
                          "flex flex-col px-3.5 py-2.5 rounded-xl transition-colors",
                          pathname === link.href
                            ? "bg-[#C8913A]/10"
                            : "hover:bg-[#F6EFE6]"
                        )}
                      >
                        <span className="text-[0.8125rem] font-medium" style={{ color: "#231E1A" }}>
                          {link.label}
                        </span>
                        <span className="text-[0.7rem] mt-0.5" style={{ color: "#B0A090" }}>
                          {link.desc}
                        </span>
                      </Link>
                    ))}
                    <div className="mx-2 my-1.5 h-px" style={{ background: "#E4D8C8" }} />
                    <Link
                      href="/offerings"
                      role="menuitem"
                      className="flex items-center px-3.5 py-2 rounded-xl hover:bg-[#F6EFE6] transition-colors"
                    >
                      <span className="text-[0.75rem] font-medium" style={{ color: "#B87D3B" }}>
                        View all offerings â†’
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* The Journey â€” flagship link */}
            <Link
              href="/yoga-beyond-the-mat"
              className={cn(
                "px-3.5 py-2 rounded-lg text-[0.8125rem] font-medium transition-all duration-150",
                pathname === "/yoga-beyond-the-mat"
                  ? "text-[#6B4A2A] bg-[#C8913A]/10"
                  : "text-[#3E3530]/65 hover:text-[#3E3530] hover:bg-[#F2E8DA]"
              )}
              aria-current={pathname === "/yoga-beyond-the-mat" ? "page" : undefined}
            >
              The Journey
            </Link>

            {/* Remaining flat links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 rounded-lg text-[0.8125rem] font-medium transition-all duration-150",
                  pathname === link.href
                    ? "text-[#6B4A2A] bg-[#C8913A]/10"
                    : "text-[#3E3530]/65 hover:text-[#3E3530] hover:bg-[#F2E8DA]"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden lg:flex items-center gap-2">
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
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 rounded-lg text-[#3E3530]/50 hover:text-[#3E3530] hover:bg-[#F2E8DA] transition-all"
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut size={15} aria-hidden="true" />
                </button>
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
            className="lg:hidden p-2 rounded-lg hover:bg-[#F2E8DA] transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X size={20} style={{ color: "#3E3530" }} /> : <Menu size={20} style={{ color: "#3E3530" }} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden border-t border-[#E4D8C8] overflow-hidden transition-all duration-300",
          isOpen ? "max-h-screen" : "max-h-0"
        )}
        style={{ background: "#FEFCF9" }}
        aria-hidden={!isOpen}
      >
        <nav className="px-4 py-4 space-y-0.5" aria-label="Mobile navigation">
          {/* Practices group */}
          <p
            className="px-3 pt-1 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.2em]"
            style={{ color: "#B87D3B" }}
          >
            Practices
          </p>
          {practicesLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-3 py-2.5 rounded-xl text-[0.875rem] font-medium transition-colors",
                pathname === link.href
                  ? "bg-[#6B4A2A] text-[#FBF7F2]"
                  : "text-[#3E3530]/75 hover:bg-[#F2E8DA] hover:text-[#3E3530]"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px mx-2 my-3" style={{ background: "#E4D8C8" }} />

          {/* The Journey */}
          <Link
            href="/yoga-beyond-the-mat"
            className={cn(
              "block px-3 py-2.5 rounded-xl text-[0.875rem] font-medium transition-colors",
              pathname === "/yoga-beyond-the-mat"
                ? "bg-[#6B4A2A] text-[#FBF7F2]"
                : "text-[#3E3530]/75 hover:bg-[#F2E8DA] hover:text-[#3E3530]"
            )}
          >
            The Journey
          </Link>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-3 py-2.5 rounded-xl text-[0.875rem] font-medium transition-colors",
                pathname === link.href
                  ? "bg-[#6B4A2A] text-[#FBF7F2]"
                  : "text-[#3E3530]/75 hover:bg-[#F2E8DA] hover:text-[#3E3530]"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="h-px mx-2 my-3" style={{ background: "#E4D8C8" }} />

          {/* Auth */}
          <div className="space-y-2 pt-1">
            {user ? (
              <>
                <Link href="/dashboard" className="block">
                  <Button variant="outline" size="md" className="w-full">Dashboard</Button>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ color: "#7B6B5B" }}
                  aria-label="Sign out"
                >
                  <LogOut size={15} aria-hidden="true" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block">
                  <Button variant="ghost" size="md" className="w-full">Sign in</Button>
                </Link>
                <Link href="/yoga-beyond-the-mat" className="block">
                  <Button variant="primary" size="md" className="w-full">Start the Journey</Button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

