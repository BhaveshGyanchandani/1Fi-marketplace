export interface ProductVariant {
  id: string;
  label: string;
  priceInr: number;
  inStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  images: string[];
  basePriceInr: number;
  variants: ProductVariant[];
  description: string;
  rating?: number;
}

export interface EMIPlan {
  id: string;
  tenureMonths: number;
  monthlyAmountInr: number;
  interestRatePercent: number;
  totalPayableInr: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  tagline: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  distanceKm: number;
  image: string;
}

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
