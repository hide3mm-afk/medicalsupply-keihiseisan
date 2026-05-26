import { Metadata } from "next";
import { companyContent } from "@/lib/content/company";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "会社情報",
  description: "株式会社メディカルサプライの会社概要・代表ご挨拶・主な取引先・アクセス情報",
};

export default function CompanyPage() {
  const { greeting, overview, clients, access } = companyContent;
  return (
    <>
      <div className="bg-primary pt-16 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="mb-3 text-3xl font-bold sm:text-4xl">会社情報</h1>
          <p className="text-blue-200">Company Information</p>
        </div>
      </div>

      {/* ご挨拶 */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionTitle heading={greeting.heading} center={false} />
          <p className="mb-6 leading-loose text-gray-700">{greeting.body}</p>
          <p className="text-sm font-medium text-gray-500">{greeting.president}</p>
        </div>
      </section>

      {/* 会社概要 */}
      <section className="bg-pale py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle heading={overview.heading} center={false} />
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <table className="w-full">
              <tbody>
                {overview.rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <th className="w-36 border-r border-gray-100 bg-pale/50 px-5 py-3 text-left text-sm font-medium text-gray-600 sm:w-44">
                      {row.label}
                    </th>
                    <td className="px-5 py-3 text-sm text-gray-800">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 主な取引先 */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle heading={clients.heading} center={false} />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {clients.list.map((client) => (
              <li key={client} className="flex items-center gap-3 rounded-lg bg-pale p-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary-light" />
                <span className="text-sm text-gray-700">{client}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* アクセス */}
      <section className="bg-pale py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionTitle heading={access.heading} center={false} />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {access.offices.map((office) => (
              <div key={office.name} className="rounded-xl bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-base font-bold text-primary">{office.name}</h3>
                <p className="mb-1 text-sm text-gray-600">{office.address}</p>
                <p className="mb-4 text-sm text-gray-600">TEL: {office.tel}</p>
                {/* TODO: Googleマップ埋め込みコードをここに挿入してください */}
                {/* 例: <iframe src="https://maps.google.com/maps?q=...&output=embed" width="100%" height="300" loading="lazy" className="rounded-lg" /> */}
                <a href={office.mapUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary-mid transition-colors hover:text-primary">
                  Google Mapsで見る →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
