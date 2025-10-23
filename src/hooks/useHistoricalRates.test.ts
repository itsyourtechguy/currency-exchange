import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';
import { useHistoricalRates } from './useHistoricalRates';

const mockFetchRates = vi.fn();
vi.mock('../api/rateApi', () => ({
  fetchRatesForDate: (date: dayjs.Dayjs, base: string) =>
    mockFetchRates(date, base),
}));

describe('useHistoricalRates', () => {
  const baseCurrency = 'gbp';
  const targetCurrencies = ['usd', 'eur'];
  const endDate = dayjs('2025-10-07');

  beforeEach(() => {
    mockFetchRates.mockReset();
  });

  it('fetches 7 days of rates and returns in chronological order', async () => {
    mockFetchRates.mockResolvedValue({ usd: 1.27, eur: 1.17 });

    const { result } = renderHook(() =>
      useHistoricalRates(baseCurrency, targetCurrencies, endDate)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.rateHistory).toHaveLength(7);
    expect(result.current.rateHistory[0].date.format('YYYY-MM-DD')).toBe(
      '2025-10-01'
    );
    expect(result.current.rateHistory[6].date.format('YYYY-MM-DD')).toBe(
      '2025-10-07'
    );

    result.current.rateHistory.forEach((entry) => {
      expect(entry.rates).toEqual({ usd: 1.27, eur: 1.17 });
    });
  });

  it('handles partial missing data gracefully', async () => {
    mockFetchRates
      .mockResolvedValueOnce({ usd: 1.27, eur: 1.17 }) // Oct 7
      .mockRejectedValueOnce(new Error('No data')) // Oct 6 → null
      .mockResolvedValue({ usd: 1.28, eur: 1.18 }); // Oct 5 → Oct 1

    const { result } = renderHook(() =>
      useHistoricalRates(baseCurrency, targetCurrencies, endDate)
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.rateHistory).toHaveLength(7);
    // Chronological: [Oct 1, Oct 2, ..., Oct 7]
    const oct6Entry = result.current.rateHistory.find(
      (entry) => entry.date.format('YYYY-MM-DD') === '2025-10-06'
    );
    expect(oct6Entry?.rates).toEqual({ usd: null, eur: null });
  });

  it('returns empty array when no endDate or targets', () => {
    const { result } = renderHook(() =>
      useHistoricalRates(baseCurrency, [], endDate)
    );
    expect(result.current.rateHistory).toEqual([]);

    const { result: result2 } = renderHook(() =>
      useHistoricalRates(baseCurrency, targetCurrencies, null)
    );
    expect(result2.current.rateHistory).toEqual([]);
  });
});
