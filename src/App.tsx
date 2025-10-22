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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { today, minDate } from './utils/dateUtils';
import { useCurrencyList } from './hooks/useCurrencyList';
import { useHistoricalRates } from './hooks/useHistoricalRates';

// Defaults
const DEFAULT_BASE_CURRENCY = 'gbp';
const DEFAULT_TARGET_CURRENCIES = [
  'usd',
  'eur',
  'jpy',
  'chf',
  'cad',
  'aud',
  'zar',
];

function App() {
  const { currencies, loading: currenciesLoading } = useCurrencyList();

  const [baseCurrency, setBaseCurrency] = useState<string>(
    DEFAULT_BASE_CURRENCY
  );
  const [targetCurrencies, setTargetCurrencies] = useState<string[]>(
    DEFAULT_TARGET_CURRENCIES
  );
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(today);

  const {
    rateHistory,
    loading: ratesLoading,
    error: ratesError,
  } = useHistoricalRates(baseCurrency, targetCurrencies, selectedDate);

  // Filter out base currency from target options
  const targetOptions = currencies.filter((code) => code !== baseCurrency);

  // Validate target count
  const isTargetCountValid =
    targetCurrencies.length >= 3 && targetCurrencies.length <= 7;

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
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              mb: 2,
            }}
          >
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
              renderInput={(params) => (
                <TextField {...params} label="Base Currency" />
              )}
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
                    : targetCurrencies.length < 7
                      ? 'Add or remove currencies'
                      : 'Maximum of 7 currencies selected'
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

        {/* Rate Table */}
        {ratesLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : ratesError ? (
          <Alert severity="error" sx={{ my: 2 }}>
            {ratesError}
          </Alert>
        ) : rateHistory.length > 0 ? (
          <TableContainer sx={{ mt: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  {targetCurrencies.map((code) => (
                    <TableCell key={code} align="right">
                      {code.toUpperCase()}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rateHistory.map((row) => (
                  <TableRow key={row.date.format('YYYY-MM-DD')}>
                    <TableCell>{row.date.format('MMM D, YYYY')}</TableCell>
                    {targetCurrencies.map((code) => (
                      <TableCell key={code} align="right">
                        {row.rates[code] !== null
                          ? row.rates[code]?.toFixed(4)
                          : '—'}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            color="text.secondary"
            sx={{ textAlign: 'center', mt: 4 }}
          >
            Select a date and currencies to view exchange rates
          </Typography>
        )}
      </Container>
    </>
  );
}

export default App;
