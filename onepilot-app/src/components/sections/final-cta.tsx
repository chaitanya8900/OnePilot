"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FinalCTAProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  buttonText?: string;
}

export default function FinalCTA({
  title = (
    <>
      Stop Managing Vendors.<br />Start Building Your Business.
    </>
  ),
  description = "Technology, AI, Marketing, Automation, and Operations under one roof.",
  buttonText = "Book a Strategy Call"
}: FinalCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas py-[120px] md:py-[160px] overflow-hidden"
    >
      {/* Background ambient glow - Left */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/15 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Background ambient glow - Right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-primary/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Dot Grid Pattern */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.15] md:opacity-[0.25]"
        style={{
          backgroundImage: "radial-gradient(circle at 1.5px 1.5px, var(--color-ink) 1.5px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 80% at 50% 50%, black 10%, transparent 100%)",
        }}
      />

      <motion.div
        className="relative z-10 max-w-[800px] mx-auto px-6 text-center"
        initial={{ opacity: 0, filter: "blur(8px)" }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: "easeOut" as const }}
      >
        {/* Headline */}
        <motion.h2
          className="text-[36px] md:text-[52px] leading-[1.1] font-semibold tracking-[-0.02em] text-ink mb-6"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
        >
          {title}
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          className="text-[17px] md:text-[19px] leading-[1.6] text-ink-muted mb-10 max-w-[500px] mx-auto"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
        >
          {description}
        </motion.p>

        {/* CTA Button + Trust Line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" as const }}
        >
          <a
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-4 rounded-[8px] text-[16px] font-medium hover:bg-primary-hover transition-colors shadow-[0_0_24px_rgba(79,91,196,0.3)] hover:shadow-[0_0_32px_rgba(79,91,196,0.5)]"
          >
            {buttonText}
          </a>

          <p className="text-[13px] leading-[1.4] text-ink-tertiary mt-6">
            No commitment required · Free strategy session
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
