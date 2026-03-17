"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Shield,
  Zap,
  Target,
  Award,
  BookOpen,
  Users,
  BarChart3,
  DollarSign,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { BenefitsBlock } from "@/types/blocks";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "trending-up": TrendingUp,
  shield: Shield,
  zap: Zap,
  target: Target,
  award: Award,
  "book-open": BookOpen,
  users: Users,
  "bar-chart": BarChart3,
  "dollar-sign": DollarSign,
  clock: Clock,
  "check-circle": CheckCircle,
  star: Star,
};

export function BenefitsSection({ data }: { data: BenefitsBlock }) {
  const { sectionTitle, sectionSubtitle, benefits, layout, bgOverride } = data;

  const gridCols =
    layout === "grid-3"
      ? "md:grid-cols-3"
      : layout === "grid-2"
        ? "md:grid-cols-2"
        : "md:grid-cols-1";

  return (
    <SectionWrapper bgOverride={bgOverride}>
      <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />

      {layout === "alternating" ? (
        <div className="space-y-16">
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || CheckCircle;
            const isReversed = i % 2 === 1;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  isReversed ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Icon className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className={`grid ${gridCols} gap-8`}>
          {benefits.map((benefit, i) => {
            const Icon = iconMap[benefit.icon] || CheckCircle;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-secondary mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{benefit.description}</p>
              </motion.div>
            );
          })}
        </div>
      )}
    </SectionWrapper>
  );
}
