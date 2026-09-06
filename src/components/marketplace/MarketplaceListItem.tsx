import { Link } from 'react-router-dom';
import type { Product } from '../../lib/types';
import { cheapestMonthly } from '../../lib/mock-server/emiEngine';

/**
 * A single Marketplace listing row: one block per item (not a grid), full
 * width, clickable — matches the real "Air India"-style reference card:
 * square logo/image on the left, title + subtitle stacked to its right.
 *
 * Classes below are the real app's exact strings, applied as-is:
 * - outer link/button: card shell (rounded corners, border, soft shadow that
 *   deepens on hover)
 * - image wrapper: fixed 64x64 (h-16 w-16), rounded, bordered, centers the
 *   logo/image and clips anything that overflows
 * - text wrapper: takes remaining width (flex-1), allowed to shrink below
 *   its content's natural width (min-w-0) so long titles/subtitles truncate
 *   instead of pushing the card wider. Note: the original spec string here
 *   was `items-between justify-between`, but those only affect a flex/grid
 *   container and `items-between` isn't a valid Tailwind value — so this
 *   wrapper adds `flex flex-col` to actually make `justify-between` do
 *   something (title pinned top, subtitle pinned bottom of the row's height).
 *
 * Consumes the same Product type as the old ProductCard/ProductGrid, which
 * this component replaces per SKILL.md's "1 per block, not a grid" listing
 * convention — subtitle is derived from the product's own EMI data via
 * cheapestMonthly(), never hardcoded, matching the no-hardcoded-data rule.
 */
interface MarketplaceListItemProps {
  product: Product;
}

export function MarketplaceListItem({ product }: MarketplaceListItemProps) {
  const fromMonthly = cheapestMonthly(product.basePriceInr);

  return (
    <Link
      to={`/shop/marketplace/${product.id}`}
      className="flex w-full cursor-pointer items-center gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5 text-left shadow-[0_2px_6px_rgba(20,14,50,0.04)] transition-shadow hover:shadow-[0_6px_16px_rgba(20,14,50,0.06)]"
    >
      <div className="flex h-16 w-16 relative overflow-hidden rounded-xl border border-gray-200 items-center justify-center shrink-0 mr-2">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="min-w-0 flex-1 flex flex-col justify-between">
        <p className="truncate text-[15px] font-semibold text-gray-900">{product.name}</p>
        <p className="truncate text-[13px] text-gray-500">
          From ₹{fromMonthly.toLocaleString('en-IN')}/mo
        </p>
      </div>
    </Link>
  );
}

/**
 * Stacks MarketplaceListItem rows one per block (vertical list, not a grid)
 * per the real app's listing pattern — each item takes the full row width.
 * Replaces the old ProductGrid.
 */
interface MarketplaceListProps {
  products: Product[];
}

export function MarketplaceList({ products }: MarketplaceListProps) {
  return (
    <div className="flex flex-col gap-3">
      {products.map((product) => (
        <MarketplaceListItem key={product.id} product={product} />
      ))}
    </div>
  );
}
