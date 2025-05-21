import { Grid } from '@mui/material';
import { NavItem } from './navbar-item.tsx';
import { NAV_ITEMS } from './constants.ts';

export const Navbar = () => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      {NAV_ITEMS.map((item, index) => (
        <Grid size={12} key={item.path}>
          <NavItem item={item} isLast={index === NAV_ITEMS.length - 1} />
        </Grid>
      ))}
    </Grid>
  );
};
