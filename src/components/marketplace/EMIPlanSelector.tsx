import type { EMIPlan } from '../../lib/types';
import { EMIPlanCard } from './EMIPlanCard';
import { EmiPlanRowsSkeleton } from '../ui/Skeleton';
import { ErrorState } from '../ui/ErrorState';
import { EmptyState } from '../ui/EmptyState';

interface EMIPlanSelectorProps {
  plans: EMIPlan[] | null;
  isLoading: boolean;
  error: string | null;
  selectedPlanId: string | null;
  onSelect: (planId: string) => void;
  onRetry: () => void;
}

export function EMIPlanSelector({
  plans,
  isLoading,
  error,
  selectedPlanId,
  onSelect,
  onRetry,
}: EMIPlanSelectorProps) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-gray-700 mb-2">Choose an EMI plan</p>

      {isLoading && <EmiPlanRowsSkeleton />}

      {!isLoading && error && <ErrorState message="Couldn't load EMI plans." onRetry={onRetry} />}

      {!isLoading && !error && plans && plans.length === 0 && (
        <EmptyState title="No EMI plans available" subtitle="Try a different variant." icon="📄" />
      )}

      {!isLoading && !error && plans && plans.length > 0 && (
        <div className="space-y-2">
          {plans.map((plan) => (
            <EMIPlanCard
              key={plan.id}
              plan={plan}
              isSelected={plan.id === selectedPlanId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
