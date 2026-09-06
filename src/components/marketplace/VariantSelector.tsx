import type { ProductVariant } from '../../lib/types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string | null;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({ variants, selectedVariantId, onSelect }: VariantSelectorProps) {
  return (
    <div>
      <p className="text-[13px] font-semibold text-gray-700 mb-2">Choose a variant</p>
      <div className="flex flex-wrap gap-2">
        {variants.map((variant) => {
          const isSelected = variant.id === selectedVariantId;
          return (
            <button
              key={variant.id}
              type="button"
              disabled={!variant.inStock}
              onClick={() => onSelect(variant.id)}
              className={`px-3.5 py-2 rounded-xl text-[13px] font-medium border transition-colors duration-150 ${
                !variant.inStock
                  ? 'border-gray-100 text-gray-300 cursor-not-allowed bg-gray-50'
                  : isSelected
                    ? 'border-primary bg-primary-50 text-primary'
                    : 'border-gray-200 text-gray-600 hover:border-primary-200'
              }`}
            >
              {variant.label}
              {!variant.inStock && <span className="ml-1 text-[11px]">(Out of stock)</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
