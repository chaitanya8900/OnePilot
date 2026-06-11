"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Megaphone,
  TrendingUp,
  Headphones,
  Brain,
  Globe,
  Settings,
  BarChart3,
  Zap,
} from "lucide-react";

const nodes = [
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    role: "Drives awareness and attracts new customers",
  },
  {
    id: "sales",
    label: "Sales",
    icon: TrendingUp,
    role: "Converts leads into paying customers",
  },
  {
    id: "support",
    label: "Customer Support",
    icon: Headphones,
    role: "Retains customers and builds loyalty",
  },
  {
    id: "ai",
    label: "AI",
    icon: Brain,
    role: "Powers intelligent automation across all functions",
  },
  {
    id: "websites",
    label: "Software & Websites",
    icon: Globe,
    role: "Your 24/7 digital storefront and lead engine",
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    role: "Keeps every process running smoothly",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    role: "Turns data into actionable insights",
  },
  {
    id: "automation",
    label: "Automation",
    icon: Zap,
    role: "Eliminates manual work and saves hours",
  },
];

const connections: [number, number][] = [
  [0, 1], // Marketing <-> Sales
  [0, 4], // Marketing <-> Websites
  [0, 6], // Marketing <-> Analytics
  [0, 3], // Marketing <-> AI
  [1, 2], // Sales <-> Customer Support
  [1, 6], // Sales <-> Analytics
  [1, 3], // Sales <-> AI
  [2, 3], // Customer Support <-> AI
  [2, 7], // Customer Support <-> Automation
  [3, 7], // AI <-> Automation
  [3, 6], // AI <-> Analytics
  [3, 5], // AI <-> Operations
  [4, 6], // Websites <-> Analytics
  [4, 3], // Websites <-> AI
  [5, 7], // Operations <-> Automation
  [5, 6], // Operations <-> Analytics
  [7, 6], // Automation <-> Analytics
];

function getNodePosition(index: number, total: number, cx: number, cy: number, radius: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  };
}

function isConnected(nodeIndex: number, otherIndex: number) {
  return connections.some(
    ([a, b]) =>
      (a === nodeIndex && b === otherIndex) ||
      (b === nodeIndex && a === otherIndex)
  );
}

export default function Ecosystem() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [tappedNode, setTappedNode] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const cx = 400;
  const cy = 400;
  const radius = 260;

  const positions = nodes.map((_, i) => getNodePosition(i, nodes.length, cx, cy, radius));

  return (
    <section ref={sectionRef} className="py-[96px] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ duration: 1, ease: "easeOut" as const }}
      >
        {/* Main Eyebrow (Centered) */}
        <div className="max-w-[1280px] mx-auto px-6 text-center mb-10 lg:mb-16">
          <p className="text-eyebrow text-primary">Connected by Design</p>
        </div>

        {/* Two-column Layout on Desktop */}
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left: SVG Network */}
          <div className="w-full lg:w-[60%] shrink-0">
            <svg
              viewBox="0 0 800 800"
              className="w-full h-auto"
              style={{ maxHeight: "700px" }}
            >
              {/* Connection lines */}
              {connections.map(([a, b], i) => {
                const from = positions[a];
                const to = positions[b];
                const isHighlighted =
                  hoveredNode !== null &&
                  (hoveredNode === a || hoveredNode === b);

                return (
                  <motion.line
                    key={`conn-${i}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="var(--color-primary)"
                    strokeWidth={isHighlighted ? 1.5 : 1}
                    opacity={isHighlighted ? 0.8 : 0.03}
                    style={{
                      transition: "all 0.3s ease",
                      filter: isHighlighted ? "drop-shadow(0 0 6px rgba(79,91,196,0.4))" : "none"
                    }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={isInView ? { pathLength: 1, opacity: isHighlighted ? 0.6 : 0.15 } : {}}
                    transition={{ duration: 0, delay: 0 + i * 0 }}
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node, i) => {
                const pos = positions[i];
                const Icon = node.icon;
                const isHovered = hoveredNode === i;
                const isConnectedToHovered =
                  hoveredNode !== null && isConnected(hoveredNode, i);
                const isActive = isHovered || isConnectedToHovered;

                return (
                  <motion.g
                    key={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + i * 0.06,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                    onMouseEnter={() => setHoveredNode(i)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    {/* Node circle */}
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r={40}
                      fill={isHovered ? "var(--color-surface-2)" : "var(--color-surface-1)"}
                      stroke="var(--color-primary)"
                      strokeOpacity={isActive ? 1 : 0.25}
                      strokeWidth={isHovered ? 1.5 : 1}
                      style={{
                        transition: "all 0.3s ease",
                        filter: isActive
                          ? "drop-shadow(0 0 16px rgba(79,91,196,0.4))"
                          : "drop-shadow(0 0 8px rgba(79,91,196,0.12))"
                      }}
                    />

                    {/* Icon */}
                    <foreignObject
                      x={pos.x - 10}
                      y={pos.y - 10}
                      width={20}
                      height={20}
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.5}
                        color={isActive ? "var(--color-ink)" : "var(--color-ink-subtle)"}
                        style={{ transition: "color 0.2s ease" }}
                      />
                    </foreignObject>

                    {/* Label */}
                    <text
                      x={pos.x}
                      y={pos.y + 56}
                      textAnchor="middle"
                      fill={isActive ? "var(--color-ink)" : "var(--color-ink-subtle)"}
                      fontSize={12}
                      fontWeight={500}
                      fontFamily="Inter, sans-serif"
                      style={{ transition: "fill 0.2s ease" }}
                    >
                      {node.label}
                    </text>
                  </motion.g>
                );
              })}

              {/* Tooltip */}
              {hoveredNode !== null && (
                <foreignObject
                  x={Math.min(Math.max(positions[hoveredNode].x - 120, 10), 560)}
                  y={positions[hoveredNode].y - 110}
                  width={240}
                  height={80}
                  style={{ pointerEvents: "none", overflow: "visible" }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className="bg-canvas border border-hairline-strong rounded-[8px] px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                  >
                    <p className="text-[14px] font-medium text-ink">
                      {nodes[hoveredNode].label}
                    </p>
                    <p className="text-[13px] text-ink-muted mt-0.5">
                      {nodes[hoveredNode].role}
                    </p>
                  </motion.div>
                </foreignObject>
              )}
            </svg>
          </div>

          {/* Right: Header Text & Mobile Grid */}
          <div className="w-full lg:w-[40%] flex flex-col text-center lg:text-left">
            <h2 className="text-display-lg text-ink mb-4 lg:mb-6">
              Your Business, Fully Connected
            </h2>
            <p className="text-body-lg text-ink-muted max-w-[600px] mx-auto lg:mx-0 mb-10">
              Every function works together as one integrated ecosystem.
            </p>


          </div>
        </div>
      </motion.div>
    </section>
  );
}
