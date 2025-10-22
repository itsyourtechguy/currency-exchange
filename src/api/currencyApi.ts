const CURRENCY_LIST_URL =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';

/**
 * Fetches the full list of supported currency codes.
 * Returns an array of currency codes (e.g., ['usd', 'eur', 'gbp', ...])
 */
export async function fetchCurrencyList(): Promise<string[]> {
  const response = await fetch(CURRENCY_LIST_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch currency list: ${response.statusText}`);
  }
  const data: Record<string, string> = await response.json();
  // Return sorted list of currency codes
  return Object.keys(data).sort();
}