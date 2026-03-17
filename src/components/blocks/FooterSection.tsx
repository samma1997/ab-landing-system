"use client";

import type { FooterBlock } from "@/types/blocks";

export function FooterSection({ data }: { data: FooterBlock }) {
  const { companyName, companyInfo, links, socialLinks, disclaimers } = data;

  return (
    <footer className="bg-secondary-light text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
          {/* Company info */}
          <div className="max-w-sm">
            <h3 className="text-white font-bold text-lg mb-2">{companyName}</h3>
            {companyInfo && <p className="text-sm leading-relaxed">{companyInfo}</p>}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="text-sm hover:text-primary transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>

          {/* Social */}
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-4">
              {socialLinks.map((sl, i) => (
                <a
                  key={i}
                  href={sl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={sl.platform}
                >
                  <img src={sl.icon} alt={sl.platform} className="w-5 h-5" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Disclaimers */}
        {disclaimers && disclaimers.length > 0 && (
          <div className="border-t border-white/10 pt-6 space-y-2">
            {disclaimers.map((d, i) => (
              <p key={i} className="text-xs leading-relaxed">
                {d}
              </p>
            ))}
          </div>
        )}

        <div className="border-t border-white/10 mt-6 pt-6 text-center text-xs">
          &copy; {new Date().getFullYear()} {companyName}. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
