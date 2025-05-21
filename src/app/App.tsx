import { Grid } from '@mui/material';
import { Header } from './components/header/header.tsx';
import { Navbar } from './components/navbar/navbar.tsx';
import { Footer } from './components/footer/footer.tsx';
import Paths from '../routes/path.tsx';
import { useLocation } from 'react-router-dom';
import { WhoAmI } from '../shared/hooks/who-am-i.ts';
import { DataContext } from '../context/DataContext.tsx';

export default function App() {
  const location = useLocation();
  const showFooter = !location.pathname.includes('/course/learning');
  const { data, mutate } = WhoAmI();

  return (
    <DataContext.Provider value={{ data, mutate }}>
      <Grid container sx={{ minHeight: '100vh' }}>
        <Grid size={12}>
          <Header />
        </Grid>

        <Grid size={1} sx={{ borderRight: '1px solid #e8ebed' }}>
          <Navbar />
        </Grid>

        <Grid size={11}>
          <Paths />
        </Grid>

        {showFooter && (
          <Grid size={12}>
            <Footer />
          </Grid>
        )}
      </Grid>
    </DataContext.Provider>
  );
}
