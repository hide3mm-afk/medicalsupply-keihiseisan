import Image from "next/image";

interface ProductCardProps {
  name: string;
  subtitle: string;
  description: string;
  image: string; // ← lib/content/services.ts で設定したパス
}

export default function ProductCard({ name, subtitle, description, image }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative h-48 w-full bg-gradient-to-br from-primary to-primary-mid">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-primary/40">
          <div className="text-center">
            <p className="text-lg font-bold text-white drop-shadow">{name}</p>
            <p className="mt-1 text-sm text-blue-200">{subtitle}</p>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-primary">{name}</h3>
        <p className="mb-2 text-xs font-medium text-primary-light">{subtitle}</p>
        <p className="text-sm leading-relaxed text-gray-600">{description}</p>
      </div>
    </div>
  );
}
