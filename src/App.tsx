import { CssBaseline, Container, Box, Typography } from '@mui/material';

function App() {
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

        {/* Main content */}
        <Box sx={{ mt: 4, minHeight: 300, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography color="text.secondary">Select a date and currencies to begin</Typography>
        </Box>
      </Container>
    </>
  );
}

export default App;