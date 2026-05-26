"use client";

import { motion } from "framer-motion";
import { partnersContent } from "@/lib/content/home";
import SectionTitle from "@/components/ui/SectionTitle";

export default function PartnersSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle heading={partnersContent.heading} />
        <div className="flex flex-wrap justify-center gap-4">
          {partnersContent.partners.map((partner, index) => (
            <motion.div key={partner}
              className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.07 }}>
              {partner}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
