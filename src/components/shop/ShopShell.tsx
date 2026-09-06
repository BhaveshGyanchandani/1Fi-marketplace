import type { ReactNode } from 'react';
import { ShopHero } from './ShopHero';
import { ShopTabs } from './ShopTabs';
import { BottomNav } from './BottomNav';

interface ShopShellProps {
  children: ReactNode;
  showTabs?: boolean;
  searchSlot?: ReactNode;
}

export function ShopShell({ children, showTabs = true, searchSlot }: ShopShellProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24">
      <ShopHero />

      <div className="w-full max-w-[500px] mx-auto">
        {showTabs && (
          <div className="relative z-[2] -mt-7 flex flex-col gap-4 px-1">
            <ShopTabs />
            {searchSlot}
          </div>
        )}

        <div className="px-4 pt-4">{children}</div>
      </div>

      <BottomNav active="Shop" />
    </div>
  );
}
