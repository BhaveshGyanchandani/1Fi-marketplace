import type { Product } from '../../lib/types';
import { MarketplaceList } from './MarketplaceListItem';

interface ProductGridProps {
  products: Product[];
}

/**
 * RETIRED as a grid: the real app's Marketplace listing is 1 item per
 * block (a vertical list), not a 2-column grid — see MarketplaceListItem.tsx
 * for the actual row styling (exact classes from the reference card).
 *
 * This wrapper is kept only so any existing `import { ProductGrid } from
 * './ProductGrid'` elsewhere (e.g. the marketplace listing page) doesn't
 * break — it now renders MarketplaceList underneath. New code should import
 * MarketplaceList directly from MarketplaceListItem.tsx instead; ProductCard
 * (the old 2-column card) is no longer used anywhere.
 */
export function ProductGrid({ products }: ProductGridProps) {
  return <MarketplaceList products={products} />;
}
