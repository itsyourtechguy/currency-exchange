import {
  Paper,
  Box,
  Alert,
  TextField,
  Chip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { Autocomplete } from '@mui/material';
import { today, minDate } from '../../utils/dateUtils';

interface ControlsPanelProps {
  baseCurrency: string;
  onBaseCurrencyChange: (currency: string) => void;
  targetCurrencies: string[];
  onTargetCurrenciesChange: (currencies: string[]) => void;
  selectedDate: Dayjs | null;
  onDateChange: (date: Dayjs | null) => void;
  allCurrencies: string[];
  currenciesLoading: boolean;
}

export function ControlsPanel({
  baseCurrency,
  onBaseCurrencyChange,
  targetCurrencies,
  onTargetCurrenciesChange,
  selectedDate,
  onDateChange,
  allCurrencies,
  currenciesLoading,
}: ControlsPanelProps) {
  const targetOptions = allCurrencies.filter((code) => code !== baseCurrency);
  const isTargetCountValid = targetCurrencies.length >= 3 && targetCurrencies.length <= 7;

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 2 }}>
        <DatePicker
          label="End date"
          value={selectedDate}
          onChange={onDateChange}
          minDate={minDate}
          maxDate={today}
          sx={{ flex: 1 }}
        />

        <Autocomplete
          disablePortal
          options={allCurrencies}
          value={baseCurrency}
          onChange={(_, newValue) => {
            if (newValue) {
              onBaseCurrencyChange(newValue);
              // Auto-remove base from targets if present
              if (targetCurrencies.includes(newValue)) {
                onTargetCurrenciesChange(targetCurrencies.filter((c) => c !== newValue));
              }
            }
          }}
          renderInput={(params) => <TextField {...params} label="Base Currency" />}
          sx={{ flex: 1 }}
          loading={currenciesLoading}
          isOptionEqualToValue={(option, value) => option === value}
        />
      </Box>

      <Autocomplete
        multiple
        options={targetOptions}
        value={targetCurrencies}
        onChange={(_, newValue) => {
          if (newValue.length <= 7) {
            onTargetCurrenciesChange(newValue);
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
  );
}