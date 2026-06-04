"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface OutcomeItem {
  service: string;
  outcome: string;
  description: string;
}

const outcomes: OutcomeItem[] = [
  {
    service: "Website Development",
    outcome: "More Leads",
    description: "Capture more qualified visitors and convert them into paying customers.",
  },
  {
    service: "AI Chatbots",
    outcome: "Faster Customer Responses",
    description: "Deliver instant support and engage customers without delays.",
  },
  {
    service: "Data Analytics",
    outcome: "Better Business Decisions",
    description: "Turn business data into clear insights for smarter decisions.",
  },
  {
    service: "Marketing Campaigns",
    outcome: "Revenue Growth",
    description: "Generate consistent demand and create sustainable business growth.",
  },
  {
    service: "Automation Setup",
    outcome: "Hours Saved Weekly",
    description: "Eliminate repetitive work and free time for important tasks.",
  },
  {
    service: "Support Hiring",
    outcome: "24/7 Customer Care",
    description: "Provide reliable customer support whenever your customers need help.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: "easeOut" as const,
      delay: index * 0.08,
    },
  }),
};

function OutcomeCard({
  outcome,
  index,
  isInView,
}: {
  outcome: OutcomeItem;
  index: number;
  isInView: boolean;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative w-full h-[240px] cursor-pointer [perspective:1200px]"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={cn(
          "w-full h-full transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:duration-0",
          "[transform-style:preserve-3d]",
          flipped ? "[transform:rotateY(180deg)] md:[transform:none]" : "", // manual flip on mobile, reset on md
          "md:group-hover:[transform:rotateY(180deg)]"
        )}
      >
        {/* Front Face */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full [backface-visibility:hidden]",
            "bg-surface-1 border border-hairline rounded-[12px] p-8",
            "flex flex-col justify-center items-start",
            "transition-all duration-[800ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]",
            "group-hover:border-hairline-strong group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          )}
        >
          <p className="text-[13px] text-ink-subtle opacity-80 mb-4">{outcome.service}</p>
          <ArrowDown className="text-ink-tertiary mb-4" size={16} strokeWidth={1.5} />
          <p className="text-card-title text-ink font-medium leading-snug">{outcome.outcome}</p>
        </div>

        {/* Back Face */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]",
            "bg-surface-1 border border-primary/30 rounded-[12px] p-8",
            "flex flex-col justify-center items-start",
            "shadow-[0_8px_30px_rgba(79,91,196,0.08)]"
          )}
        >
          <p className="text-card-title text-primary font-medium mb-3">{outcome.outcome}</p>
          <p className="text-[15px] leading-relaxed text-ink-muted">{outcome.description}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Outcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="py-[96px] bg-canvas">
      <div className="max-w-[1280px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        >
          <p className="text-eyebrow text-primary mb-4 text-center">
            Results, Not Services
          </p>
          <h2 className="text-display-lg text-ink text-center mb-16">
            What Actually Changes
          </h2>
        </motion.div>

        {/* 3x2 Grid (desktop), 2-col (tablet), 1-col (mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomes.map((outcome, index) => (
            <OutcomeCard
              key={outcome.outcome}
              outcome={outcome}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
