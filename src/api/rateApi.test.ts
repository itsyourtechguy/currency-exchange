import { describe, it, expect } from 'vitest';
import dayjs from 'dayjs';
import { buildRateUrl, fetchRatesForDate } from './rateApi';

describe('rateApi', () => {
  it('builds correct URL', () => {
    const date = dayjs('2025-10-01');
    const url = buildRateUrl(date, 'eur');
    expect(url).toBe(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025-10-01/v1/currencies/eur.json'
    );
  });

  it('fetches and returns rates', async () => {
    const mockData = { gbp: { usd: 1.27, eur: 1.17 } };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });
    vi.stubGlobal('fetch', fetchMock);

    const date = dayjs('2025-10-01');
    const rates = await fetchRatesForDate(date, 'gbp');

    expect(rates).toEqual({ usd: 1.27, eur: 1.17 });
    expect(fetchMock).toHaveBeenCalledWith(
      'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2025-10-01/v1/currencies/gbp.json'
    );
  });

  it('throws on invalid date (e.g., future)', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    }));

    const futureDate = dayjs().add(1, 'day');
    await expect(fetchRatesForDate(futureDate, 'gbp')).rejects.toThrow(
      `No data available for ${futureDate.format('YYYY-MM-DD')}`
    );
  });
});