import type { EMIPlan } from '../types';

// EMI plans are computed from priceInr ÷ tenureMonths for 0%-interest tenures.
// This is a simplified mock — not real underwriting/eligibility logic — but it
// demonstrates deriving EMI data instead of hand-authoring a static lookup table.

const ALL_TENURES = [3, 6, 9, 12, 18, 24] as const;

/**
 * Returns the tenures that make sense for a given price point.
 * Mirrors real EMI products: you don't offer a 24-month plan on a ₹15,000 item —
 * the monthly amount would be trivial and the tenure pointless.
 */
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
      // 0% interest: total payable equals the principal, modulo rounding
      // from the per-month rounding above.
      totalPayableInr: monthlyAmountInr * tenureMonths,
    };
  });
}

/** Cheapest realistic monthly figure for a price — used for "From ₹X/mo" on listing cards. */
export function cheapestMonthly(priceInr: number): number {
  const plans = computeEmiPlans(priceInr);
  // Longest tenure = lowest monthly amount.
  return plans[plans.length - 1].monthlyAmountInr;
}
