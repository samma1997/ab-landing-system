import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { templateRegistry } from "@/lib/templates";
import { BlockRenderer } from "@/lib/BlockRenderer";
import type { PageConfig } from "@/types/blocks";

// In production, this would fetch from a database
async function getPageConfig(slug: string): Promise<PageConfig | null> {
  // Check template registry by slug
  for (const config of Object.values(templateRegistry)) {
    if (config.slug === slug) return config;
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = await getPageConfig(slug);
  if (!config) return {};

  return {
    title: config.seo.title,
    description: config.seo.description,
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      images: config.seo.ogImage ? [config.seo.ogImage] : [],
    },
    robots: config.seo.noIndex ? { index: false, follow: false } : undefined,
    alternates: config.seo.canonicalUrl
      ? { canonical: config.seo.canonicalUrl }
      : undefined,
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = await getPageConfig(slug);

  if (!config) notFound();

  return (
    <main className="min-h-screen">
      {/* Tracking scripts */}
      {config.tracking?.facebookPixelId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${config.tracking.facebookPixelId}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      <BlockRenderer blocks={config.blocks} />
    </main>
  );
}

// Generate static params for known templates
export async function generateStaticParams() {
  return Object.values(templateRegistry).map((config) => ({
    slug: config.slug,
  }));
}
