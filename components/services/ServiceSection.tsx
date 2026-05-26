import { ReactNode } from "react";
import Badge from "@/components/ui/Badge";
import SectionTitle from "@/components/ui/SectionTitle";

type BgType = "white" | "pale" | "gray";
const bgClass: Record<BgType, string> = { white: "bg-white", pale: "bg-pale", gray: "bg-gray-50" };

interface ServiceSectionProps {
  id: string;
  badge?: string;
  heading: string;
  lead: string;
  children: ReactNode;
  bg?: BgType;
}

export default function ServiceSection({ id, badge, heading, lead, children, bg = "white" }: ServiceSectionProps) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 ${bgClass[bg]}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {badge && <div className="mb-6"><Badge variant="secondary">{badge}</Badge></div>}
        <SectionTitle heading={heading} center={false} />
        <p className="mb-10 max-w-2xl leading-relaxed text-gray-600">{lead}</p>
        {children}
      </div>
    </section>
  );
}
