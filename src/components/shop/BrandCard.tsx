import type { Brand } from '../../lib/types';

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-card bg-white p-4 text-center shadow-card">
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-50">
        <img src={brand.logo} alt={brand.name} className="h-full w-full object-contain p-2" loading="lazy" />
      </div>
      <p className="text-[13px] font-semibold text-gray-900">{brand.name}</p>
      <p className="text-[11px] text-gray-400 leading-snug">{brand.tagline}</p>
    </div>
  );
}

interface BrandGridProps {
  brands: Brand[];
}

export function BrandGrid({ brands }: BrandGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} />
      ))}
    </div>
  );
}
