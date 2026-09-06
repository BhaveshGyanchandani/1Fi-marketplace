import { NavLink } from 'react-router-dom';

const TABS = [
  { label: 'Top Brands', path: '/shop/top-brands' },
  { label: 'Nearby Stores', path: '/shop/nearby-stores' },
  { label: '1Fi Marketplace', path: '/shop/marketplace' },
] as const;

/**
 * Matches the real 1Fi Shop page's pill-style tab switcher (verified against
 * the reference screenshots): a solid (no-opacity) lavender track, a white
 * pill behind the active tab, and a short purple underline centered beneath
 * the active tab's label. Fixed 468x56 track — positioning/overlap with the
 * hero banner is handled by the wrapper in ShopShell.tsx.
 */
export function ShopTabs() {
  return (
    <div className="bg-primary-100 rounded-pill p-1 flex gap-1 w-[468px] h-[56px]">
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            `relative flex-1 text-center text-sm font-semibold py-2.5 rounded-pill transition-colors duration-150 ${
              isActive ? 'bg-white text-primary shadow-sm' : 'text-gray-500'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {tab.label}
              {isActive && (
                <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 h-[3px] w-6 rounded-full bg-primary" />
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
