"use client";

import { motion } from "framer-motion";
import { strengthsContent } from "@/lib/content/home";
import SectionTitle from "@/components/ui/SectionTitle";

export default function StrengthsSection() {
  return (
    <section className="bg-pale py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle heading={strengthsContent.heading} />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {strengthsContent.items.map((item, index) => (
            <motion.div key={item.title}
              className="rounded-xl bg-white p-8 text-center shadow-sm"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.15 }}>
              <span className="mb-4 block text-5xl">{item.icon}</span>
              <h3 className="mb-3 text-lg font-bold text-primary">{item.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
