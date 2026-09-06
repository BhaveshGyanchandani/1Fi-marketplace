import { ShopShell } from '../../components/shop/ShopShell';
import { SearchBar } from '../../components/shop/SearchBar';
import { EmptyState } from '../../components/ui/EmptyState';

/**
 * Per the assignment brief: "No implementation is required. The page can
 * remain blank." This stub exists only so the tab bar has a complete
 * destination — it is intentionally not built out. The search bar is shown
 * for shell/visual consistency with the reference screenshots, but is
 * non-functional here.
 */
export function TopBrandsPage() {
  return (
    <ShopShell searchSlot={<SearchBar placeholder="Search online stores..." />}>
      <div className="pt-6">
        <EmptyState title="Top Brands" subtitle="Coming soon." icon="🏬" />
      </div>
    </ShopShell>
  );
}
