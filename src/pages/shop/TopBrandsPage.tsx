import { useState } from 'react';
import { ShopShell } from '../../components/shop/ShopShell';
import { SearchBar } from '../../components/shop/SearchBar';
import { BrandGrid } from '../../components/shop/BrandCard';
import type { Brand } from '../../lib/types';
import brandsJson from '../../lib/data/brands.json';

const brands = brandsJson as Brand[];

export function TopBrandsPage() {
  const [toast, setToast] = useState<string | null>(null);

  function handleBrandClick(brandId: string) {
    const brand = brands.find((b) => b.id === brandId);
    setToast(`${brand?.name ?? 'This brand'}'s storefront isn't available yet.`);
    setTimeout(() => setToast(null), 2000);
  }

  return (
    <ShopShell searchSlot={<SearchBar placeholder="Search online stores..." />}>
      <div className="pt-2 pb-2">
        <h2 className="text-[17px] font-bold text-gray-900">Top Brands</h2>
        <p className="text-[13px] text-gray-400 mt-0.5">Shop directly from your favourite brands.</p>
      </div>

      <div className="pt-3">
        <BrandGrid brands={brands} onBrandClick={handleBrandClick} />
      </div>

      {toast && (
        <div className="fixed bottom-[96px] inset-x-0 flex justify-center z-20 px-4">
          <div className="bg-gray-900 text-white text-[13px] font-medium px-4 py-2.5 rounded-full shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </ShopShell>
  );
}
