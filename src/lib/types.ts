// Shared data models for the 1Fi Marketplace.
// Imported everywhere — never redefined per component.

export interface ProductVariant {
  id: string;
  label: string; // e.g. "256GB · Titanium Black"
  priceInr: number; // full price for this variant
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string; // e.g. "iPhone 16"
  brand: string; // e.g. "Apple"
  category: string; // e.g. "Smartphones"
  images: string[];
  basePriceInr: number; // lowest variant price, for listing display
  variants: ProductVariant[];
  description: string;
  rating?: number; // out of 5, optional
}

export interface EMIPlan {
  id: string;
  tenureMonths: number; // 3–24 per 1Fi's real model
  monthlyAmountInr: number;
  interestRatePercent: number; // 0 for no-cost EMI plans
  totalPayableInr: number;
}

// Consistent response envelope so the frontend has one shape to branch on,
// mirroring the { data } / { error } contract a real 1Fi backend would use.
export interface ApiSuccess<T> {
  data: T;
}

export interface ApiError {
  error: string;
}

export type ApiResult<T> = ApiSuccess<T> | ApiError;

export function isApiError<T>(result: ApiResult<T>): result is ApiError {
  return (result as ApiError).error !== undefined;
}
