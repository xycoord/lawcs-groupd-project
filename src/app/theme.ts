// src/theme.ts
'use client';
// import { Roboto } from 'next/font/google';
import "typeface-raleway"
import "@fontsource/cormorant-garamond"
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Raleway',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
    },
    secondary: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa',
      contrastText: '#fff',
    },
  },
});

export default theme;