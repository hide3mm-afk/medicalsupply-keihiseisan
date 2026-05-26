import Link from "next/link";
import { newsData } from "@/lib/news-data";
import NewsCard from "@/components/ui/NewsCard";
import SectionTitle from "@/components/ui/SectionTitle";

export default function NewsSection() {
  // 最新3件を表示 — 件数を変更したい場合はここの数字を変えてください
  const latestNews = newsData.slice(0, 3);
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionTitle heading="お知らせ" subHeading="News" />
        <div>{latestNews.map((news) => <NewsCard key={news.id} news={news} />)}</div>
        <div className="mt-8 text-center">
          <Link href="/news" className="text-sm font-medium text-primary-mid transition-colors hover:text-primary">
            お知らせ一覧へ →
          </Link>
        </div>
      </div>
    </section>
  );
}
