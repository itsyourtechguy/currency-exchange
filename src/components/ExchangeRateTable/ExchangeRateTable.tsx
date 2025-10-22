import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Box,
  Typography,
} from '@mui/material';
import type { RateData } from '../../types/rates';

interface ExchangeRateTableProps {
  rateHistory: RateData[];
  targetCurrencies: string[];
  loading: boolean;
  error: string | null;
}

export function ExchangeRateTable({
  rateHistory,
  targetCurrencies,
  loading,
  error,
}: ExchangeRateTableProps) {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error" sx={{ my: 2 }}>{error}</Alert>;
  }

  if (rateHistory.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
        Select a date and currencies to view exchange rates
      </Typography>
    );
  }

  return (
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
  );
}