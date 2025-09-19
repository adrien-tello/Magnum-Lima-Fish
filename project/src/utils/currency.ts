const RATE = Number(import.meta.env.VITE_USD_TO_XAF ?? 600);

export function usdToXaf(amountUsd: number): number {
  return amountUsd * RATE;
}

export function formatXAF(amountXaf: number): string {
  return new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency: 'XAF',
    maximumFractionDigits: 0,
  }).format(amountXaf);
}

export function formatUSDToXAF(amountUsd: number): string {
  return formatXAF(usdToXaf(amountUsd));
}
