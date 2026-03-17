"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import type { CountdownBlock } from "@/types/blocks";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft | null {
  const diff = new Date(targetDate).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border border-white/20">
        <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-xs text-gray-400 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export function CountdownTimer({ data }: { data: CountdownBlock }) {
  const { targetDate, headline, subheadline, cta, expiredMessage, style, bgOverride } = data;
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isExpired = timeLeft === null;

  if (style === "floating") {
    return (
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-secondary/95 backdrop-blur-md border-t border-primary/30 py-3 px-4"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {!isExpired ? (
            <>
              <span className="text-white font-semibold text-sm">{headline}</span>
              <div className="flex gap-3">
                {[
                  { v: timeLeft.days, l: "G" },
                  { v: timeLeft.hours, l: "O" },
                  { v: timeLeft.minutes, l: "M" },
                  { v: timeLeft.seconds, l: "S" },
                ].map(({ v, l }) => (
                  <div key={l} className="flex items-center gap-1">
                    <span className="bg-primary text-white text-lg font-bold rounded px-2 py-0.5 tabular-nums">
                      {String(v).padStart(2, "0")}
                    </span>
                    <span className="text-gray-400 text-xs">{l}</span>
                  </div>
                ))}
              </div>
              {cta && <Button {...cta} size="sm" />}
            </>
          ) : (
            <span className="text-white">{expiredMessage || "L'offerta e' terminata."}</span>
          )}
        </div>
      </motion.div>
    );
  }

  const isBanner = style === "banner";

  return (
    <section
      className={clsx(
        bgOverride || "bg-gradient-to-r from-secondary to-secondary-light",
        isBanner ? "py-8" : "py-16 md:py-24"
      )}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        {!isExpired ? (
          <>
            {headline && (
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{headline}</h2>
            )}
            {subheadline && <p className="text-gray-300 mb-8">{subheadline}</p>}

            <div className="flex justify-center gap-4 md:gap-6 mb-8">
              <TimeUnit value={timeLeft.days} label="Giorni" />
              <TimeUnit value={timeLeft.hours} label="Ore" />
              <TimeUnit value={timeLeft.minutes} label="Minuti" />
              <TimeUnit value={timeLeft.seconds} label="Secondi" />
            </div>

            {cta && (
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Button {...cta} size="lg" />
              </motion.div>
            )}
          </>
        ) : (
          <p className="text-xl text-white">{expiredMessage || "L'offerta e' terminata."}</p>
        )}
      </div>
    </section>
  );
}
