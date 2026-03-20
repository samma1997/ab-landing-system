"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { clsx } from "clsx";
import gsap from "gsap";

// ---------------------------------------------------------------------------
// SocialProofTicker — "Marco da Milano si e' appena iscritto" style
// real-time social proof notifications. Cycles through a list of
// notifications with slide-in/slide-out GSAP animations.
// ---------------------------------------------------------------------------

export interface SocialProofNotification {
  /** Person's name */
  name: string;
  /** City or location */
  location: string;
  /** Action description, e.g. "si e' iscritto al corso" */
  action: string;
  /** Time ago text, e.g. "2 minuti fa" */
  timeAgo?: string;
  /** Avatar URL (optional, shows initials if missing) */
  avatarUrl?: string;
}

export interface SocialProofTickerProps {
  /** List of notifications to cycle through */
  notifications: SocialProofNotification[];
  /** How long each notification stays visible (ms) */
  displayDuration?: number;
  /** Delay before the first notification appears (ms) */
  initialDelay?: number;
  /** Position on screen */
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  /** Maximum number to show before stopping (0 = infinite loop) */
  maxShown?: number;
  /** Allow user to dismiss */
  dismissible?: boolean;
  /** Randomize order of notifications */
  randomize?: boolean;
  /** Visual theme */
  theme?: "light" | "dark" | "brand";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const positionClasses: Record<string, string> = {
  "bottom-left": "bottom-4 left-4",
  "bottom-right": "bottom-4 right-4",
  "top-left": "top-4 left-4",
  "top-right": "top-4 right-4",
};

const themeConfig = {
  light: {
    bg: "bg-white shadow-xl shadow-black/10 border border-gray-100",
    name: "text-gray-900",
    action: "text-gray-600",
    time: "text-gray-400",
    avatar: "bg-primary/10 text-primary",
  },
  dark: {
    bg: "bg-secondary/95 backdrop-blur-md shadow-xl shadow-black/30 border border-white/10",
    name: "text-white",
    action: "text-gray-300",
    time: "text-gray-500",
    avatar: "bg-accent/20 text-accent",
  },
  brand: {
    bg: "bg-primary/95 backdrop-blur-md shadow-xl shadow-primary/30 border border-white/10",
    name: "text-white",
    action: "text-white/80",
    time: "text-white/50",
    avatar: "bg-white/20 text-white",
  },
};

export function SocialProofTicker({
  notifications,
  displayDuration = 4000,
  initialDelay = 5000,
  position = "bottom-left",
  maxShown = 0,
  dismissible = true,
  randomize = true,
  theme = "light",
}: SocialProofTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [shownCount, setShownCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Build randomized order once
  const [order] = useState<number[]>(() => {
    const indices = notifications.map((_, i) => i);
    if (randomize) {
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
    }
    return indices;
  });

  const showNotification = useCallback(
    (orderIdx: number) => {
      if (dismissed) return;
      if (maxShown > 0 && shownCount >= maxShown) return;

      const realIndex = order[orderIdx % order.length];
      setCurrentIndex(realIndex);
      setIsVisible(true);
      setShownCount((c) => c + 1);

      // Animate in
      if (cardRef.current) {
        const isLeft = position.includes("left");
        gsap.fromTo(
          cardRef.current,
          {
            x: isLeft ? -120 : 120,
            opacity: 0,
            scale: 0.9,
          },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.4)",
          }
        );
      }

      // Schedule hide
      timeoutRef.current = setTimeout(() => {
        if (cardRef.current) {
          const isLeft = position.includes("left");
          gsap.to(cardRef.current, {
            x: isLeft ? -40 : 40,
            opacity: 0,
            scale: 0.95,
            duration: 0.35,
            ease: "power2.in",
            onComplete: () => {
              setIsVisible(false);
              // Schedule next notification
              timeoutRef.current = setTimeout(() => {
                showNotification(orderIdx + 1);
              }, 2000 + Math.random() * 3000);
            },
          });
        }
      }, displayDuration);
    },
    [dismissed, maxShown, shownCount, order, position, displayDuration]
  );

  useEffect(() => {
    if (notifications.length === 0 || dismissed) return;

    // Initial delay before first notification
    const initTimeout = setTimeout(() => {
      showNotification(0);
    }, initialDelay);

    return () => {
      clearTimeout(initTimeout);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed]);

  const handleDismiss = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => setDismissed(true),
      });
    }
  }, []);

  if (dismissed || notifications.length === 0) return null;

  const notification = currentIndex >= 0 ? notifications[currentIndex] : null;
  const colors = themeConfig[theme];

  return (
    <div
      className={clsx(
        "fixed z-40",
        positionClasses[position],
        "pointer-events-none"
      )}
    >
      <div
        ref={cardRef}
        style={{ opacity: 0 }}
        className={clsx(
          "pointer-events-auto",
          "rounded-2xl px-4 py-3.5 max-w-xs sm:max-w-sm",
          colors.bg
        )}
      >
        {notification && (
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div
              className={clsx(
                "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold",
                colors.avatar
              )}
            >
              {notification.avatarUrl ? (
                <img
                  src={notification.avatarUrl}
                  alt={notification.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                getInitials(notification.name)
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm leading-snug">
                <span className={clsx("font-semibold", colors.name)}>
                  {notification.name}
                </span>{" "}
                <span className={colors.action}>
                  da {notification.location}
                </span>
              </p>
              <p className={clsx("text-sm", colors.action)}>
                {notification.action}
              </p>
              {notification.timeAgo && (
                <p className={clsx("text-xs mt-0.5", colors.time)}>
                  {notification.timeAgo}
                </p>
              )}
            </div>

            {/* Dismiss */}
            {dismissible && (
              <button
                onClick={handleDismiss}
                className={clsx(
                  "flex-shrink-0 p-1 rounded-full transition-colors cursor-pointer",
                  theme === "light"
                    ? "text-gray-300 hover:text-gray-500"
                    : "text-white/30 hover:text-white/60"
                )}
                aria-label="Chiudi notifica"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
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
        )}

        {/* Verified badge */}
        {notification && (
          <div className="flex items-center gap-1.5 mt-2 pt-2 border-t border-gray-200/10">
            <svg
              className="w-3.5 h-3.5 text-success"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span
              className={clsx(
                "text-[10px] uppercase tracking-wider font-medium",
                theme === "light" ? "text-gray-400" : "text-white/40"
              )}
            >
              Verificato
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
