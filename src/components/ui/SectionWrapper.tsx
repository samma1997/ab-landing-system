"use client";

import { clsx } from "clsx";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  bgOverride?: string;
  className?: string;
  narrow?: boolean;
  noPadding?: boolean;
}

export function SectionWrapper({
  children,
  id,
  bgOverride,
  className,
  narrow,
  noPadding,
}: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={clsx(
        bgOverride || "bg-white",
        !noPadding && "py-16 md:py-24",
        className
      )}
    >
      <div className={clsx("mx-auto px-4 sm:px-6 lg:px-8", narrow ? "max-w-3xl" : "max-w-7xl")}>
        {children}
      </div>
    </motion.section>
  );
}
