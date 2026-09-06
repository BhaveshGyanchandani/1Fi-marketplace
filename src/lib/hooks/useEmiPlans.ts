import { useEffect, useState, useCallback } from 'react';
import type { EMIPlan } from '../types';
import { isApiError } from '../types';
import { fetchEmiPlans } from '../mock-server/marketplaceApi';

interface UseEmiPlansResult {
  data: EMIPlan[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useEmiPlans(
  productId: string | undefined,
  variantId: string | undefined
): UseEmiPlansResult {
  const [data, setData] = useState<EMIPlan[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => setAttempt((a) => a + 1), []);

  useEffect(() => {
    if (!productId || !variantId) {
      setData(null);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      const result = await fetchEmiPlans(productId!, variantId!);
      if (cancelled) return;

      if (isApiError(result)) {
        setError(result.error);
        setData(null);
      } else {
        setData(result.data);
      }
      setIsLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [productId, variantId, attempt]);

  return { data, isLoading, error, refetch };
}
