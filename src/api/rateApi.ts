import dayjs from 'dayjs';

// In-memory cache: key = "YYYY-MM-DD-base"
const rateCache = new Map<string, Record<string, number>>();

function getCacheKey(date: dayjs.Dayjs, baseCurrency: string): string {
  return `${date.format('YYYY-MM-DD')}-${baseCurrency}`;
}

/**
 * Builds the API URL for a given date and base currency
 * Example: https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-02/v1/currencies/gbp.json
 */
export function buildRateUrl(date: dayjs.Dayjs, baseCurrency: string): string {
  const formattedDate = date.format('YYYY-MM-DD');
  return `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${formattedDate}/v1/currencies/${baseCurrency}.json`;
}

/**
 * Fetches exchange rates for a single date and base currency
 * Returns: { [currencyCode: string]: number } (e.g., { usd: 1.27, eur: 1.17, ... })
 */
export async function fetchRatesForDate(date: dayjs.Dayjs, baseCurrency: string): Promise<Record<string, number>> {
  const cacheKey = getCacheKey(date, baseCurrency);

  // Return from cache if available
  if (rateCache.has(cacheKey)) {
    return rateCache.get(cacheKey)!;
  }

  const url = buildRateUrl(date, baseCurrency);
  const response = await fetch(url);

  if (!response.ok) {
    // The API returns 404 for future dates or very old dates
    throw new Error(`No data available for ${date.format('YYYY-MM-DD')}`);
  }

  const data = await response.json();
  const rates = data[baseCurrency] || {};

  // Cache the result
  rateCache.set(cacheKey, rates);
  // The response is { [base]: { [target]: rate } }
  return rates;
}