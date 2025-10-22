import { useState } from 'react';
import {
  CssBaseline,
  Container,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { today, minDate } from './utils/dateUtils';

function App() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(today);

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
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
            <DatePicker
              label="Select end date"
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              minDate={minDate}
              maxDate={today}
              sx={{ flex: 1 }}
            />
          </Box>
        </Paper>

        {/* Placeholder for future content */}
        <Box sx={{ minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography color="text.secondary">
            Currency controls and rate table will appear here
          </Typography>
        </Box>
      </Container>
    </>
  );
}

export default App;