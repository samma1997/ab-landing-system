// ============================================================
// ALFIO BARDOLLA LANDING PAGE TEMPLATE SYSTEM — TYPE DEFINITIONS
// ============================================================

// ---- Shared primitives ----

export interface CTAButton {
  text: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  openInNewTab?: boolean;
}

export interface MediaAsset {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export interface VideoAsset {
  /** YouTube / Vimeo / self-hosted URL */
  src: string;
  posterImage?: string;
  autoplay?: boolean;
}

// ---- Block base ----

export interface BlockBase {
  id: string;
  type: string;
  /** Tailwind background override, e.g. "bg-secondary" */
  bgOverride?: string;
  /** Additional CSS class names */
  className?: string;
  /** Hide on mobile / desktop */
  visibility?: {
    mobile?: boolean;
    desktop?: boolean;
  };
}

// ---- 1. Hero Section ----

export interface HeroBlock extends BlockBase {
  type: "hero";
  layout: "centered" | "split" | "video-bg";
  headline: string;
  /** Supports <span class="text-primary"> for highlighting */
  headlineHtml?: string;
  subheadline?: string;
  cta: CTAButton;
  secondaryCta?: CTAButton;
  heroImage?: MediaAsset;
  heroVideo?: VideoAsset;
  badge?: string;
  /** Show floating trust indicators */
  trustIndicators?: string[];
}

// ---- 2. Social Proof Bar ----

export interface SocialProofStat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

export interface SocialProofBlock extends BlockBase {
  type: "social-proof";
  layout: "stats" | "logos" | "combined";
  stats?: SocialProofStat[];
  logos?: MediaAsset[];
  mediaLogos?: MediaAsset[];
  description?: string;
}

// ---- 3. Benefits Section ----

export interface Benefit {
  icon: string;
  title: string;
  description: string;
}

export interface BenefitsBlock extends BlockBase {
  type: "benefits";
  layout: "grid-3" | "grid-2" | "alternating";
  sectionTitle?: string;
  sectionSubtitle?: string;
  benefits: Benefit[];
}

// ---- 4. Video Testimonial Section ----

export interface Testimonial {
  name: string;
  role?: string;
  avatar?: MediaAsset;
  quote: string;
  video?: VideoAsset;
  rating?: number;
}

export interface TestimonialBlock extends BlockBase {
  type: "testimonials";
  layout: "carousel" | "grid" | "featured";
  sectionTitle?: string;
  testimonials: Testimonial[];
}

// ---- 5. Speaker / Coach Bio ----

export interface SpeakerBlock extends BlockBase {
  type: "speaker";
  name: string;
  title: string;
  bio: string;
  /** HTML bio for rich formatting */
  bioHtml?: string;
  photo: MediaAsset;
  credentials: string[];
  socialLinks?: {
    platform: string;
    url: string;
  }[];
  books?: {
    title: string;
    coverImage: MediaAsset;
    url?: string;
  }[];
}

// ---- 6. Event Details ----

export interface AgendaItem {
  time: string;
  title: string;
  description?: string;
  speaker?: string;
}

export interface EventDetailsBlock extends BlockBase {
  type: "event-details";
  eventName: string;
  date: string;
  /** ISO date string for countdown */
  dateISO: string;
  endDate?: string;
  location: string;
  locationDetails?: string;
  mapEmbedUrl?: string;
  isOnline?: boolean;
  agenda?: AgendaItem[];
  cta?: CTAButton;
}

// ---- 7. Pricing Section ----

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingTier {
  name: string;
  badge?: string;
  price: string;
  originalPrice?: string;
  period?: string;
  description?: string;
  features: PricingFeature[];
  cta: CTAButton;
  highlighted?: boolean;
}

export interface PricingBlock extends BlockBase {
  type: "pricing";
  sectionTitle?: string;
  sectionSubtitle?: string;
  tiers: PricingTier[];
  guarantee?: string;
}

// ---- 8. FAQ Accordion ----

export interface FAQItem {
  question: string;
  answer: string;
  /** HTML answer for rich content */
  answerHtml?: string;
}

export interface FAQBlock extends BlockBase {
  type: "faq";
  sectionTitle?: string;
  items: FAQItem[];
}

// ---- 9. Countdown Timer ----

export interface CountdownBlock extends BlockBase {
  type: "countdown";
  /** ISO date string */
  targetDate: string;
  headline?: string;
  subheadline?: string;
  cta?: CTAButton;
  expiredMessage?: string;
  style?: "inline" | "banner" | "floating";
}

// ---- 10. HubSpot Form Embed ----

export interface HubSpotFormBlock extends BlockBase {
  type: "hubspot-form";
  portalId: string;
  formId: string;
  sectionTitle?: string;
  sectionSubtitle?: string;
  /** Redirect URL after submission */
  redirectUrl?: string;
  /** Show alongside an image or benefits list */
  sideContent?: {
    type: "image" | "benefits";
    image?: MediaAsset;
    benefits?: string[];
  };
}

// ---- 11. Stripe Checkout Embed ----

export interface StripeCheckoutBlock extends BlockBase {
  type: "stripe-checkout";
  priceId: string;
  mode: "payment" | "subscription";
  sectionTitle?: string;
  sectionSubtitle?: string;
  successUrl: string;
  cancelUrl: string;
  /** Product summary shown beside checkout */
  productSummary?: {
    name: string;
    description: string;
    price: string;
    image?: MediaAsset;
    features?: string[];
  };
}

// ---- 12. Thank You Page ----

export interface ThankYouBlock extends BlockBase {
  type: "thank-you";
  headline: string;
  message: string;
  messageHtml?: string;
  nextSteps?: string[];
  cta?: CTAButton;
  socialShare?: {
    text: string;
    url: string;
  };
  calendarLink?: string;
}

// ---- 13. Footer ----

export interface FooterLink {
  text: string;
  href: string;
}

export interface FooterBlock extends BlockBase {
  type: "footer";
  companyName: string;
  companyInfo?: string;
  links: FooterLink[];
  socialLinks?: {
    platform: string;
    url: string;
    icon: string;
  }[];
  /** Italian legal disclaimers */
  disclaimers?: string[];
}

// ---- Union type for all blocks ----

export type LandingBlock =
  | HeroBlock
  | SocialProofBlock
  | BenefitsBlock
  | TestimonialBlock
  | SpeakerBlock
  | EventDetailsBlock
  | PricingBlock
  | FAQBlock
  | CountdownBlock
  | HubSpotFormBlock
  | StripeCheckoutBlock
  | ThankYouBlock
  | FooterBlock;

// ---- Page Configuration ----

export interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

export interface TrackingConfig {
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  hubspotTrackingCode?: string;
  customScripts?: string[];
}

export interface PageConfig {
  slug: string;
  template: "event" | "course-sales" | "webinar" | "lead-magnet" | "thank-you" | "workshop" | "custom";
  seo: SEOConfig;
  tracking?: TrackingConfig;
  blocks: LandingBlock[];
  /** Global overrides */
  theme?: {
    primaryColor?: string;
    fontFamily?: string;
  };
}
