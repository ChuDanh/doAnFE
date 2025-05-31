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
import { useState } from 'react';
import Iconify from '../../../shared/components/iconify';
import { Search } from '../search/search.tsx';
import { useSnackbar } from 'notistack';
import { useData } from '../../../context/DataContext.tsx';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const router = useNavigate();
  const { data, mutate } = useData();
  const { enqueueSnackbar } = useSnackbar();

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

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

  const handleLogout = async () => {
    try {
      localStorage.removeItem('accessToken');
      await mutate();
      router('/courses');
    } catch (error: any) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

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

        {data ? (
          <Stack direction="row" spacing={3} alignItems="center">
            <Link href="/cart" underline="none">
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
                {data.full_name}
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
                        {data.full_name}
                      </Typography>
                      <Typography fontWeight={500} fontSize={12} color="textSecondary">
                        @{data.role}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box sx={{ p: 2, borderBottom: '1px solid #e8ebed' }}>
                  <Link
                    underline="none"
                    onClick={() => router('/my-profile')}
                    sx={{ cursor: 'pointer' }}
                  >
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

                {/*<Box sx={{ p: 2, borderBottom: '1px solid #e8ebed' }}>*/}
                {/*  <Link href="/public" underline="none">*/}
                {/*    <Typography*/}
                {/*      color="textSecondary"*/}
                {/*      fontSize={14}*/}
                {/*      sx={{*/}
                {/*        '&:hover': {*/}
                {/*          color: 'text.primary',*/}
                {/*        },*/}
                {/*      }}*/}
                {/*    >*/}
                {/*      Khóa học của tôi*/}
                {/*    </Typography>*/}
                {/*  </Link>*/}
                {/*</Box>*/}

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
      />
      <RegisterDialog
        open={isRegisterOpen}
        onClose={() => setRegisterOpen(false)}
        onSwitchToLogin={openLogin}
      />
    </>
  );
};
