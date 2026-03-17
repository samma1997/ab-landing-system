"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { clsx } from "clsx";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { FAQBlock } from "@/types/blocks";

function FAQItem({
  question,
  answer,
  answerHtml,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  answerHtml?: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors cursor-pointer"
      >
        <span className="font-semibold text-secondary pr-4">{question}</span>
        <ChevronDown
          className={clsx(
            "w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              {answerHtml ? (
                <div
                  className="text-gray-600 leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: answerHtml }}
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{answer}</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ data }: { data: FAQBlock }) {
  const { sectionTitle, items, bgOverride } = data;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <SectionWrapper bgOverride={bgOverride} narrow>
      <SectionHeading title={sectionTitle || "Domande Frequenti"} />
      <div className="space-y-3">
        {items.map((item, i) => (
          <FAQItem
            key={i}
            question={item.question}
            answer={item.answer}
            answerHtml={item.answerHtml}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
