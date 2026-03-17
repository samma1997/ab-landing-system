"use client";

import { motion } from "framer-motion";
import { CheckCircle, CalendarPlus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ThankYouBlock } from "@/types/blocks";

export function ThankYouSection({ data }: { data: ThankYouBlock }) {
  const { headline, message, messageHtml, nextSteps, cta, socialShare, calendarLink } = data;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary to-secondary-light py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto px-4 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <CheckCircle className="w-12 h-12 text-primary" />
        </motion.div>

        <h1 className="text-3xl md:text-5xl font-black text-white mb-4">{headline}</h1>

        {messageHtml ? (
          <div
            className="text-gray-300 text-lg leading-relaxed mb-8"
            dangerouslySetInnerHTML={{ __html: messageHtml }}
          />
        ) : (
          <p className="text-gray-300 text-lg leading-relaxed mb-8">{message}</p>
        )}

        {nextSteps && nextSteps.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 text-left border border-white/10">
            <h3 className="text-white font-bold text-lg mb-4">Prossimi passi:</h3>
            <ol className="space-y-3">
              {nextSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-gray-300">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4">
          {cta && <Button {...cta} size="lg" />}
          {calendarLink && (
            <a
              href={calendarLink}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-6 py-3 font-semibold transition-colors"
            >
              <CalendarPlus className="w-5 h-5" />
              Aggiungi al Calendario
            </a>
          )}
          {socialShare && (
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ text: socialShare.text, url: socialShare.url });
                }
              }}
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg px-6 py-3 font-semibold transition-colors cursor-pointer"
            >
              <Share2 className="w-5 h-5" />
              Condividi
            </button>
          )}
        </div>
      </motion.div>
    </section>
  );
}
