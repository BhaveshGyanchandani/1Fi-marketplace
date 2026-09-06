import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BottomNav } from '../../../components/shop/BottomNav';
import { VariantSelector } from '../../../components/marketplace/VariantSelector';
import { EMIPlanSelector } from '../../../components/marketplace/EMIPlanSelector';
import { ProceedCTA } from '../../../components/marketplace/ProceedCTA';
import { ConfirmationSummary } from '../../../components/marketplace/ConfirmationSummary';
import { ProductDetailSkeleton } from '../../../components/ui/Skeleton';
import { ErrorState } from '../../../components/ui/ErrorState';
import { useProduct } from '../../../lib/hooks/useProduct';
import { useEmiPlans } from '../../../lib/hooks/useEmiPlans';

/**
 * State flow follows ARCHITECTURE.md section 5 exactly:
 * product loads -> selectedVariant defaults to first in-stock variant
 *               -> EMI plans re-fetch whenever selectedVariant changes
 *               -> selectedEmiPlan resets to null on variant change
 *               -> ProceedCTA disabled until both are selected
 *               -> CTA click -> confirmation state (no real checkout backend)
 */
export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading, error, refetch } = useProduct(productId);

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  // Default to the first in-stock variant once the product loads.
  useEffect(() => {
    if (product && !selectedVariantId) {
      const firstInStock = product.variants.find((v) => v.inStock);
      setSelectedVariantId(firstInStock?.id ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // Reset the selected plan whenever the variant changes.
  useEffect(() => {
    setSelectedPlanId(null);
  }, [selectedVariantId]);

  const {
    data: emiPlans,
    isLoading: emiLoading,
    error: emiError,
    refetch: refetchEmi,
  } = useEmiPlans(productId, selectedVariantId ?? undefined);

  const selectedVariant = useMemo(
    () => product?.variants.find((v) => v.id === selectedVariantId) ?? null,
    [product, selectedVariantId]
  );

  const selectedPlan = useMemo(
    () => emiPlans?.find((p) => p.id === selectedPlanId) ?? null,
    [emiPlans, selectedPlanId]
  );

  const canProceed = Boolean(selectedVariant && selectedPlan);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] pb-24">
        <Header onBack={() => navigate('/shop/marketplace')} title="" />
        <div className="max-w-md mx-auto px-4 pt-4">
          <ProductDetailSkeleton />
        </div>
        <BottomNav active="Shop" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] pb-24">
        <Header onBack={() => navigate('/shop/marketplace')} title="" />
        <ErrorState message={error ?? "Couldn't load this product."} onRetry={refetch} />
        <BottomNav active="Shop" />
      </div>
    );
  }

  if (confirmed && selectedVariant && selectedPlan) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] pb-24">
        <Header onBack={() => navigate('/shop/marketplace')} title={product.name} />
        <ConfirmationSummary
          product={product}
          variant={selectedVariant}
          plan={selectedPlan}
          onDone={() => navigate('/shop/marketplace')}
        />
        <BottomNav active="Shop" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] pb-40">
      <Header onBack={() => navigate('/shop/marketplace')} title={product.name} />

      <div className="max-w-md mx-auto px-4 pt-4 space-y-5">
        <div className="rounded-card overflow-hidden bg-gray-50 h-64">
          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
            {product.brand}
          </p>
          <h1 className="text-[19px] font-bold text-gray-900 mt-0.5">{product.name}</h1>
          {product.rating != null && (
            <p className="text-[12px] text-gray-400 mt-1">★ {product.rating.toFixed(1)} rating</p>
          )}
          <p className="text-[14px] text-gray-500 mt-2 leading-relaxed">{product.description}</p>
        </div>

        {selectedVariant && (
          <p className="text-[20px] font-bold text-gray-900">
            ₹{selectedVariant.priceInr.toLocaleString('en-IN')}
          </p>
        )}

        <VariantSelector
          variants={product.variants}
          selectedVariantId={selectedVariantId}
          onSelect={setSelectedVariantId}
        />

        <EMIPlanSelector
          plans={emiPlans}
          isLoading={emiLoading}
          error={emiError}
          selectedPlanId={selectedPlanId}
          onSelect={setSelectedPlanId}
          onRetry={refetchEmi}
        />
      </div>

      <ProceedCTA
        disabled={!canProceed}
        monthlyAmountInr={selectedPlan?.monthlyAmountInr}
        onProceed={() => setConfirmed(true)}
      />
      <BottomNav active="Shop" />
    </div>
  );
}

// Plain back-arrow + bold title, matching the "Pay using 1Fi" header pattern
// in the reference screenshot (Image 3) — no circular background chip.
function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="sticky top-0 z-10 bg-[#F5F5F7]/95 backdrop-blur-sm px-4 pt-4 pb-3">
      <div className="max-w-md mx-auto flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Go back"
          className="flex items-center justify-center flex-shrink-0 text-gray-900"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-[17px] font-bold text-gray-900 truncate">{title}</h1>
      </div>
    </div>
  );
}
