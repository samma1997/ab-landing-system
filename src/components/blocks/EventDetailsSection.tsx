"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Monitor } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { EventDetailsBlock } from "@/types/blocks";

export function EventDetailsSection({ data }: { data: EventDetailsBlock }) {
  const {
    eventName,
    date,
    endDate,
    location,
    locationDetails,
    mapEmbedUrl,
    isOnline,
    agenda,
    cta,
    bgOverride,
  } = data;

  return (
    <SectionWrapper bgOverride={bgOverride || "bg-secondary"}>
      <SectionHeading title={eventName} subtitle="Dettagli dell'evento" light />

      <div className="grid md:grid-cols-2 gap-12">
        {/* Event info cards */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-3">
              <Calendar className="w-6 h-6 text-primary" />
              <h3 className="text-white font-bold text-lg">Data</h3>
            </div>
            <p className="text-gray-300 ml-10">
              {date}
              {endDate && ` — ${endDate}`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-4 mb-3">
              {isOnline ? (
                <Monitor className="w-6 h-6 text-primary" />
              ) : (
                <MapPin className="w-6 h-6 text-primary" />
              )}
              <h3 className="text-white font-bold text-lg">
                {isOnline ? "Online" : "Location"}
              </h3>
            </div>
            <p className="text-gray-300 ml-10">{location}</p>
            {locationDetails && (
              <p className="text-gray-400 text-sm ml-10 mt-1">{locationDetails}</p>
            )}
          </motion.div>

          {cta && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Button {...cta} size="lg" fullWidth />
            </motion.div>
          )}
        </div>

        {/* Agenda or Map */}
        <div>
          {agenda && agenda.length > 0 ? (
            <div className="space-y-1">
              <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                Programma
              </h3>
              {agenda.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 bg-white/5 rounded-xl p-4 border border-white/5"
                >
                  <div className="text-primary font-mono font-bold text-sm whitespace-nowrap pt-0.5">
                    {item.time}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{item.title}</div>
                    {item.description && (
                      <div className="text-gray-400 text-sm mt-1">{item.description}</div>
                    )}
                    {item.speaker && (
                      <div className="text-primary text-sm mt-1">con {item.speaker}</div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : mapEmbedUrl ? (
            <div className="rounded-2xl overflow-hidden h-80">
              <iframe
                src={mapEmbedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      </div>
    </SectionWrapper>
  );
}
