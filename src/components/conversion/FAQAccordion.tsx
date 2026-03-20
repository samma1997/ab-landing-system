"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { clsx } from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// FAQAccordion — Premium FAQ section with GSAP-powered animations.
// Features staggered entrance, smooth height transitions, schema.org
// structured data for SEO, and optional category filtering.
// ---------------------------------------------------------------------------

export interface FAQItemData {
  question: string;
  answer: string;
  /** Rich HTML answer (takes priority over plain text) */
  answerHtml?: string;
  /** Category for filtering */
  category?: string;
}

export interface FAQAccordionProps {
  /** Section title */
  title?: string;
  /** Section subtitle */
  subtitle?: string;
  /** FAQ items */
  items: FAQItemData[];
  /** Allow multiple items open at once */
  allowMultiple?: boolean;
  /** Index of initially open item (-1 for none) */
  defaultOpen?: number;
  /** Visual style */
  theme?: "light" | "dark" | "bordered";
  /** Background class override */
  bgOverride?: string;
  /** Show category filter tabs (if items have categories) */
  showCategories?: boolean;
  /** Inject FAQ schema.org structured data */
  withSchema?: boolean;
  /** Optional CTA text below the FAQ */
  ctaText?: string;
  /** Optional CTA href */
  ctaHref?: string;
}

function FAQItem({
  question,
  answer,
  answerHtml,
  isOpen,
  onToggle,
  theme,
  index,
}: {
  question: string;
  answer: string;
  answerHtml?: string;
  isOpen: boolean;
  onToggle: () => void;
  theme: string;
  index: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    const inner = innerRef.current;
    const icon = iconRef.current;
    if (!content || !inner || !icon) return;

    if (isOpen) {
      const height = inner.scrollHeight;
      gsap.to(content, {
        height,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
      gsap.to(icon, {
        rotation: 45,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
      gsap.to(icon, {
        rotation: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const isDark = theme === "dark";
  const isBordered = theme === "bordered";

  return (
    <div
      className={clsx(
        "faq-item overflow-hidden transition-colors",
        isBordered && "border border-gray-200 rounded-xl",
        isDark && "border border-white/10 rounded-xl",
        !isBordered && !isDark && "border-b border-gray-200 last:border-b-0"
      )}
    >
      <button
        onClick={onToggle}
        className={clsx(
          "w-full flex items-center justify-between gap-4 text-left transition-colors cursor-pointer",
          isBordered || isDark ? "p-5 md:p-6" : "py-5 md:py-6",
          isDark
            ? "hover:bg-white/5"
            : "hover:bg-gray-50"
        )}
        aria-expanded={isOpen}
      >
        {/* Question number + text */}
        <div className="flex items-start gap-3 flex-1">
          <span
            className={clsx(
              "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5",
              isOpen
                ? "bg-primary text-white"
                : isDark
                  ? "bg-white/10 text-white/60"
                  : "bg-gray-100 text-gray-500"
            )}
          >
            {index + 1}
          </span>
          <span
            className={clsx(
              "font-semibold text-base md:text-lg leading-snug",
              isDark ? "text-white" : "text-secondary"
            )}
          >
            {question}
          </span>
        </div>

        {/* Plus/cross icon */}
        <svg
          ref={iconRef}
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(
            "flex-shrink-0",
            isOpen
              ? "text-primary"
              : isDark
                ? "text-white/40"
                : "text-gray-400"
          )}
        >
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>

      {/* Expandable answer */}
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <div
          ref={innerRef}
          className={clsx(
            isBordered || isDark ? "px-5 md:px-6 pb-5 md:pb-6" : "pb-5 md:pb-6",
            "pl-14 md:pl-16"
          )}
        >
          {answerHtml ? (
            <div
              className={clsx(
                "prose prose-sm max-w-none leading-relaxed",
                isDark
                  ? "text-white/70 prose-headings:text-white prose-strong:text-white prose-a:text-accent"
                  : "text-gray-600 prose-a:text-primary"
              )}
              dangerouslySetInnerHTML={{ __html: answerHtml }}
            />
          ) : (
            <p
              className={clsx(
                "leading-relaxed text-sm md:text-base",
                isDark ? "text-white/70" : "text-gray-600"
              )}
            >
              {answer}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function FAQAccordion({
  title = "Domande Frequenti",
  subtitle,
  items,
  allowMultiple = false,
  defaultOpen = 0,
  theme = "bordered",
  bgOverride,
  showCategories = false,
  withSchema = true,
  ctaText,
  ctaHref,
}: FAQAccordionProps) {
  const [openIndices, setOpenIndices] = useState<Set<number>>(
    () => new Set(defaultOpen >= 0 ? [defaultOpen] : [])
  );
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Extract unique categories
  const categories = showCategories
    ? Array.from(new Set(items.map((item) => item.category).filter(Boolean)))
    : [];

  // Filter items by category
  const filteredItems = activeCategory
    ? items.filter((item) => item.category === activeCategory)
    : items;

  const handleToggle = useCallback(
    (index: number) => {
      setOpenIndices((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          if (!allowMultiple) next.clear();
          next.add(index);
        }
        return next;
      });
    },
    [allowMultiple]
  );

  // Staggered entrance animation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".faq-item");
    gsap.fromTo(
      items,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, [activeCategory]); // Re-run when category changes

  // Schema.org FAQPage structured data
  const schemaData = withSchema
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answerHtml || item.answer,
          },
        })),
      }
    : null;

  const isDark = theme === "dark";

  return (
    <>
      {schemaData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}

      <SectionWrapper
        bgOverride={
          bgOverride ||
          (isDark ? "bg-secondary" : undefined)
        }
        narrow
      >
        <SectionHeading
          title={title}
          subtitle={subtitle}
          light={isDark}
        />

        {/* Category tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={clsx(
                "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer",
                !activeCategory
                  ? isDark
                    ? "bg-white text-secondary"
                    : "bg-primary text-white"
                  : isDark
                    ? "bg-white/10 text-white/70 hover:bg-white/20"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              Tutte
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat!)}
                className={clsx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer",
                  activeCategory === cat
                    ? isDark
                      ? "bg-white text-secondary"
                      : "bg-primary text-white"
                    : isDark
                      ? "bg-white/10 text-white/70 hover:bg-white/20"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* FAQ items */}
        <div
          ref={sectionRef}
          className={clsx(
            "space-y-3",
            theme === "bordered" || isDark ? "" : "divide-y-0"
          )}
        >
          {filteredItems.map((item, i) => (
            <FAQItem
              key={`${activeCategory}-${i}`}
              question={item.question}
              answer={item.answer}
              answerHtml={item.answerHtml}
              isOpen={openIndices.has(i)}
              onToggle={() => handleToggle(i)}
              theme={theme}
              index={i}
            />
          ))}
        </div>

        {/* Optional CTA below FAQ */}
        {ctaText && ctaHref && (
          <div className="text-center mt-10">
            <p
              className={clsx(
                "text-sm mb-3",
                isDark ? "text-white/50" : "text-gray-500"
              )}
            >
              Non hai trovato la risposta che cercavi?
            </p>
            <a
              href={ctaHref}
              className={clsx(
                "inline-flex items-center gap-2 font-semibold text-sm transition-colors",
                isDark
                  ? "text-accent hover:text-accent-dark"
                  : "text-primary hover:text-primary-dark"
              )}
            >
              {ctaText}
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
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
