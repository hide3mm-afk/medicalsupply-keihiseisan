interface SectionTitleProps {
  heading: string;
  subHeading?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({ heading, subHeading, center = true, light = false }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      {subHeading && (
        <p className={`mb-3 text-xs font-semibold uppercase tracking-widest ${light ? "text-blue-200" : "text-primary-light"}`}>
          {subHeading}
        </p>
      )}
      <h2 className={`text-2xl font-bold sm:text-3xl ${light ? "text-white" : "text-primary"}`}>
        {heading}
      </h2>
      <div className={`mt-4 h-1 w-16 rounded bg-primary-light ${center ? "mx-auto" : ""}`} />
    </div>
  );
}
