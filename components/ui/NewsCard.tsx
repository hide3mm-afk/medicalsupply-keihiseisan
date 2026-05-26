import Link from "next/link";
import { NewsItem } from "@/lib/news-data";

export default function NewsCard({ news }: { news: NewsItem }) {
  return (
    <Link
      href={`/news/${news.id}`}
      className="-mx-2 flex flex-col gap-3 rounded px-2 py-4 border-b border-gray-100 transition-colors hover:bg-pale/60 group sm:flex-row sm:items-center"
    >
      <div className="flex shrink-0 items-center gap-3 sm:w-64">
        <span className="whitespace-nowrap text-sm text-gray-500">{news.date}</span>
        <span className="shrink-0 rounded bg-primary-light px-2 py-0.5 text-xs text-white">
          {news.category}
        </span>
      </div>
      <p className="text-sm text-gray-800 transition-colors group-hover:text-primary">{news.title}</p>
    </Link>
  );
}
