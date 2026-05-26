"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { heroContent } from "@/lib/content/home";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-mid to-primary-light" />

      {/* 装飾パターン（波形・グリッド） */}
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0%, transparent 50%)" }} />
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: "linear-gradient(45deg, transparent 40%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 60%, transparent 60%)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.p className="mb-6 text-xs font-semibold uppercase tracking-widest text-blue-200"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          GE Healthcare Authorized Dealer
        </motion.p>

        {/* 大見出し — lib/content/home.ts の heroContent.heading を変更するとここが変わります */}
        <motion.h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}>
          {heroContent.heading}
        </motion.h1>

        <motion.p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-blue-100 sm:text-lg"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}>
          {heroContent.subHeading}
        </motion.p>

        <motion.div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.8 }}>
          <Link href={heroContent.ctaPrimary.href}
            className="rounded border-2 border-white px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-white hover:text-primary">
            {heroContent.ctaPrimary.label}
          </Link>
          <Link href={heroContent.ctaSecondary.href}
            className="rounded bg-primary-light px-8 py-3 font-medium text-white transition-all duration-300 hover:opacity-90">
            {heroContent.ctaSecondary.label}
          </Link>
        </motion.div>
      </div>

      {/* スクロールインジケーター */}
      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/50 pt-2">
          <motion.div className="h-2 w-1 rounded-full bg-white/70"
            animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }} />
        </div>
      </motion.div>
    </section>
  );
}
