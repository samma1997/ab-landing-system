"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { clsx } from "clsx";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import type { CTAButton } from "@/types/blocks";

// ---------------------------------------------------------------------------
// CountdownBanner — A premium urgency banner that can be placed inline or
// fixed at the top of the page. Features flip-clock digit animations,
// gradient backgrounds, and configurable urgency messaging.
// ---------------------------------------------------------------------------

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownBannerProps {
  /** ISO date string for the countdown target */
  targetDate: string;
  /** Primary headline */
  headline?: string;
  /** Sub-text below headline or beside timer */
  subtext?: string;
  /** CTA button */
  cta?: CTAButton;
  /** Message shown when countdown expires */
  expiredMessage?: string;
  /** Display mode */
  variant?: "inline" | "fixed-top" | "fixed-bottom";
  /** Visual style */
  theme?: "brand" | "dark" | "urgent" | "gradient";
  /** Allow user to dismiss (only for fixed variants) */
  dismissible?: boolean;
  /** Show savings/offer label beside timer */
  offerLabel?: string;
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

// Flip-clock style digit with GSAP animation on change
function FlipDigit({
  value,
  label,
  theme,
}: {
  value: number;
  label: string;
  theme: string;
}) {
  const digitRef = useRef<HTMLSpanElement>(null);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value && digitRef.current) {
      gsap.fromTo(
        digitRef.current,
        { y: -8, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.35, ease: "back.out(2)" }
      );
    }
    prevValue.current = value;
  }, [value]);

  const isUrgent = theme === "urgent";

  return (
    <div className="flex flex-col items-center">
      <div
        className={clsx(
          "relative rounded-lg flex items-center justify-center overflow-hidden",
          "w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20",
          isUrgent
            ? "bg-danger/20 border border-danger/40"
            : "bg-white/10 border border-white/15 backdrop-blur-sm"
        )}
      >
        {/* Subtle split line */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
        <span
          ref={digitRef}
          className={clsx(
            "text-2xl sm:text-3xl md:text-4xl font-black tabular-nums",
            isUrgent ? "text-danger" : "text-white"
          )}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className={clsx(
          "text-[10px] sm:text-xs mt-1.5 uppercase tracking-widest font-medium",
          isUrgent ? "text-danger/70" : "text-white/50"
        )}
      >
        {label}
      </span>
    </div>
  );
}

const themeStyles: Record<string, string> = {
  brand: "bg-gradient-to-r from-primary via-primary-dark to-primary",
  dark: "bg-secondary/95 backdrop-blur-md",
  urgent: "bg-gradient-to-r from-red-950 via-red-900 to-red-950",
  gradient:
    "bg-gradient-to-r from-primary via-purple to-primary-dark",
};

export function CountdownBanner({
  targetDate,
  headline,
  subtext,
  cta,
  expiredMessage,
  variant = "inline",
  theme = "dark",
  dismissible = true,
  offerLabel,
}: CountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(() =>
    calculateTimeLeft(targetDate)
  );
  const [dismissed, setDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  // Entry animation
  useEffect(() => {
    if (bannerRef.current && variant !== "inline") {
      gsap.fromTo(
        bannerRef.current,
        {
          y: variant === "fixed-top" ? -80 : 80,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 1,
          ease: "power3.out",
        }
      );
    }
  }, [variant]);

  const handleDismiss = useCallback(() => {
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        y: variant === "fixed-top" ? -80 : 80,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => setDismissed(true),
      });
    }
  }, [variant]);

  if (dismissed) return null;

  const isExpired = timeLeft === null;
  const isFixed = variant !== "inline";

  return (
    <div
      ref={bannerRef}
      style={isFixed ? { opacity: 0 } : undefined}
      className={clsx(
        themeStyles[theme],
        isFixed && "fixed left-0 right-0 z-50",
        variant === "fixed-top" && "top-0 border-b border-white/10",
        variant === "fixed-bottom" && "bottom-0 border-t border-white/10",
        variant === "inline" && "relative",
        "shadow-2xl"
      )}
    >
      <div
        className={clsx(
          "max-w-7xl mx-auto px-4",
          variant === "inline"
            ? "py-10 md:py-16"
            : "py-3 md:py-4"
        )}
      >
        {!isExpired ? (
          <div
            className={clsx(
              "flex items-center gap-4 md:gap-6",
              variant === "inline"
                ? "flex-col text-center"
                : "flex-col sm:flex-row justify-between"
            )}
          >
            {/* Text content */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              {offerLabel && (
                <span className="bg-accent text-secondary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {offerLabel}
                </span>
              )}
              {headline && (
                <span className="text-white font-bold text-sm md:text-base">
                  {headline}
                </span>
              )}
              {subtext && variant === "inline" && (
                <p className="text-white/60 text-sm max-w-md">{subtext}</p>
              )}
            </div>

            {/* Timer digits */}
            <div
              className={clsx(
                "flex gap-2 sm:gap-3",
                variant === "inline" && "my-6"
              )}
            >
              <FlipDigit value={timeLeft.days} label="Giorni" theme={theme} />
              <span className="text-white/30 self-center text-2xl font-light">
                :
              </span>
              <FlipDigit value={timeLeft.hours} label="Ore" theme={theme} />
              <span className="text-white/30 self-center text-2xl font-light">
                :
              </span>
              <FlipDigit
                value={timeLeft.minutes}
                label="Minuti"
                theme={theme}
              />
              <span className="text-white/30 self-center text-2xl font-light">
                :
              </span>
              <FlipDigit
                value={timeLeft.seconds}
                label="Secondi"
                theme={theme}
              />
            </div>

            {/* CTA */}
            {cta && (
              <div className="flex-shrink-0">
                <Button
                  {...cta}
                  size={variant === "inline" ? "lg" : "sm"}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-white text-sm md:text-base font-medium py-1">
            {expiredMessage || "L'offerta e' scaduta."}
          </p>
        )}
      </div>

      {/* Dismiss button for fixed variants */}
      {isFixed && dismissible && !isExpired && (
        <button
          onClick={handleDismiss}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors p-1 cursor-pointer"
          aria-label="Chiudi banner"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
