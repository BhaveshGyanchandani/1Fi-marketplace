import type { ApiResult, Product } from '../types';
import productsJson from '../data/products.json';
import { computeEmiPlans } from './emiEngine';

const products = productsJson as Product[];

const NETWORK_DELAY_MS = 500;

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), NETWORK_DELAY_MS));
}

export async function fetchProducts(): Promise<ApiResult<Product[]>> {
  try {
    return await delay({ data: products });
  } catch {
    return { error: 'Something went wrong while loading products.' };
  }
}

export async function fetchProductById(id: string): Promise<ApiResult<Product>> {
  try {
    const product = products.find((p) => p.id === id);
    if (!product) {
      return await delay({ error: 'This product could not be found.' });
    }
    return await delay({ data: product });
  } catch {
    return { error: 'Something went wrong while loading this product.' };
  }
}

export async function fetchEmiPlans(
  productId: string,
  variantId: string
): Promise<ApiResult<ReturnType<typeof computeEmiPlans>>> {
  try {
    const product = products.find((p) => p.id === productId);
    const variant = product?.variants.find((v) => v.id === variantId);

    if (!product || !variant) {
      return await delay({ error: 'Could not load EMI plans for this selection.' });
    }

    const plans = computeEmiPlans(variant.priceInr);
    return await delay({ data: plans });
  } catch {
    return { error: 'Something went wrong while loading EMI plans.' };
  }
}
