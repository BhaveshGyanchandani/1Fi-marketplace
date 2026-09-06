import type { EMIPlan } from '../types';

const ALL_TENURES = [3, 6, 9, 12, 18, 24] as const;

function tenuresForPrice(priceInr: number): number[] {
  if (priceInr < 20000) return [3, 6, 9];
  if (priceInr < 40000) return [3, 6, 9, 12];
  if (priceInr < 70000) return [3, 6, 9, 12, 18];
  return [...ALL_TENURES];
}

export function computeEmiPlans(priceInr: number): EMIPlan[] {
  const tenures = tenuresForPrice(priceInr);

  return tenures.map((tenureMonths) => {
    const monthlyAmountInr = Math.round(priceInr / tenureMonths);
    return {
      id: `emi-${tenureMonths}m-${priceInr}`,
      tenureMonths,
      monthlyAmountInr,
      interestRatePercent: 0,
      totalPayableInr: monthlyAmountInr * tenureMonths,
    };
  });
}

export function cheapestMonthly(priceInr: number): number {
  const plans = computeEmiPlans(priceInr);
  return plans[plans.length - 1].monthlyAmountInr;
}
