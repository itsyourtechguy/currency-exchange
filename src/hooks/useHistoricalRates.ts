import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import dayjs from 'dayjs';
import { fetchRatesForDate } from '../api/rateApi';
import type { RateData } from '../types/rates';

export function useHistoricalRates(
  baseCurrency: string,
  targetCurrencies: string[],
  endDate: dayjs.Dayjs | null
) {
  const [rateHistory, setRateHistory] = useState<RateData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useDeepCompareEffect(() => {
    if (!endDate || targetCurrencies.length === 0) {
      setRateHistory([]);
      return;
    }

    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      const history: RateData[] = [];
      
      // Get rates for the past 7 days
      for (let i = 0; i < 7; i++) {
        const date = endDate.subtract(i, 'day').startOf('day');
        try {
          const rates = await fetchRatesForDate(date, baseCurrency);
          const filteredRates: Record<string, number | null> = {};
          targetCurrencies.forEach((code) => {
            filteredRates[code] = rates[code] ?? null;
          });
          history.push({ date, rates: filteredRates });
        } catch (err) {
          // If one day fails, mark all targets as null for that day
          const nullRates = Object.fromEntries(
            targetCurrencies.map((code) => [code, null])
          );
          history.push({ date, rates: nullRates });
          console.warn(`Failed to load rates for ${date.format('YYYY-MM-DD')}:`, err);
        }
      }

      setRateHistory(history.reverse());
      setLoading(false);
    };

    fetchAll();
  }, [baseCurrency, targetCurrencies, endDate]);

  return { rateHistory, loading, error };
}