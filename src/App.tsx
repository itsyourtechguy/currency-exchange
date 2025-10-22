import { useState } from 'react';
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Paper,
  Autocomplete,
  TextField,
  Chip,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { today, minDate } from './utils/dateUtils';
import { useCurrencyList } from './hooks/useCurrencyList';

// Defaults
const DEFAULT_BASE_CURRENCY = 'gbp';
const DEFAULT_TARGET_CURRENCIES = ['usd', 'eur', 'jpy', 'chf', 'cad', 'aud', 'zar'];

function App() {
  const { currencies, loading: currenciesLoading } = useCurrencyList();

  const [baseCurrency, setBaseCurrency] = useState<string>(DEFAULT_BASE_CURRENCY);
  const [targetCurrencies, setTargetCurrencies] = useState<string[]>(DEFAULT_TARGET_CURRENCIES);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(today);

  // Filter out base currency from target options
  const targetOptions = currencies.filter((code) => code !== baseCurrency);

  // Validate target count
  const isTargetCountValid = targetCurrencies.length >= 3 && targetCurrencies.length <= 7;

  return (
    <>
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

        {/* Control Panel */}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 2 }}>
            <DatePicker
              label="End date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={minDate}
              maxDate={today}
              sx={{ flex: 1 }}
            />

            <Autocomplete
              disablePortal
              options={currencies}
              value={baseCurrency}
              onChange={(_, newValue) => {
                if (newValue) {
                  setBaseCurrency(newValue);
                  // reset targets if base was in targets
                  if (targetCurrencies.includes(newValue)) {
                    setTargetCurrencies((prev) =>
                      prev.filter((c) => c !== newValue)
                    );
                  }
                }
              }}
              renderInput={(params) => <TextField {...params} label="Base Currency" />}
              sx={{ flex: 1 }}
              loading={currenciesLoading}
              isOptionEqualToValue={(option, value) => option === value}
            />
          </Box>

          {/* Target Currencies */}
          <Autocomplete
            multiple
            options={targetOptions}
            value={targetCurrencies}
            onChange={(_, newValue) => {
              if (newValue.length <= 7) {
                setTargetCurrencies(newValue);
              }
            }}
            renderTags={(value: string[], getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option.toUpperCase()}
                  {...getTagProps({ index })}
                  key={option}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label={`Target Currencies (${targetCurrencies.length}/7)`}
                helperText={
                  !isTargetCountValid
                    ? 'Select between 3 and 7 currencies'
                    : 'Add or remove currencies'
                }
                error={!isTargetCountValid}
              />
            )}
            sx={{ mt: 2 }}
            disabled={currenciesLoading}
            isOptionEqualToValue={(option, value) => option === value}
          />

          {!isTargetCountValid && (
            <Alert severity="warning" sx={{ mt: 2 }}>
              Please select between 3 and 7 target currencies.
            </Alert>
          )}
        </Paper>

        {/* Placeholder for rate table */}
        <Box sx={{ minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography color="text.secondary">
            Exchange rate table will appear here
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default App;