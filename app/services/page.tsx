import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ServiceSection from "@/components/services/ServiceSection";
import ProductCard from "@/components/services/ProductCard";
import { servicesPageContent } from "@/lib/content/services";

export const metadata: Metadata = {
  title: "製品・サービス",
  description: "GE超音波診断装置・医療材料・クリニック開業支援・超音波シミュレータOPUSなど、メディカルサプライの製品・サービス一覧",
};

const anchors = [
  { label: "GE超音波診断装置", href: "#ge-ultrasound" },
  { label: "医療材料・医療機器", href: "#amethyst" },
  { label: "クリニック開業支援", href: "#clinic-support" },
  { label: "超音波シミュレータ OPUS", href: "#opus" },
];

export default function ServicesPage() {
  const { geUltrasound, amethyst, clinicSupport, opus } = servicesPageContent;
  return (
    <>
      <div className="bg-primary pt-16 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">{servicesPageContent.pageTitle}</h1>
          <p className="text-blue-200">{servicesPageContent.pageSubtitle}</p>
        </div>
      </div>

      {/* アンカーナビ */}
      <nav className="sticky top-16 z-40 border-b border-gray-200 bg-white shadow-sm lg:top-20">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 whitespace-nowrap py-3 text-sm">
            {anchors.map((a) => (
              <a key={a.href} href={a.href}
                className="border-b-2 border-transparent py-1 font-medium text-gray-600 transition-colors hover:border-primary hover:text-primary">
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* GE超音波診断装置 */}
      <ServiceSection id={geUltrasound.id} badge={geUltrasound.badge} heading={geUltrasound.heading} lead={geUltrasound.lead} bg="white">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {geUltrasound.products.map((p) => (
            <ProductCard key={p.id} name={p.name} subtitle={p.subtitle} description={p.description} image={p.image} />
          ))}
        </div>
      </ServiceSection>

      {/* 医療材料・医療機器 */}
      <ServiceSection id={amethyst.id} badge={amethyst.badge} heading={amethyst.heading} lead={amethyst.lead} bg="pale">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-bold text-primary">{amethyst.mainProduct.name}</h3>
            <p className="mb-4 text-sm text-gray-600">{amethyst.mainProduct.description}</p>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">内容品（例）</p>
            <ul className="space-y-1.5">
              {amethyst.mainProduct.contents.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary-light" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-base font-bold text-primary">その他取扱品</h3>
            <ul className="space-y-3">
              {amethyst.otherProducts.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-gray-700">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-primary-light" />{p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ServiceSection>

      {/* クリニック開業支援 */}
      <ServiceSection id={clinicSupport.id} heading={clinicSupport.heading} lead={clinicSupport.lead} bg="white">
        <div className="max-w-2xl">
          <ol className="relative ml-4 border-l-2 border-primary-light">
            {clinicSupport.steps.map((step) => (
              <li key={step.step} className="mb-8 ml-6">
                <span className="absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {step.step}
                </span>
                <h3 className="mt-0.5 text-base font-bold text-primary">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{step.description}</p>
              </li>
            ))}
          </ol>
          <Link href={clinicSupport.cta.href}
            className="mt-4 inline-block rounded bg-primary px-8 py-3 font-medium text-white transition-colors hover:bg-primary-mid">
            {clinicSupport.cta.label}
          </Link>
        </div>
      </ServiceSection>

      {/* OPUS */}
      <ServiceSection id={opus.id} heading={opus.heading} lead={opus.lead} bg="pale">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <ul className="space-y-4">
            {opus.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                  <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-gray-700">{f}</span>
              </li>
            ))}
          </ul>
          <div className="relative h-64 overflow-hidden rounded-xl lg:h-80">
            <Image
              src="/images/opus.png"
              alt="Volutracer O.P.U.S. 360 WH 超音波シミュレータ"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </ServiceSection>
    </>
  );
}
