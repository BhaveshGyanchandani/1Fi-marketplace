import { Link } from 'react-router-dom';
import type { Product } from '../../lib/types';
import { cheapestMonthly } from '../../lib/mock-server/emiEngine';

interface ProductCardProps {
  product: Product;
}

/**
 * Pure/presentational — reusable outside the listing page (e.g. a future
 * "recently viewed" rail) per SKILL.md's component reusability convention.
 * The "From ₹X/mo" figure is derived from the product's own price via the
 * EMI engine, never a hardcoded formula in the card.
 */
export function ProductCard({ product }: ProductCardProps) {
  const fromMonthly = cheapestMonthly(product.basePriceInr);

  return (
    <Link
      to={`/shop/marketplace/${product.id}`}
      className="block rounded-card bg-white shadow-card overflow-hidden active:scale-[0.98] transition-transform duration-100"
    >
      <div className="h-36 w-full bg-gray-50 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
          {product.brand}
        </p>
        <h3 className="text-[14px] font-semibold text-gray-900 leading-snug mt-0.5 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-[13px] text-primary font-semibold mt-1.5">
          From ₹{fromMonthly.toLocaleString('en-IN')}/mo
        </p>
      </div>
    </Link>
  );
}
