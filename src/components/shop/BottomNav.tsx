import type { ReactNode } from 'react';

interface NavItem {
  label: string;
  icon: ReactNode;
  active?: boolean;
}

// Simple inline icons keep this component dependency-free (per SKILL.md's
// "presentational, no new dependency" convention for shared shells).
const icons = {
  home: (
    <path d="M4 11.5 12 5l8 6.5V19a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1v-7.5Z" />
  ),
  shop: (
    <path d="M4 8h16l-1 11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 8Zm4 0a4 4 0 1 1 8 0" fill="none" strokeWidth="1.8" />
  ),
  dues: (
    <path
      d="M7 3h10a1 1 0 0 1 1 1v16l-3-2-2 2-2-2-2 2-3-2V4a1 1 0 0 1 1-1Zm2 5h6M9 11h6"
      fill="none"
      strokeWidth="1.6"
    />
  ),
  limit: (
    <path d="M4 19V9l5 4 4-7 4 3 3-4v14H4Z" fill="none" strokeWidth="1.6" />
  ),
  profile: (
    <>
      <circle cx="12" cy="8" r="3.2" fill="none" strokeWidth="1.6" />
      <path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" fill="none" strokeWidth="1.6" />
    </>
  ),
};

function NavIcon({ name, active }: { name: keyof typeof icons; active?: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      stroke={active ? '#712CDC' : '#9CA3AF'}
      fill={active ? '#712CDC' : 'none'}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
}

/**
 * Home / Shop / EMI Dues / Limit / Profile — confirmed order from the real
 * app (docs/SKILL.md). Fixed to the viewport bottom so it's always visible
 * and clickable regardless of scroll position — this sits OUTSIDE
 * ShopShell's 500x1544.39 content wrapper for that reason (a fixed-position
 * element ignores an ancestor's height/overflow anyway, so nesting it there
 * bought nothing and cost the always-visible behavior).
 */
export function BottomNav({ active = 'Shop' }: { active?: NavItem['label'] }) {
  const items: NavItem[] = [
    { label: 'Home', icon: <NavIcon name="home" active={active === 'Home'} /> },
    { label: 'Shop', icon: <NavIcon name="shop" active={active === 'Shop'} /> },
    { label: 'EMI Dues', icon: <NavIcon name="dues" active={active === 'EMI Dues'} /> },
    { label: 'Limit', icon: <NavIcon name="limit" active={active === 'Limit'} /> },
    { label: 'Profile', icon: <NavIcon name="profile" active={active === 'Profile'} /> },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[500px] px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-stretch rounded-[28px] bg-white border border-white/40 px-1.5 py-1.5 shadow-[0_8px_32px_rgba(20,14,50,0.12),0_0_0_1px_rgba(255,255,255,0.18)_inset]">
        {items.map((item) => (
          <div
            key={item.label}
            className={`flex-1 flex flex-col items-center gap-1 py-1 text-[11px] font-medium cursor-pointer ${
              item.label === active ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
    </nav>
  );
}
