"use client";

import { useState, useEffect, useRef } from "react";
import { clsx } from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/Button";
import type { CTAButton } from "@/types/blocks";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// StickyCtaBar — Appears after the user scrolls past the hero section.
// Stays fixed at the bottom (or top) of the viewport with a CTA + optional
// urgency text. Hides when the footer comes into view.
// ---------------------------------------------------------------------------

export interface StickyCtaBarProps {
  /** Primary call-to-action button */
  cta: CTAButton;
  /** Optional urgency/scarcity line shown beside the CTA */
  urgencyText?: string;
  /** Where to stick: bottom (default, mobile-friendly) or top */
  position?: "top" | "bottom";
  /** CSS selector of the element after which the bar should appear (default: first <section>) */
  triggerSelector?: string;
  /** CSS selector for the footer — bar hides when footer is in view */
  footerSelector?: string;
  /** Background style override */
  bgClassName?: string;
  /** Show a subtle pulsing glow on the CTA button */
  pulseGlow?: boolean;
  /** Optional spots-left counter for scarcity */
  spotsLeft?: number;
}

export function StickyCtaBar({
  cta,
  urgencyText,
  position = "bottom",
  triggerSelector,
  footerSelector = "footer",
  bgClassName,
  pulseGlow = true,
  spotsLeft,
}: StickyCtaBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Determine trigger element — first section or custom selector
    const triggerEl = triggerSelector
      ? document.querySelector(triggerSelector)
      : document.querySelector("section");

    if (!triggerEl) {
      // Fallback: show after 600px scroll
      const fallback = ScrollTrigger.create({
        trigger: document.body,
        start: "600px top",
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false),
      });
      return () => fallback.kill();
    }

    // Show bar when user scrolls past the trigger element
    const showTrigger = ScrollTrigger.create({
      trigger: triggerEl,
      start: "bottom 80%",
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    // Hide bar when footer enters viewport
    const footerEl = document.querySelector(footerSelector);
    let hideTrigger: ScrollTrigger | undefined;
    if (footerEl) {
      hideTrigger = ScrollTrigger.create({
        trigger: footerEl,
        start: "top bottom",
        onEnter: () => setIsVisible(false),
        onLeaveBack: () => setIsVisible(true),
      });
    }

    return () => {
      showTrigger.kill();
      hideTrigger?.kill();
    };
  }, [triggerSelector, footerSelector]);

  // Animate in/out
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const yFrom = position === "bottom" ? 100 : -100;

    gsap.to(bar, {
      y: isVisible ? 0 : yFrom,
      opacity: isVisible ? 1 : 0,
      duration: 0.4,
      ease: "power3.out",
      pointerEvents: isVisible ? "auto" : "none",
    });
  }, [isVisible, position]);

  return (
    <div
      ref={barRef}
      style={{ opacity: 0, pointerEvents: "none" }}
      className={clsx(
        "fixed left-0 right-0 z-50",
        position === "bottom" ? "bottom-0" : "top-0",
        bgClassName ||
          "bg-secondary/95 backdrop-blur-md border-t border-primary/20 shadow-2xl shadow-black/30"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Urgency text + spots counter */}
        <div className="flex items-center gap-3">
          {urgencyText && (
            <span className="text-white/90 text-sm font-medium hidden sm:inline">
              {urgencyText}
            </span>
          )}
          {spotsLeft !== undefined && spotsLeft > 0 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-danger" />
              </span>
              <span className="text-danger">
                Solo {spotsLeft} posti rimasti
              </span>
            </span>
          )}
        </div>

        {/* CTA button */}
        <div className={clsx(pulseGlow && "pulse-glow rounded-full")}>
          <Button {...cta} size="md" />
        </div>
      </div>
    </div>
  );
}
