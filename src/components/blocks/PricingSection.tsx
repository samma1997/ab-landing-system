"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { clsx } from "clsx";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { PricingBlock } from "@/types/blocks";

export function PricingSection({ data }: { data: PricingBlock }) {
  const { sectionTitle, sectionSubtitle, tiers, guarantee, bgOverride } = data;

  const isSingle = tiers.length === 1;

  return (
    <SectionWrapper bgOverride={bgOverride}>
      <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />

      <div
        className={clsx(
          "grid gap-8",
          isSingle
            ? "max-w-lg mx-auto"
            : tiers.length === 2
              ? "md:grid-cols-2 max-w-4xl mx-auto"
              : "md:grid-cols-3"
        )}
      >
        {tiers.map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className={clsx(
              "relative rounded-2xl p-8 border-2 transition-shadow",
              tier.highlighted
                ? "border-primary bg-white shadow-2xl shadow-primary/10 scale-105 z-10"
                : "border-gray-200 bg-white hover:shadow-lg"
            )}
          >
            {tier.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-bold uppercase px-4 py-1 rounded-full">
                  {tier.badge}
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-secondary mb-2">{tier.name}</h3>
              {tier.description && (
                <p className="text-sm text-gray-500 mb-4">{tier.description}</p>
              )}
              <div className="flex items-baseline justify-center gap-2">
                {tier.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">{tier.originalPrice}</span>
                )}
                <span className="text-4xl md:text-5xl font-black text-secondary">{tier.price}</span>
                {tier.period && <span className="text-gray-500">/{tier.period}</span>}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, fi) => (
                <li key={fi} className="flex items-start gap-3">
                  {feature.included ? (
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <span
                    className={clsx(
                      "text-sm",
                      feature.included ? "text-gray-700" : "text-gray-400"
                    )}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              {...tier.cta}
              fullWidth
              variant={tier.highlighted ? "primary" : "outline"}
              size="lg"
            />
          </motion.div>
        ))}
      </div>

      {guarantee && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 rounded-full px-6 py-2 text-sm font-medium">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {guarantee}
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}
