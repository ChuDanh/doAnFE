import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import { Header } from './app/components/header/header.tsx';
import { Navbar } from './app/components/navbar/navbar.tsx';
import { Grid } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { Footer } from './app/components/footer/footer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <BrowserRouter>
        <Grid container sx={{ minHeight: '100vh' }}>
          <Grid size={12}>
            <Header />
          </Grid>
          <Grid size={1}>
            <Navbar />
          </Grid>
          <Grid size={11}>
            <App />
          </Grid>

          <Grid size={12}>
            <Footer />
          </Grid>
        </Grid>
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
);
