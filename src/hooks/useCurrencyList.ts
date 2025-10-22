import { useState, useEffect } from 'react';
import { fetchCurrencyList } from '../api/currencyApi';

export function useCurrencyList() {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrencies = async () => {
      try {
        const list = await fetchCurrencyList();
        setCurrencies(list);
        setError(null);
      } catch (err) {
        setError('Failed to load currency list');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCurrencies();
  }, []);

  return { currencies, loading, error };
}