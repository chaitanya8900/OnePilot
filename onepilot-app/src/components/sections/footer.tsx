"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-provider";

const productLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/" },
];
const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const connectLinks = [
  { label: "Instagram", href: "https://www.instagram.com/onepilot.in", external: true },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/onepilotin/", external: true },
  { label: "Twitter / X", href: "#", external: true },
  { label: "Email", href: "mailto:hello@onepilot.in", external: true },
];

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h4 className="text-[14px] leading-[1.5] text-ink font-medium mb-4">
        {title}
      </h4>
      <ul>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="text-[14px] leading-[1.5] text-ink-subtle hover:text-ink transition block mb-2.5"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 — Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src={theme === "light" ? "/logo-light1.png" : "/logo-dark.png"}
                alt="OnePilot"
                width={24}
                height={24}
              />
              <span className="font-semibold text-[20px] text-ink tracking-tight">
                OnePilot
              </span>
            </div>
            <p className="text-[14px] leading-[1.5] text-ink-subtle mt-3 max-w-[200px]">
              Everything your business needs. One partner.
            </p>
            <a href="mailto:hello@onepilot.in" className="text-[14px] leading-[1.5] font-medium text-ink hover:text-primary transition-colors block mt-4">
              hello@onepilot.in
            </a>
          </div>

          {/* Column 2 — Product */}
          <FooterColumn title="Product" links={productLinks} />

          {/* Column 3 — Company */}
          <FooterColumn title="Company" links={companyLinks} />

          {/* Column 4 — Connect */}
          <FooterColumn title="Connect" links={connectLinks} />
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-hairline flex justify-between items-center flex-wrap gap-4">
          <span className="text-[12px] leading-[1.5] text-ink-tertiary">
            © 2026 OnePilot. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a
              href="/"
              className="text-[12px] leading-[1.5] text-ink-tertiary hover:text-ink-subtle transition"
            >
              Business Growth Infrastructure · 2026
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
