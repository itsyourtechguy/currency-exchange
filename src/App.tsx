import { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { today } from './utils/dateUtils';
import { useCurrencyList } from './hooks/useCurrencyList';
import { useHistoricalRates } from './hooks/useHistoricalRates';
import { ControlsPanel } from './components/Controls/ControlsPanel';
import { ExchangeRateTable } from './components/ExchangeRateTable/ExchangeRateTable';
import { theme } from './theme';

const DEFAULT_BASE_CURRENCY = 'gbp';
const DEFAULT_TARGET_CURRENCIES = ['usd', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'];

function App() {
  const { currencies, loading: currenciesLoading } = useCurrencyList();

  const [baseCurrency, setBaseCurrency] = useState<string>(DEFAULT_BASE_CURRENCY);
  const [targetCurrencies, setTargetCurrencies] = useState<string[]>(DEFAULT_TARGET_CURRENCIES);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(today);

  const { rateHistory, loading: ratesLoading, error: ratesError } = useHistoricalRates(
    baseCurrency,
    targetCurrencies,
    selectedDate
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Currency Exchange Rate Viewer
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            View 7-day historical rates for your selected currencies
          </Typography>
        </Box>

        <ControlsPanel
          baseCurrency={baseCurrency}
          onBaseCurrencyChange={setBaseCurrency}
          targetCurrencies={targetCurrencies}
          onTargetCurrenciesChange={setTargetCurrencies}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          allCurrencies={currencies}
          currenciesLoading={currenciesLoading}
        />

        <ExchangeRateTable
          rateHistory={rateHistory}
          targetCurrencies={targetCurrencies}
          loading={ratesLoading}
          error={ratesError}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;