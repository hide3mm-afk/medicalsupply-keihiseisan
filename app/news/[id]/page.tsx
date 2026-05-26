import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { newsData } from "@/lib/news-data";

export function generateStaticParams() {
  return newsData.map((n) => ({ id: n.id }));
}

// Next.js 15+ では params が Promise になりました
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const news = newsData.find((n) => n.id === id);
  if (!news) return {};
  return { title: news.title };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const news = newsData.find((n) => n.id === id);
  if (!news) notFound();

  return (
    <>
      <div className="bg-primary pt-16 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-sm text-blue-200">{news.date}</span>
            <span className="rounded bg-primary-light px-2 py-0.5 text-xs text-white">{news.category}</span>
          </div>
          <h1 className="text-2xl font-bold sm:text-3xl">{news.title}</h1>
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="whitespace-pre-line leading-relaxed text-gray-700">{news.content}</div>
        <div className="mt-10 border-t border-gray-200 pt-8">
          <Link href="/news" className="text-sm font-medium text-primary-mid transition-colors hover:text-primary">
            ← お知らせ一覧へ戻る
          </Link>
        </div>
      </div>
    </>
  );
}
