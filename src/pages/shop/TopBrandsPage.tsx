import { ShopShell } from '../../components/shop/ShopShell';
import { SearchBar } from '../../components/shop/SearchBar';
import { BrandGrid } from '../../components/shop/BrandCard';
import type { Brand } from '../../lib/types';
import brandsJson from '../../lib/data/brands.json';

const brands = brandsJson as Brand[];

export function TopBrandsPage() {
  return (
    <ShopShell searchSlot={<SearchBar placeholder="Search online stores..." />}>
      <div className="pt-2 pb-2">
        <h2 className="text-[17px] font-bold text-gray-900">Top Brands</h2>
        <p className="text-[13px] text-gray-400 mt-0.5">Shop directly from your favourite brands.</p>
      </div>

      <div className="pt-3">
        <BrandGrid brands={brands} />
      </div>
    </ShopShell>
  );
}
