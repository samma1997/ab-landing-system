import Link from "next/link";
import { templateRegistry } from "@/lib/templates";

const templateDescriptions: Record<string, string> = {
  event: "Registrazione eventi dal vivo con speaker bio, agenda, countdown e form",
  "course-sales": "Vendita corsi online con pricing multi-tier, testimonial e FAQ",
  webinar: "Registrazione webinar gratuiti con countdown e lead capture",
  "lead-magnet": "Download lead magnet (eBook, guide) con form ottimizzato",
  "thank-you": "Pagina di conferma/ringraziamento post-conversione",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#1A1A2E] to-[#16213E] py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#D76E11]/20 text-[#D76E11] border border-[#D76E11]/30 rounded-full px-4 py-1 text-sm font-semibold mb-6">
            TEMPLATE SYSTEM
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            ABTG Landing Page
            <br />
            <span className="text-[#D76E11]">Template System</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Sistema modulare per generare landing page ad alta conversione per
            Alfio Bardolla Training Group. Seleziona un template per vedere la preview.
          </p>
        </div>

        <div className="grid gap-6">
          {Object.entries(templateRegistry).map(([key, config]) => (
            <Link
              key={key}
              href={`/${config.slug}`}
              className="group block bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#D76E11]/30 transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-mono text-[#D76E11] uppercase tracking-wider">
                    {key}
                  </span>
                  <h2 className="text-xl font-bold text-white mt-1 group-hover:text-[#D76E11] transition-colors">
                    {config.seo.title}
                  </h2>
                  <p className="text-gray-400 text-sm mt-2">
                    {templateDescriptions[key] || config.seo.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {config.blocks.map((block) => (
                      <span
                        key={block.id}
                        className="text-xs bg-white/10 text-gray-300 rounded-full px-3 py-1"
                      >
                        {block.type}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-gray-500 group-hover:text-[#D76E11] transition-colors text-2xl">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-4">API Usage</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm mb-2">Ottieni un template predefinito:</p>
              <code className="block bg-black/30 text-[#D76E11] rounded-lg px-4 py-3 text-sm font-mono">
                GET /api/pages?template=event
              </code>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">Genera una pagina custom:</p>
              <code className="block bg-black/30 text-[#D76E11] rounded-lg px-4 py-3 text-sm font-mono">
                POST /api/pages {`{ "slug": "...", "template": "custom", "seo": {...}, "blocks": [...] }`}
              </code>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-2">JSON Schema per validazione:</p>
              <code className="block bg-black/30 text-gray-300 rounded-lg px-4 py-3 text-sm font-mono">
                src/lib/page-config-schema.json
              </code>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
