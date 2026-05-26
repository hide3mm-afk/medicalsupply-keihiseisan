import Link from "next/link";
import { footerContent } from "@/lib/content/footer";

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* 左：ロゴ＋住所 */}
          <div>
            <p className="text-xl font-bold">{footerContent.logo.en}</p>
            <p className="mb-4 mt-0.5 text-xs text-blue-200">{footerContent.logo.ja}</p>
            <p className="mb-5 text-sm text-blue-100">{footerContent.catchcopy}</p>
            <div className="space-y-3 text-xs text-blue-200">
              <div>
                <p className="mb-0.5 font-semibold text-white">{footerContent.address.yokohama.label}</p>
                <p>{footerContent.address.yokohama.address}</p>
                <p>TEL: {footerContent.address.yokohama.tel} / FAX: {footerContent.address.yokohama.fax}</p>
              </div>
              <div>
                <p className="mb-0.5 font-semibold text-white">{footerContent.address.tachikawa.label}</p>
                <p>{footerContent.address.tachikawa.address}</p>
                <p>TEL: {footerContent.address.tachikawa.tel} / FAX: {footerContent.address.tachikawa.fax}</p>
              </div>
            </div>
          </div>

          {/* 中央：サイトマップ */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-blue-200">サイトマップ</h3>
            <ul className="space-y-2">
              {footerContent.siteLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-blue-100 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 右：GEバッジ */}
          <div className="flex flex-col items-start md:items-end">
            <div className="rounded-lg border-2 border-blue-300 px-5 py-4 text-center">
              <p className="mb-1 text-[10px] uppercase tracking-wider text-blue-300">Authorized Dealer</p>
              <p className="whitespace-pre-line text-sm font-bold leading-snug text-white">{footerContent.badge}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-blue-800 pt-6 sm:flex-row">
          <p className="text-xs text-blue-300">{footerContent.copyright}</p>
          <Link href="/privacy" className="text-xs text-blue-300 transition-colors hover:text-white">
            プライバシーポリシー
          </Link>
        </div>
      </div>
    </footer>
  );
}
