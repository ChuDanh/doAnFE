import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <Stack spacing={2} sx={{ p: 2 }}>
      <Button
        component={Link}
        to="/"
        variant="contained"
        fullWidth
      >
        Home
      </Button>
      <Button
        component={Link}
        to="/dashboard"
        variant="contained"
        fullWidth
      >
        Dashboard
      </Button>
    </Stack>
  );
};
