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
      className="flex w-full items-center gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5 text-left shadow-[0_2px_6px_rgba(20,14,50,0.04)] transition-shadow hover:shadow-[0_6px_16px_rgba(20,14,50,0.06)]"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
        <ImageWithFallback
          src={brand.logo}
          alt={brand.name}
          fallbackLabel={brand.name}
          className="h-full w-full object-contain p-2"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-gray-900">{brand.name}</p>
        <p className="truncate text-[13px] text-gray-500">{brand.tagline}</p>
      </div>
    </button>
  );
}

interface BrandGridProps {
  brands: Brand[];
  onBrandClick?: (brandId: string) => void;
}

export function BrandGrid({ brands, onBrandClick }: BrandGridProps) {
  return (
    <div className="flex flex-col gap-3">
      {brands.map((brand) => (
        <BrandCard key={brand.id} brand={brand} onClick={onBrandClick} />
      ))}
    </div>
  );
}

export const BrandList = BrandGrid;
export const BrandListItem = BrandCard;
