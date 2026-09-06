import type { Store } from '../../lib/types';
import { ImageWithFallback } from '../ui/ImageWithFallback';

interface StoreListItemProps {
  store: Store;
  onClick?: (storeId: string) => void;
}

/**
 * Clickable (was a plain non-interactive <div> before) — Nearby Stores has
 * no real destination page per PROJECT.md's scope (explicitly blank
 * placeholder tab), so this fires an optional onClick rather than a route
 * link. Image uses ImageWithFallback so a dead store.image URL degrades to
 * an initials avatar instead of a broken-image icon.
 */
export function StoreListItem({ store, onClick }: StoreListItemProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(store.id)}
      className="flex w-full items-center gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5 text-left shadow-[0_2px_6px_rgba(20,14,50,0.04)] transition-shadow hover:shadow-[0_6px_16px_rgba(20,14,50,0.06)]"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200">
        <ImageWithFallback
          src={store.image}
          alt={store.name}
          fallbackLabel={store.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-gray-900">{store.name}</p>
        <p className="truncate text-[13px] text-gray-500">{store.address}</p>
        <p className="text-[12px] font-semibold text-primary mt-0.5">{store.distanceKm} km away</p>
      </div>
    </button>
  );
}

interface StoreListProps {
  stores: Store[];
  onStoreClick?: (storeId: string) => void;
}

export function StoreList({ stores, onStoreClick }: StoreListProps) {
  return (
    <div className="flex flex-col gap-3">
      {stores.map((store) => (
        <StoreListItem key={store.id} store={store} onClick={onStoreClick} />
      ))}
    </div>
  );
}
