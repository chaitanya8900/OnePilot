"use client";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/sections/footer";
import FinalCta from "@/components/sections/final-cta";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const serviceCards = [
  {
    id: "01",
    title: "BUILD",
    description: "Create the digital foundation your business needs.",
    services: [
      "Website Development",
      "Landing Pages",
      "UI/UX Design",
      "Branding & Identity",
      "Website Maintenance",
      "Performance Optimization",
      "Digital Product Development",
      "Conversion Optimization"
    ]
  },
  {
    id: "02",
    title: "GROW",
    description: "Generate demand, attract customers, and create predictable business growth.",
    services: [
      "Digital Marketing",
      "Lead Generation",
      "Paid Advertising",
      "Social Media Management",
      "Content Marketing",
      "SEO",
      "Email Marketing",
      "Sales Funnel Optimization",
      "Marketing Strategy",
      "Performance Reporting"
    ]
  },
  {
    id: "03",
    title: "AUTOMATE",
    description: "Reduce manual work and improve efficiency with intelligent automation.",
    services: [
      "AI Chatbots",
      "AI Voice Agents",
      "WhatsApp Automation",
      "CRM Automation",
      "Workflow Automation",
      "Appointment Automation",
      "Lead Qualification Systems",
      "AI Customer Support",
      "Business Process Automation",
      "Custom AI Solutions"
    ]
  },
  {
    id: "04",
    title: "OPERATE",
    description: "Build reliable systems that keep your business running smoothly.",
    services: [
      "Customer Support",
      "BPO Services",
      "Data Analytics",
      "Business Operations",
      "Reporting Dashboards",
      "Customer Success Systems",
      "Process Documentation",
      "Team Workflow Design",
      "Operational Consulting",
      "KPI Tracking"
    ]
  },
  {
    id: "05",
    title: "SCALE",
    description: "Strategic guidance and infrastructure designed for long-term business growth.",
    services: [
      "Growth Strategy",
      "Business Consulting",
      "Market Expansion Planning",
      "Revenue Optimization",
      "Customer Retention Strategy",
      "Go-To-Market Strategy",
      "Business Audits",
      "Scaling Roadmaps",
      "Performance Reviews",
      "Strategic Advisory"
    ]
  }
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-canvas pt-20 pb-32">
        {/* Header Section */}
        <div className="max-w-[1280px] mx-auto px-6 mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-4 mb-8 justify-center">
              <div className="h-[1px] w-8 bg-primary/40" />
              <span className="text-eyebrow text-primary tracking-[0.2em] uppercase">Capabilities</span>
              <div className="h-[1px] w-8 bg-primary/40" />
            </div>

            <h1 className="text-display-lg text-ink font-semibold tracking-tight mb-6">
              Everything you need.<br className="hidden md:block" /> Under one roof.
            </h1>

            <p className="text-body-lg text-ink-muted max-w-[600px] mx-auto leading-relaxed">
              We replace fragmented agencies with a unified ecosystem of experts, systems, and automation.
            </p>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6">
            {serviceCards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className={cn(
                  "bg-surface-1 border border-hairline rounded-[24px] p-8 md:p-10",
                  "hover:bg-surface-2 hover:border-hairline-strong transition-all duration-500",
                  "flex flex-col w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                )}
              >
                {/* Number Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-mono font-medium text-lg shrink-0">
                    {card.id}
                  </span>
                  <h2 className="text-headline text-ink tracking-tight">
                    {card.title}
                  </h2>
                </div>

                <p className="text-body text-ink-muted mb-8 leading-relaxed">
                  {card.description}
                </p>

                <div className="w-full h-[1px] bg-hairline mb-8" />

                <ul className="flex flex-col gap-3.5 mb-auto">
                  {card.services.map((service, i) => (
                    <li key={i} className="flex items-start gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-2 shrink-0 group-hover:bg-primary transition-colors" />
                      <span className="text-body-sm text-ink-subtle group-hover:text-ink transition-colors leading-snug">
                        {service}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Final CTA placed exactly at the bottom of the page */}
      <FinalCta />
      <Footer />
    </>
  );
}
