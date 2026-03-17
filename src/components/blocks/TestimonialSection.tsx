"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Play } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TestimonialBlock, Testimonial } from "@/types/blocks";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300">
      {testimonial.video && !showVideo && (
        <button
          onClick={() => setShowVideo(true)}
          className="relative w-full aspect-video rounded-xl overflow-hidden mb-6 group cursor-pointer"
        >
          <img
            src={testimonial.video.posterImage || "/placeholder-video.jpg"}
            alt={`Video di ${testimonial.name}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-7 h-7 text-white ml-1" />
            </div>
          </div>
        </button>
      )}

      {showVideo && testimonial.video && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-6">
          <iframe
            src={testimonial.video.src}
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      )}

      {testimonial.rating && <StarRating rating={testimonial.rating} />}

      <blockquote className="text-gray-700 mt-4 mb-6 italic leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar.src}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div>
          <div className="font-bold text-secondary">{testimonial.name}</div>
          {testimonial.role && <div className="text-sm text-gray-500">{testimonial.role}</div>}
        </div>
      </div>
    </div>
  );
}

export function TestimonialSection({ data }: { data: TestimonialBlock }) {
  const { sectionTitle, testimonials, layout, bgOverride } = data;
  const [current, setCurrent] = useState(0);

  if (layout === "carousel") {
    return (
      <SectionWrapper bgOverride={bgOverride || "bg-surface"}>
        <SectionHeading title={sectionTitle} />
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <TestimonialCard testimonial={testimonials[current]} />
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setCurrent((p) => (p === 0 ? testimonials.length - 1 : p - 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors cursor-pointer ${
                      i === current ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => setCurrent((p) => (p === testimonials.length - 1 ? 0 : p + 1))}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </SectionWrapper>
    );
  }

  // Grid or featured layout
  return (
    <SectionWrapper bgOverride={bgOverride || "bg-surface"}>
      <SectionHeading title={sectionTitle} />
      <div
        className={
          layout === "featured"
            ? "max-w-3xl mx-auto space-y-6"
            : "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        }
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <TestimonialCard testimonial={t} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
