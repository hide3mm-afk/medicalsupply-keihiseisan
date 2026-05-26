import { Metadata } from "next";
import { newsData } from "@/lib/news-data";
import NewsCard from "@/components/ui/NewsCard";

export const metadata: Metadata = {
  title: "お知らせ",
  description: "株式会社メディカルサプライからのお知らせ・新着情報",
};

export default function NewsPage() {
  return (
    <>
      <div className="bg-primary pt-16 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">お知らせ</h1>
          <p className="text-blue-200">News & Information</p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* お知らせは lib/news-data.ts で管理しています */}
        {newsData.map((news) => <NewsCard key={news.id} news={news} />)}
      </div>
    </>
  );
}
