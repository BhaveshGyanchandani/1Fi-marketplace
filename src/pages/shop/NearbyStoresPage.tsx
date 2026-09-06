import { ShopShell } from '../../components/shop/ShopShell';
import { SearchBar } from '../../components/shop/SearchBar';
import { StoreList } from '../../components/shop/StoreListItem';
import type { Store } from '../../lib/types';
import storesJson from '../../lib/data/stores.json';

const stores = storesJson as Store[];

export function NearbyStoresPage() {
  return (
    <ShopShell searchSlot={<SearchBar placeholder="Search stores..." />}>
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[16px] font-bold text-gray-900">Nearby Stores</h2>
          <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-primary bg-primary-50 rounded-pill px-3 py-1.5">
            Ajmer
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <StoreList stores={stores} />
      </div>
    </ShopShell>
  );
}
