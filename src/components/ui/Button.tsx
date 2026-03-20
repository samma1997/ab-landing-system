"use client";

import { clsx } from "clsx";
import type { CTAButton } from "@/types/blocks";

const variants = {
  primary:
    "bg-accent text-secondary hover:brightness-110 shadow-lg shadow-accent/25 hover:shadow-accent/40",
  secondary:
    "bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25",
  outline:
    "border-2 border-white text-white hover:bg-white hover:text-secondary",
  ghost:
    "text-primary hover:bg-primary/10",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-3.5 text-base",
  lg: "px-10 py-5 text-lg",
};

interface ButtonProps extends CTAButton {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  text,
  href,
  variant = "primary",
  size = "md",
  openInNewTab,
  className,
  onClick,
  type = "button",
  disabled,
  fullWidth,
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  if (href && !onClick) {
    return (
      <a
        href={href}
        className={classes}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {text}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}
