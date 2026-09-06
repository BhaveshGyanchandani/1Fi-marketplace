import type { ReactNode } from 'react';
import { ShopHero } from './ShopHero';
import { ShopTabs } from './ShopTabs';
import { BottomNav } from './BottomNav';

interface ShopShellProps {
  children: ReactNode;
  /** Set false on screens (like product detail) that render their own header instead. */
  showTabs?: boolean;
  /** Rendered directly below the tab bar — pass a <SearchBar /> here per tab. */
  searchSlot?: ReactNode;
}

/**
 * Wraps every /shop/* screen with the banner, tab switcher, an optional
 * search bar, and the listing content inside a 500px-wide content wrapper.
 * The outer container has no padding of its own — ShopHero (532x354,
 * centered via its own mx-auto) sits flush against this container's
 * top/sides; the inner wrapper below it still handles its own spacing
 * independently via px-1/px-4.
 *
 * The inner wrapper's height is intentionally NOT hardcoded (it was
 * originally pinned to 1544.39px to match one specific design frame, but
 * that only matches a page holding exactly that many products — with fewer
 * products it left a large dead gap of blank space between the list and
 * BottomNav, and with more it would have silently overflowed). Letting it
 * size to its actual content means the nav sits right after the real list
 * end, however many products are showing.
 *
 * BottomNav renders as a sibling AFTER that wrapper, not inside it: it's
 * `fixed` to the viewport so it stays visible and clickable regardless of
 * scroll position, and a fixed element ignores an ancestor's box entirely —
 * nesting it inside the wrapper wouldn't move it there, it would just make
 * the JSX misleading. The outer container's `pb-24` reserves space at the
 * bottom of the scrollable page so real content never ends up hidden
 * underneath the fixed nav.
 */
export function ShopShell({ children, showTabs = true, searchSlot }: ShopShellProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-24">
      <ShopHero />

      <div className="w-[500px] mx-auto">
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