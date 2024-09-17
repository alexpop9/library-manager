import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6A5ACD',
    },
    secondary: {
      main: '#F28D9E',
    },
    background: {
      default: '#F5F5F5',
    },
    info: {
      main: '#e0e0e0',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: 'Roboto, Merriweather, serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.75rem',
      color: '#333333',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2.25rem',
      color: '#333333',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#333333',
    },
    body1: {
      fontSize: '1rem',
      color: '#4D4D4D',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#666666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
        },
      },
    },
  },
});

export default theme;
