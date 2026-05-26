import Link from "next/link";
import { ctaContent } from "@/lib/content/home";

export default function CtaSection() {
  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        {/* lib/content/home.ts の ctaContent.heading を変更するとここが変わります */}
        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">{ctaContent.heading}</h2>
        <p className="mb-8 leading-relaxed text-blue-100">{ctaContent.subHeading}</p>
        <Link href={ctaContent.cta.href}
          className="inline-block rounded border-2 border-white px-10 py-3 font-medium text-white transition-all duration-300 hover:bg-white hover:text-primary">
          {ctaContent.cta.label}
        </Link>
      </div>
    </section>
  );
}
