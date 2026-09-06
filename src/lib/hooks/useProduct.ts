import { useEffect, useState, useCallback } from 'react';
import type { Product } from '../types';
import { isApiError } from '../types';
import { fetchProductById } from '../mock-server/marketplaceApi';

interface UseProductResult {
  data: Product | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProduct(productId: string | undefined): UseProductResult {
  const [data, setData] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => setAttempt((a) => a + 1), []);

  useEffect(() => {
    if (!productId) {
      setIsLoading(false);
      setError('No product specified.');
      return;
    }

    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);
      const result = await fetchProductById(productId!);
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
  }, [productId, attempt]);

  return { data, isLoading, error, refetch };
}
