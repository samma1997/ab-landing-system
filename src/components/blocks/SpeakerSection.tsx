"use client";

import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import type { SpeakerBlock } from "@/types/blocks";

export function SpeakerSection({ data }: { data: SpeakerBlock }) {
  const { name, title, bio, bioHtml, photo, credentials, books, bgOverride } = data;

  return (
    <SectionWrapper bgOverride={bgOverride}>
      <div className="grid md:grid-cols-5 gap-12 items-center">
        {/* Photo column */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-2"
        >
          <div className="relative">
            <img
              src={photo.src}
              alt={photo.alt || name}
              className="rounded-2xl shadow-2xl w-full"
            />
            {/* Orange accent corner */}
            <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary rounded-2xl -z-10" />
          </div>
        </motion.div>

        {/* Info column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-3"
        >
          <h2 className="text-3xl md:text-4xl font-black text-secondary mb-1">{name}</h2>
          <p className="text-primary font-semibold text-lg mb-6">{title}</p>

          {bioHtml ? (
            <div
              className="text-gray-600 leading-relaxed mb-6 space-y-4"
              dangerouslySetInnerHTML={{ __html: bioHtml }}
            />
          ) : (
            <p className="text-gray-600 leading-relaxed mb-6">{bio}</p>
          )}

          {/* Credentials */}
          {credentials.length > 0 && (
            <ul className="space-y-2 mb-8">
              {credentials.map((cred, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{cred}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Books */}
          {books && books.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Libri pubblicati
              </p>
              <div className="flex gap-4">
                {books.map((book, i) => (
                  <a
                    key={i}
                    href={book.url || "#"}
                    className="group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={book.coverImage.src}
                      alt={book.title}
                      className="h-32 w-auto rounded-lg shadow-md group-hover:shadow-xl group-hover:-translate-y-1 transition-all"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
