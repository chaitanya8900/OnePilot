"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Workflow, Sparkles, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

const cards = [
  {
    icon: Workflow,
    title: "One Partner",
    description:
      "Everything handled through one team. No more vendor chaos, miscommunication, or integration headaches.",
  },
  {
    icon: Sparkles,
    title: "AI First",
    description:
      "Automation built into every workflow from day one. AI isn't an add-on — it's the foundation.",
  },
  {
    icon: Rocket,
    title: "Built To Scale",
    description:
      "Infrastructure designed to grow with your business. From startup to enterprise, we scale with you.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="bg-canvas py-[96px]">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center mb-16"
        >
          <p className="text-eyebrow text-primary mb-4">
            The OnePilot Advantage
          </p>
          <h2 className="text-display-lg text-ink">
            One Team. One Strategy. One Partner.
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.6,
                  ease: "easeOut" as const,
                  delay: 0.2 + index * 0.12,
                }}
                className={cn(
                  "group flex-1 bg-surface-1 border border-hairline rounded-[16px]",
                  "p-8 md:p-12 relative overflow-hidden",
                  "hover:-translate-y-1 hover:scale-[1.02] hover:border-primary/40",
                  "hover:shadow-[0_0_40px_-10px_var(--color-primary)]",
                  "transition-all duration-500 ease-out"
                )}
              >
                {/* Subtle internal background glow on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 pointer-events-none" />
                
                <Icon
                  className="text-primary mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110"
                  size={32}
                  strokeWidth={1.5}
                />
                <h3 className="text-headline text-ink mb-4 relative z-10">
                  {card.title}
                </h3>
                <p className="text-body text-ink-muted leading-relaxed relative z-10">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
