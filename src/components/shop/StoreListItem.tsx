import type { Store } from '../../lib/types';

interface StoreListItemProps {
  store: Store;
}

export function StoreListItem({ store }: StoreListItemProps) {
  return (
    <div className="flex w-full items-center gap-3 rounded-[18px] border border-zinc-200 bg-white p-3.5 shadow-[0_2px_6px_rgba(20,14,50,0.04)]">
      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200">
        <img src={store.image} alt={store.name} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-gray-900">{store.name}</p>
        <p className="truncate text-[13px] text-gray-500">{store.address}</p>
        <p className="text-[12px] font-semibold text-primary mt-0.5">{store.distanceKm} km away</p>
      </div>
    </div>
  );
}

interface StoreListProps {
  stores: Store[];
}

export function StoreList({ stores }: StoreListProps) {
  return (
    <div className="flex flex-col gap-3">
      {stores.map((store) => (
        <StoreListItem key={store.id} store={store} />
      ))}
    </div>
  );
}
