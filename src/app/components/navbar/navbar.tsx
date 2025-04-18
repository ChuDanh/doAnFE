import { Box, Grid, Typography } from '@mui/material';
import Iconify from '../../../shared/components/iconify';
import { Link, useLocation } from 'react-router-dom';

export const Navbar = () => {
  return (
    <Grid container alignItems="center" justifyContent="center">
      <Grid size={12}>
        <NavbarItem icon="ic:round-home" title="Trang chủ" to="/" />
      </Grid>

      <Grid size={12}>
        <NavbarItem icon="ix:road-filled" title="Lộ trình" to="/dashboard" />
      </Grid>

      <Grid size={12}>
        <NavbarItem
          icon="f7:book-fill"
          title="Khóa học của tôi"
          to="/my-courses"
          hasBorder={false}
        />
      </Grid>
    </Grid>
  );
};

type navBarItemProps = {
  icon: string;
  title: string;
  to: string;
  hasBorder?: boolean;
};
const NavbarItem = ({ icon, title, to, hasBorder = true }: navBarItemProps) => {
  const location = useLocation();

  return (
    <Box
      sx={{
        m: 1,
        ...(hasBorder && {
          borderBottom: '1px dashed #e8ebed',
        }),
        pb: 2,
      }}
    >
      <Link to={to} style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            textAlign: 'center',
            borderRadius: 3,
            p: 1,
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
            backgroundColor: location.pathname === `${to}` ? '#e8ebed' : 'transparent',
          }}
        >
          <Iconify icon={icon} color={'black'} width={25} />
          <Typography fontSize={14} align="center" fontWeight="bold" color="textPrimary">
            {title}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};
