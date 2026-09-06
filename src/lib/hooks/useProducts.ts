import { useEffect, useState, useCallback } from 'react';
import type { Product } from '../types';
import { isApiError } from '../types';
import { fetchProducts } from '../mock-server/marketplaceApi';

interface UseProductsResult {
  data: Product[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProducts(): UseProductsResult {
  const [data, setData] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const refetch = useCallback(() => setAttempt((a) => a + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchProducts();
        if (cancelled) return;

        if (isApiError(result)) {
          setError(result.error);
          setData(null);
        } else {
          setData(result.data);
        }
      } catch {
        if (!cancelled) {
          setError('Something went wrong while loading products.');
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
  }, [attempt]);

  return { data, isLoading, error, refetch };
}
