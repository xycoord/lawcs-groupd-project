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
      light: '#666666',
      main: '#444444',
      dark: '#252525',
      contrastText: '#fff',
    },
  },
});

export default theme;