"use client";

import type { LandingBlock } from "@/types/blocks";
import {
  TestimonialSection,
  SpeakerSection,
  EventDetailsSection,
  PricingSection,
  FAQSection,
  CountdownTimer,
  HubSpotFormSection,
  StripeCheckoutSection,
  ThankYouSection,
  FooterSection,
} from "@/components/blocks";
import { HeroAnimated } from "@/components/blocks/HeroAnimated";
import { SocialProofAnimated } from "@/components/blocks/SocialProofAnimated";
import { BenefitsAnimated } from "@/components/blocks/BenefitsAnimated";

const blockComponents: Record<string, React.ComponentType<{ data: any }>> = {
  hero: HeroAnimated,
  "social-proof": SocialProofAnimated,
  benefits: BenefitsAnimated,
  testimonials: TestimonialSection,
  speaker: SpeakerSection,
  "event-details": EventDetailsSection,
  pricing: PricingSection,
  faq: FAQSection,
  countdown: CountdownTimer,
  "hubspot-form": HubSpotFormSection,
  "stripe-checkout": StripeCheckoutSection,
  "thank-you": ThankYouSection,
  footer: FooterSection,
};

interface BlockRendererProps {
  blocks: LandingBlock[];
}

export function BlockRenderer({ blocks }: BlockRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        const Component = blockComponents[block.type];
        if (!Component) {
          if (process.env.NODE_ENV === "development") {
            return (
              <div
                key={block.id}
                className="bg-red-50 border border-red-200 text-red-700 p-6 text-center"
              >
                Unknown block type: <code>{block.type}</code>
              </div>
            );
          }
          return null;
        }

        // Respect visibility settings
        const vis = block.visibility;
        const hideClasses = [
          vis?.mobile === false ? "hidden sm:block" : "",
          vis?.desktop === false ? "sm:hidden" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div key={block.id} className={hideClasses || undefined}>
            <Component data={block} />
          </div>
        );
      })}
    </>
  );
}
