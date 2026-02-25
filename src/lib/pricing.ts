export function calculatePackagePricing(basePrice: number, feePercent = 10) {
  const websiteFeeAmount = Number(((basePrice * feePercent) / 100).toFixed(2));
  const totalPrice = Number((basePrice + websiteFeeAmount).toFixed(2));

  return {
    websiteFeePercent: feePercent,
    websiteFeeAmount,
    totalPrice,
  };
}

export function toMinorUnits(amount: number) {
  return Math.round(amount * 100);
}
