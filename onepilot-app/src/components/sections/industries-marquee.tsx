"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const row1 = [
  "SaaS Startups",
  "AI Companies",
  "E-commerce",
  "D2C Brands",
  "Healthcare",
  "Legal Firms",
  "Real Estate",
  "Education",
  "Financial Services",
  "Manufacturing",
];

const row2 = [
  "Logistics",
  "Hospitality",
  "Restaurants",
  "Recruitment",
  "Retail",
  "Insurance",
  "Automotive",
  "Construction",
  "Consulting",
  "Enterprises",
];

// Duplicate arrays for seamless looping
const row1Duplicated = [...row1, ...row1];
const row2Duplicated = [...row2, ...row2];

function MarqueeRow({ items, direction = "left" }: { items: string[]; direction?: "left" | "right" }) {
  return (
    <div className="flex w-full overflow-hidden relative">
      <motion.div
        initial={{ x: direction === "left" ? "0%" : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : "0%" }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 40,
        }}
        className="flex gap-4 md:gap-6 shrink-0 w-max pr-4 md:pr-6"
      >
        {items.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className={cn(
              "flex items-center justify-center",
              "px-6 py-3 rounded-full",
              "bg-surface-1 border border-hairline",
              "text-ink-subtle text-[14px] md:text-[15px] font-medium whitespace-nowrap",
              "transition-colors hover:text-ink hover:border-hairline-strong"
            )}
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function IndustriesMarquee() {
  return (
    <section className="bg-canvas py-16 md:py-24 border-t border-hairline overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 mb-10 text-center">
        <h2 className="text-subhead text-ink font-semibold">
          Powering Growth Across Industries
        </h2>
      </div>

      <div className="flex flex-col gap-4 md:gap-6 relative">
        {/* Fade gradients */}
        <div className="absolute inset-y-0 left-0 w-[60px] md:w-[200px] bg-gradient-to-r from-canvas to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-[60px] md:w-[200px] bg-gradient-to-l from-canvas to-transparent z-10 pointer-events-none" />

        <MarqueeRow items={row1Duplicated} direction="right" />
        <MarqueeRow items={row2Duplicated} direction="left" />
      </div>
    </section>
  );
}
