"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Lock, CreditCard } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { StripeCheckoutBlock } from "@/types/blocks";

export function StripeCheckoutSection({ data }: { data: StripeCheckoutBlock }) {
  const { priceId, mode, sectionTitle, sectionSubtitle, successUrl, cancelUrl, productSummary, bgOverride } =
    data;
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode, successUrl, cancelUrl }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper bgOverride={bgOverride}>
      <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />

      <div className="max-w-4xl mx-auto grid md:grid-cols-5 gap-8">
        {/* Product summary */}
        {productSummary && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 bg-white rounded-2xl p-8 border border-gray-200"
          >
            <div className="flex gap-6 items-start mb-6">
              {productSummary.image && (
                <img
                  src={productSummary.image.src}
                  alt={productSummary.image.alt}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              )}
              <div>
                <h3 className="text-xl font-bold text-secondary">{productSummary.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{productSummary.description}</p>
              </div>
            </div>

            {productSummary.features && (
              <ul className="space-y-2 mb-6">
                {productSummary.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-gray-200 pt-4 flex items-baseline justify-between">
              <span className="text-gray-600">Totale</span>
              <span className="text-3xl font-black text-secondary">{productSummary.price}</span>
            </div>
          </motion.div>
        )}

        {/* Checkout action */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={productSummary ? "md:col-span-2" : "md:col-span-5 max-w-md mx-auto"}
        >
          <div className="bg-secondary rounded-2xl p-8 text-center">
            <CreditCard className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="text-white font-bold text-lg mb-2">Pagamento Sicuro</h3>
            <p className="text-gray-400 text-sm mb-6">
              Transazione protetta con crittografia SSL a 256 bit
            </p>

            <Button
              text={loading ? "Attendere..." : "Acquista Ora"}
              href="#"
              variant="primary"
              size="lg"
              fullWidth
              disabled={loading}
              onClick={handleCheckout}
            />

            <div className="flex items-center justify-center gap-2 mt-4 text-gray-500 text-xs">
              <Lock className="w-3.5 h-3.5" />
              Powered by Stripe
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
