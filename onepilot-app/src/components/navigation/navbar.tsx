"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-provider";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "relative flex items-center justify-center",
        "w-8 h-8 rounded-full",
        "bg-surface-1 border border-hairline",
        "text-ink-subtle hover:text-ink",
        "transition-all duration-200 hover:border-hairline-strong",
        "cursor-pointer"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ scale: 0, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={14} strokeWidth={1.8} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ scale: 0, rotate: 90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={14} strokeWidth={1.8} />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-canvas/80 backdrop-blur-xl",
        "transition-colors duration-300"
      )}
    >
      {/* Desktop & Mobile top bar */}
      <nav className="mx-auto flex h-[56px] max-w-7xl items-center justify-between px-md md:px-lg">
        {/* Left — Logo */}
        <Link href="/" className="flex items-center gap-[10px]">
          <Image
            src={theme === "light" ? "/logo-light1.png" : "/logo-dark.png"}
            alt="OnePilot logo"
            width={24}
            height={24}
            className="shrink-0"
            priority
          />
          <span className="font-display text-[20px] font-semibold tracking-tight text-ink">
            OnePilot
          </span>
        </Link>

        {/* Center — Nav links (desktop) */}
        <ul className="hidden items-center gap-lg md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-body-sm transition py-1",
                    isActive ? "text-primary font-medium" : "text-ink-subtle hover:text-ink"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right — Theme toggle + CTA + hamburger */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <Link
            href="/contact"
            className={cn(
              "hidden md:inline-flex",
              "items-center justify-center",
              "bg-primary text-white",
              "px-[14px] py-[8px] rounded-[8px]",
              "text-[14px] font-medium",
              "transition hover:bg-primary-hover"
            )}
          >
            Book a Call
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-xs text-ink-subtle transition hover:text-ink md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden border-t border-hairline bg-surface-1 md:hidden"
          >
            <div className="flex flex-col gap-xs px-md py-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "text-body-sm rounded-md px-sm py-xs transition",
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-ink-subtle hover:bg-surface-2 hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "mt-xs flex items-center justify-center",
                  "bg-primary text-white",
                  "px-[14px] py-[10px] rounded-[8px]",
                  "text-[14px] font-medium",
                  "transition hover:bg-primary-hover"
                )}
              >
                Book a Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
