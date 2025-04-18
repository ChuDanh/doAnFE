import {
  Avatar,
  Box,
  Button,
  CardMedia,
  IconButton,
  Link,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { LoginDialog } from '../login/login-dialog.tsx';
import { RegisterDialog } from '../register/register-dialog.tsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Iconify from '../../../shared/components/iconify';
import { Search } from '../search/search.tsx';
import { useSnackbar } from 'notistack';
import { userData } from '../../../shared/ultils/user.ts';

type UserProps = {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
  total_courses: string;
  total_prices: string;
};

export const Header = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const [formattedData, setFormattedData] = useState<UserProps>();

  const fetchUserInfo = async (accessToken: string) => {
    try {
      const response = await axios.get('http://localhost:3001/v1/users/profile', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return localStorage.setItem('data', JSON.stringify(response.data)); // Thông tin user
    } catch (error: any) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
      throw error;
    }
  };

  const updateFormattedData = () => {
    if (userData) {
      setFormattedData(JSON.parse(userData));
    }
  };

  const handleLoggedIn = async (accessToken: string) => {
    try {
      await fetchUserInfo(accessToken);
      updateFormattedData();
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleClickPopover = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openLogin = () => {
    setLoginOpen(true);
    setRegisterOpen(false);
  };

  const openRegister = () => {
    setRegisterOpen(true);
    setLoginOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('data');
    window.location.reload();
  };

  useEffect(
    () => {
      if (userData) {
        updateFormattedData();
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [userData]
  );

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ px: 3, pb: 3, pt: 1, borderBottom: '1px solid #e8ebed' }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <CardMedia component="img" image="/logo.png" height={50} sx={{ borderRadius: 2 }} />
          <Typography fontWeight={600} fontSize={20}>
            Courses
          </Typography>
        </Stack>

        <Search />

        {formattedData ? (
          <Stack direction="row" spacing={3} alignItems="center">
            <Link href="/public" underline="none">
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography color="textPrimary" fontWeight={400}>
                  Giỏ hàng
                </Typography>

                <Iconify icon="icon-park-outline:shopping" color="black" width={25} />
              </Stack>
            </Link>

            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton onClick={handleClickPopover}>
                <Avatar src="" color="" />
              </IconButton>
              <Typography fontSize={16} fontWeight={500}>
                {formattedData.full_name}
              </Typography>
            </Stack>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box sx={{ mx: 2, my: 1 }}>
                <Box>
                  <Stack
                    direction="row"
                    alignItems="center"
                    spacing={3}
                    sx={{ p: 2, borderBottom: '1px solid #e8ebed' }}
                  >
                    <Avatar src="" sx={{ width: 50, height: 50 }} />
                    <Box>
                      <Typography fontWeight={600} fontSize={16}>
                        {formattedData.full_name}
                      </Typography>
                      <Typography fontWeight={500} fontSize={12} color="textSecondary">
                        @{formattedData.role}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ p: 2, borderBottom: '1px solid #e8ebed' }}>
                  <Link href="/public" underline="none">
                    <Typography
                      color="textSecondary"
                      fontSize={14}
                      sx={{
                        '&:hover': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      Thông tin cá nhân
                    </Typography>
                  </Link>
                </Box>

                <Box sx={{ p: 2, borderBottom: '1px solid #e8ebed' }}>
                  <Link href="/public" underline="none">
                    <Typography
                      color="textSecondary"
                      fontSize={14}
                      sx={{
                        '&:hover': {
                          color: 'text.primary',
                        },
                      }}
                    >
                      Khóa học của tôi
                    </Typography>
                  </Link>
                </Box>

                <Box sx={{ p: 2 }}>
                  <Link underline="none">
                    <Typography
                      color="textSecondary"
                      fontSize={14}
                      sx={{
                        '&:hover': {
                          color: 'text.primary',
                        },
                        cursor: 'pointer',
                      }}
                      onClick={handleLogout}
                    >
                      Đăng xuất
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Popover>
          </Stack>
        ) : (
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
        )}
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
