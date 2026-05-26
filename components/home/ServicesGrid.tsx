"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { servicesContent } from "@/lib/content/home";
import SectionTitle from "@/components/ui/SectionTitle";

export default function ServicesGrid() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle heading={servicesContent.heading} subHeading={servicesContent.subHeading} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {servicesContent.items.map((item, index) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Link href={item.href}
                className="group relative block h-full overflow-hidden rounded-lg border border-gray-100 p-6 transition-all duration-300 hover:shadow-lg">
                {/* ホバーで青い下線が左から伸びる */}
                <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary-light transition-transform duration-300 group-hover:scale-x-100" />
                <span className="mb-4 block text-4xl">{item.icon}</span>
                <h3 className="mb-2 text-base font-bold text-primary transition-colors group-hover:text-primary-mid">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
