import { Button, CardMedia, Link, Stack, Typography } from '@mui/material';
import { LoginDialog } from '../login/login-dialog.tsx';
import { RegisterDialog } from '../register/register-dialog.tsx';
import { useState } from 'react';
import axios from 'axios';

export const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const openLogin = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const openRegister = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await axios.get('http://localhost:3001/v1/users/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return localStorage.setItem('data', JSON.stringify(response.data)); // Thông tin user
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  };

  const handleLoggedIn = async (accessToken: string) => {
    try {
      await fetchUserInfo(accessToken);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 3, pb: 2, pt: 1, borderBottom: '1px solid #e8ebed' }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <CardMedia component="img" image="./logo.png" height={50} sx={{ borderRadius: 2 }} />
          <Typography fontWeight={600} fontSize={20}>
            Courses
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={2}>
          <Link
            color="textPrimary"
            onClick={openRegister}
            underline="hover"
            fontWeight={500}
            sx={{ cursor: 'pointer' }}
          >
            Sign up
          </Link>
          <Button variant="contained" color="warning" onClick={openLogin}>
            Sign in
          </Button>
        </Stack>
      </Stack>
      <LoginDialog
        open={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onSwitchToRegister={openRegister}
        onLoggedIn={handleLoggedIn}
      />
      <RegisterDialog
        open={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={openLogin}
      />
    </>
  );
};
