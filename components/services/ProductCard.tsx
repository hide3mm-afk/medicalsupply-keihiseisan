interface ProductCardProps {
  name: string;
  subtitle: string;
  description: string;
  image: string; // ← public/images/products/ 以下のパス（lib/content/services.ts で設定）
}

export default function ProductCard({ name, subtitle, description }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/*
        製品画像プレースホルダー
        public/images/products/{製品ID}.jpg を配置後、lib/content/services.ts の image パスで参照されます
      */}
      <div className="flex h-48 items-center justify-center bg-gradient-to-br from-primary to-primary-mid text-center">
        <div>
          <p className="text-lg font-bold text-white">{name}</p>
          <p className="mt-1 text-sm text-blue-200">{subtitle}</p>
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
