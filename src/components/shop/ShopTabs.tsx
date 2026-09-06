import { NavLink } from 'react-router-dom';

const TABS = [
  { label: 'Top Brands', path: '/shop/top-brands' },
  { label: 'Nearby Stores', path: '/shop/nearby-stores' },
  { label: '1Fi Marketplace', path: '/shop/marketplace' },
] as const;

/**
 * Matches the real 1Fi Shop page's pill-style tab switcher (verified against
 * the reference screenshots and the real app's exact classes): a
 * bordered, tinted-lavender track with its own subtle shadow, a white pill
 * behind the active tab (own two-layer shadow), and a short purple
 * underline bar centered beneath the active tab's label. Fixed 468x56
 * track — positioning/overlap with the hero banner is handled by the
 * wrapper in ShopShell.tsx.
 */
export function ShopTabs() {
  return (
    <div className="flex gap-2 rounded-full border border-[#ece5ff] bg-[#f5f0ff] p-1.5 shadow-[0_1px_3px_rgba(113,44,220,0.06)] w-[468px] h-[56px]">
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            isActive
              ? "relative flex-1 rounded-full py-[11px] text-center text-sm font-semibold tracking-[-0.005em] transition-all bg-white text-[#712CDC] shadow-[0_1px_3px_rgba(20,14,50,0.10),0_0_0_1px_rgba(113,44,220,0.08)]"
              : "relative flex-1 rounded-full py-[11px] text-center text-sm font-semibold tracking-[-0.005em] transition-all text-gray-500"
          }
        >
          {({ isActive }) => (
            <>
              {tab.label}
              {isActive && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] w-8 rounded-full bg-[#712CDC]" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
