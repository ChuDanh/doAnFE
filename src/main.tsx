import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import { Header } from './components/header/header.tsx';
import { Navbar } from './components/navbar/navbar.tsx';
import { Grid } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
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
  </StrictMode>
);
