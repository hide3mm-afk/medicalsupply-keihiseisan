"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { navLinks, logoContent, headerCta } from "@/lib/content/navigation";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
      scrolled ? "border-b border-gray-200 bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
    }`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* ロゴ */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="text-lg font-bold text-primary">{logoContent.en}</span>
            <span className="mt-0.5 text-[10px] text-gray-500">{logoContent.ja}</span>
          </Link>

          {/* デスクトップナビ */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium text-gray-700 transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
            <Link href={headerCta.href}
              className="ml-4 rounded bg-primary px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-mid">
              {headerCta.label}
            </Link>
          </nav>

          {/* ハンバーガー */}
          <button className="flex flex-col gap-1.5 p-2 lg:hidden"
            onClick={() => setMenuOpen((v) => !v)} aria-label="メニュー" aria-expanded={menuOpen}>
            <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>

        {/* モバイルメニュー */}
        {menuOpen && (
          <div className="border-t border-gray-200 bg-white py-4 lg:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-primary"
                  onClick={() => setMenuOpen(false)}>
                  {link.label}
                </Link>
              ))}
              <Link href={headerCta.href}
                className="mt-2 rounded bg-primary px-5 py-2 text-center text-sm font-medium text-white"
                onClick={() => setMenuOpen(false)}>
                {headerCta.label}
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
