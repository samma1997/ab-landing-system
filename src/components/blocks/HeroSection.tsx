"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import type { HeroBlock } from "@/types/blocks";

export function HeroSection({ data }: { data: HeroBlock }) {
  const {
    layout,
    headline,
    headlineHtml,
    subheadline,
    cta,
    secondaryCta,
    heroImage,
    heroVideo,
    badge,
    trustIndicators,
    bgOverride,
  } = data;

  const isSplit = layout === "split";
  const isVideoBg = layout === "video-bg";

  return (
    <section
      className={clsx(
        "relative min-h-[90vh] flex items-center overflow-hidden",
        bgOverride || "bg-gradient-to-br from-secondary to-secondary-light"
      )}
    >
      {/* Video background */}
      {isVideoBg && heroVideo && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={heroVideo.posterImage}
            className="w-full h-full object-cover"
          >
            <source src={heroVideo.src} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-secondary/80" />
        </div>
      )}

      <div
        className={clsx(
          "relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20",
          isSplit ? "grid md:grid-cols-2 gap-12 items-center" : "text-center"
        )}
      >
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={isSplit ? "" : "max-w-4xl mx-auto"}
        >
          {badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-primary/20 text-primary border border-primary/30 rounded-full px-4 py-1 text-sm font-semibold mb-6"
            >
              {badge}
            </motion.span>
          )}

          {headlineHtml ? (
            <h1
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: headlineHtml }}
            />
          ) : (
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-tight mb-6">
              {headline}
            </h1>
          )}

          {subheadline && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
              style={!isSplit ? { margin: "0 auto 2rem" } : undefined}
            >
              {subheadline}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={clsx("flex gap-4 flex-wrap", !isSplit && "justify-center")}
          >
            <Button {...cta} size="lg" />
            {secondaryCta && <Button {...secondaryCta} variant="outline" size="lg" />}
          </motion.div>

          {trustIndicators && trustIndicators.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className={clsx("mt-8 flex gap-6 text-sm text-gray-400", !isSplit && "justify-center")}
            >
              {trustIndicators.map((t, i) => (
                <span key={i} className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {t}
                </span>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Hero image (split layout) */}
        {isSplit && heroImage && (
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width || 600}
                height={heroImage.height || 500}
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10" />
          </motion.div>
        )}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" className="w-full text-white fill-current">
          <path d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,53.3C1120,53,1280,43,1360,37.3L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z" />
        </svg>
      </div>
    </section>
  );
}
