import { Link } from 'react-router-dom';
import type { Product } from '../../lib/types';
import { cheapestMonthly } from '../../lib/mock-server/emiEngine';

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
