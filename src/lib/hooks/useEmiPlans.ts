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
      setError(null);
      return;
    }

    const pid = productId;
    const vid = variantId;
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchEmiPlans(pid, vid);
        if (cancelled) return;

        if (isApiError(result)) {
          setError(result.error);
          setData(null);
        } else {
          setData(result.data);
        }
      } catch {
        if (!cancelled) {
          setError('Something went wrong while loading EMI plans.');
          setData(null);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [productId, variantId, attempt]);

  return { data, isLoading, error, refetch };
}
