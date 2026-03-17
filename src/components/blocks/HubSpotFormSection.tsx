"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HubSpotFormBlock } from "@/types/blocks";

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (opts: Record<string, unknown>) => void;
      };
    };
  }
}

export function HubSpotFormSection({ data }: { data: HubSpotFormBlock }) {
  const { portalId, formId, sectionTitle, sectionSubtitle, redirectUrl, sideContent, bgOverride } =
    data;
  const formRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    const script = document.createElement("script");
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.async = true;
    script.onload = () => {
      if (window.hbspt && formRef.current) {
        window.hbspt.forms.create({
          portalId,
          formId,
          target: `#hs-form-${data.id}`,
          redirectUrl,
        });
      }
    };
    document.head.appendChild(script);
  }, [portalId, formId, redirectUrl, data.id]);

  const hasSide = !!sideContent;

  return (
    <SectionWrapper bgOverride={bgOverride} id={data.id}>
      <SectionHeading title={sectionTitle} subtitle={sectionSubtitle} />

      <div className={hasSide ? "grid md:grid-cols-2 gap-12 items-center" : "max-w-xl mx-auto"}>
        {/* Side content */}
        {hasSide && sideContent && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {sideContent.type === "image" && sideContent.image && (
              <img
                src={sideContent.image.src}
                alt={sideContent.image.alt}
                className="rounded-2xl shadow-lg"
              />
            )}
            {sideContent.type === "benefits" && sideContent.benefits && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-secondary mb-6">
                  Cosa otterrai:
                </h3>
                {sideContent.benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-lg">{b}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Form container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <div id={`hs-form-${data.id}`} ref={formRef} />
          <p className="text-xs text-gray-400 mt-4 text-center">
            Compilando il form accetti la nostra{" "}
            <a href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </a>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
