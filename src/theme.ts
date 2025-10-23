import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2962ff',
    },
    secondary: {
      main: '#00c853',
    },
    background: {
      default: '#f5f7ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1f36',
      secondary: '#5a627d',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Roboto, sans-serif',
    h4: {
      fontWeight: 700,
      background: 'linear-gradient(90deg, #2962ff 0%, #00c853 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },
    subtitle1: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 6px 24px rgba(41, 98, 255, 0.12)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 8px 32px rgba(41, 98, 255, 0.18)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#2962ff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#2962ff',
              borderWidth: '2px',
            },
          },
        },
      },
    },
  },
});