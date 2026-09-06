import type { Product, ProductVariant, EMIPlan } from '../../lib/types';
import { Button } from '../ui/Button';

interface ConfirmationSummaryProps {
  product: Product;
  variant: ProductVariant;
  plan: EMIPlan;
  onDone: () => void;
}

export function ConfirmationSummary({ product, variant, plan, onDone }: ConfirmationSummaryProps) {
  return (
    <div className="flex flex-col items-center text-center px-4 pt-10 pb-10">
      <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center mb-4">
        <span className="text-2xl" role="img" aria-label="Success">
          ✅
        </span>
      </div>
      <h2 className="text-[18px] font-bold text-gray-900">Plan selected</h2>
      <p className="text-[13px] text-gray-400 mt-1 max-w-xs">
        This is a demo confirmation — no payment has been processed.
      </p>

      <div className="w-full max-w-sm mt-6 rounded-card bg-white shadow-card p-4 text-left space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-14 h-14 rounded-lg object-cover bg-gray-50"
          />
          <div>
            <p className="text-[14px] font-semibold text-gray-900">{product.name}</p>
            <p className="text-[12px] text-gray-400">{variant.label}</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-3 flex justify-between text-[13px]">
          <span className="text-gray-400">Price</span>
          <span className="font-medium text-gray-900">₹{variant.priceInr.toLocaleString('en-IN')}</span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-gray-400">Tenure</span>
          <span className="font-medium text-gray-900">{plan.tenureMonths} months</span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-gray-400">Monthly amount</span>
          <span className="font-semibold text-primary">
            ₹{plan.monthlyAmountInr.toLocaleString('en-IN')}/mo
          </span>
        </div>
      </div>

      <div className="w-full max-w-sm mt-6">
        <Button fullWidth onClick={onDone}>
          Back to Marketplace
        </Button>
      </div>
    </div>
  );
}
