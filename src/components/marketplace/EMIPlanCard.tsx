import type { EMIPlan } from '../../lib/types';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
}

/**
 * Pure/presentational, reusable per SKILL.md. Foregrounds tenure and monthly
 * amount — not interest rate — since 1Fi's real EMI plans are 0% interest and
 * there's no credit-score framing in this product.
 */
export function EMIPlanCard({ plan, isSelected, onSelect }: EMIPlanCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan.id)}
      className={`w-full flex items-center justify-between rounded-card border p-4 text-left transition-colors duration-150 ${
        isSelected ? 'border-primary bg-primary-50' : 'border-gray-100 bg-white hover:border-primary-200'
      }`}
    >
      <div>
        <p className="text-[15px] font-semibold text-gray-900">{plan.tenureMonths} months</p>
        <p className="text-[12px] text-gray-400 mt-0.5">
          {plan.interestRatePercent === 0 ? 'No-cost EMI' : `${plan.interestRatePercent}% interest`} · Total ₹
          {plan.totalPayableInr.toLocaleString('en-IN')}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-[16px] font-bold text-primary">
          ₹{plan.monthlyAmountInr.toLocaleString('en-IN')}
          <span className="text-[12px] font-medium text-gray-400">/mo</span>
        </p>
        <span
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            isSelected ? 'border-primary bg-primary' : 'border-gray-300'
          }`}
        >
          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
        </span>
      </div>
    </button>
  );
}
