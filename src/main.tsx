import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import { Header } from './app/components/header/header.tsx';
import { Navbar } from './app/components/navbar/navbar.tsx';
import { Grid } from '@mui/material';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <BrowserRouter>
        <Header />
        <Grid container spacing={2}>
          <Grid size={1}>
            <Navbar />
          </Grid>
          <Grid size={11}>
            <App />
          </Grid>
        </Grid>
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
);
