import { useMemo, useState } from 'react';
import { ShopShell } from '../../../components/shop/ShopShell';
import { SearchBar } from '../../../components/shop/SearchBar';
import { MarketplaceList } from '../../../components/marketplace/MarketplaceListItem';
import { MarketplaceListSkeleton } from '../../../components/ui/Skeleton';
import { ErrorState } from '../../../components/ui/ErrorState';
import { EmptyState } from '../../../components/ui/EmptyState';
import { useProducts } from '../../../lib/hooks/useProducts';

export function MarketplaceListPage() {
  const { data: products, isLoading, error, refetch } = useProducts();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!products) return products;
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [products, query]);

  return (
    <ShopShell searchSlot={<SearchBar placeholder="Search products..." value={query} onChange={setQuery} />}>
      <div className="pt-2 pb-2">
        <h2 className="text-[17px] font-bold text-gray-900">1Fi Marketplace</h2>
        <p className="text-[13px] text-gray-400 mt-0.5">
          Shop top smartphones. Pay later on no-cost EMI, backed by your mutual funds.
        </p>
      </div>

      <div className="pt-3">
        {isLoading && <MarketplaceListSkeleton />}

        {!isLoading && error && (
          <ErrorState message="Couldn't load products." onRetry={refetch} />
        )}

        {!isLoading && !error && products && products.length === 0 && (
          <EmptyState
            title="No products available right now"
            subtitle="Check back again soon."
          />
        )}

        {!isLoading && !error && filteredProducts && filteredProducts.length === 0 && products && products.length > 0 && (
          <EmptyState title="No matches found" subtitle="Try a different search term." icon="🔍" />
        )}

        {!isLoading && !error && filteredProducts && filteredProducts.length > 0 && (
          <MarketplaceList products={filteredProducts} />
        )}
      </div>
    </ShopShell>
  );
}
