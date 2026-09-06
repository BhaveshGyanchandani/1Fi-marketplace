import type { Brand } from '../../lib/types';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface BrandCardProps {
  brand: Brand;
  onClick?: (brandId: string) => void;
}

/**
 * Clickable (was a plain non-interactive <div> before) — Top Brands has no
 * real destination page per PROJECT.md's scope (it's an explicitly blank
 * placeholder tab), so this fires an optional onClick rather than a route
 * link. Logo uses ImageWithFallback since logo.clearbit.com — the source
 * every brand.logo URL points at — was permanently shut down December 2025;
 * every brand card was showing a broken-image icon for that reason, not a
 * one-off bad URL.
 */
export function BrandCard({ brand, onClick }: BrandCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(brand.id)}
      className="flex flex-col items-center gap-2 rounded-card bg-white p-4 text-center shadow-card transition-shadow hover:shadow-md active:scale-[0.97]"
    >
      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gray-50">
        <ImageWithFallback
          src={brand.logo}
          alt={brand.name}
          fallbackLabel={brand.name}
          className="h-full w-full object-contain p-2"
        />
      </div>
      <p className="text-[13px] font-semibold text-gray-900">{brand.name}</p>
      <p className="text-[11px] text-gray-400 leading-snug">{brand.tagline}</p>
    </button>
  );
}

interface BrandGridProps {
  brands: Brand[];
  onBrandClick?: (brandId: string) => void;
}

export function BrandGrid({ brands, onBrandClick }: BrandGridProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} onClick={onBrandClick} />
      ))}
    </div>
  );
}
