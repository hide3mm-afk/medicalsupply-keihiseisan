import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "株式会社メディカルサプライ | GEヘルスケア特約販売店",
    template: "%s | 株式会社メディカルサプライ",
  },
  description:
    "GEヘルスケア・ジャパン株式会社の特約販売店として、超音波診断装置を中心に医療機器を販売する株式会社メディカルサプライ。横浜・立川の2拠点で全国の医療現場をサポートします。",
  keywords: ["超音波診断装置", "GEヘルスケア", "医療機器", "クリニック開業", "OPUS", "メディカルサプライ"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
