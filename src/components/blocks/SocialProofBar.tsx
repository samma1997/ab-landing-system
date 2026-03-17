"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { SocialProofBlock } from "@/types/blocks";

export function SocialProofBar({ data }: { data: SocialProofBlock }) {
  const { stats, logos, mediaLogos, description, bgOverride } = data;

  return (
    <SectionWrapper bgOverride={bgOverride || "bg-surface"} className="!py-10 md:!py-14">
      {/* Stats row */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-primary">
                {stat.prefix}
                {stat.value}
                {stat.suffix}
              </div>
              <div className="text-sm text-gray-600 mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      )}

      {description && (
        <p className="text-center text-gray-500 text-sm mb-6">{description}</p>
      )}

      {/* Logos row */}
      {logos && logos.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {logos.map((logo, i) => (
            <motion.img
              key={i}
              src={logo.src}
              alt={logo.alt}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.6 }}
              whileHover={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="h-8 md:h-10 w-auto grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      )}

      {/* Media mention logos */}
      {mediaLogos && mediaLogos.length > 0 && (
        <div className="mt-6 border-t border-gray-200 pt-6">
          <p className="text-center text-xs text-gray-400 uppercase tracking-wider mb-4">
            Visto su
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {mediaLogos.map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                className="h-6 w-auto opacity-40 hover:opacity-80 transition-opacity"
              />
            ))}
          </div>
        </div>
      )}
    </SectionWrapper>
  );
}
