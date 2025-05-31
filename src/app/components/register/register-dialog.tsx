import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from '../../../shared/components/iconify';
import Box from '@mui/material/Box';
import { FieldTitle } from '../../../shared/components/field-title/field-title.tsx';
import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRegisterValidation } from './validation.ts';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { WhoAmI } from '../../../core/who-am-i/who-am-i.ts';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSwitchToLogin: VoidFunction;
};

type FormData = {
  full_name: string;
  username: string;
  password: string;
  confirm_password: string;
  email: string;
  phone_number: string;
  role: string;
};

export const RegisterDialog = ({ open, onClose, onSwitchToLogin }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useNavigate(); // Add useNavigate hook
  const { mutate } = WhoAmI();

  const defaultValues = useMemo(
    () => ({
      full_name: '',
      username: '',
      password: '',
      confirm_password: '',
      email: '',
      phone_number: '',
      role: '',
    }),
    []
  );

  const { schema } = useRegisterValidation();

  const methods = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      await axios.post('http://localhost:3001/v1/auth/register', data);
      enqueueSnackbar('Tạo tài khoản thành công', { variant: 'success' });

      const loginResponse = await axios.post('http://localhost:3001/v1/auth/login', {
        username: data.username,
        password: data.password,
      });
      localStorage.setItem('accessToken', loginResponse.data.accessToken);
      const userRole = loginResponse.data.role;
      if (userRole === 'user') {
        router('/courses');
      } else if (userRole === 'seller' || userRole === 'admin') {
        router('/manage/courses/list');
      }
      await mutate();
      onClose();
    } catch (error: any) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  });

  useEffect(
    () => {
      if (open) {
        reset(defaultValues);
      }
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    [open]
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <Stack direction="row" justifyContent="end" sx={{ pt: 1, pr: 1 }}>
        <IconButton color="inherit" onClick={onClose}>
          <Iconify icon="material-symbols:close-rounded" />
        </IconButton>
      </Stack>
      <DialogTitle sx={{ pb: 1 }} textAlign="center">
        <img src="/logo.png" height={60} style={{ borderRadius: 10 }} />
        <Typography fontWeight={600} fontSize={30}>
          Đăng ký
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: 2, mb: 3, mx: 3 }}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={1.5} alignItems="center">
              <Grid size={12}>
                <FieldTitle title="Họ và tên" required />
                <TextField
                  variant="outlined"
                  {...register('full_name')}
                  fullWidth
                  size="small"
                  error={!!errors.full_name}
                  helperText={errors.full_name?.message}
                />
              </Grid>

              <Grid size={12}>
                <FieldTitle title="Tên đăng nhập" required />
                <TextField
                  variant="outlined"
                  {...register('username')}
                  fullWidth
                  size="small"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>

              <Grid size={12}>
                <FieldTitle title="Mật khẩu" required />
                <TextField
                  variant="outlined"
                  {...register('password')}
                  fullWidth
                  size="small"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </Grid>

              <Grid size={12}>
                <FieldTitle title="Xác nhận mật khẩu " required />
                <TextField
                  variant="outlined"
                  {...register('confirm_password')}
                  fullWidth
                  size="small"
                  type="password"
                  error={!!errors.confirm_password}
                  helperText={errors.confirm_password?.message}
                />
              </Grid>

              <Grid size={12}>
                <FieldTitle title="Email" required />
                <TextField
                  variant="outlined"
                  {...register('email')}
                  fullWidth
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>

              <Grid size={12}>
                <FieldTitle title="Số điện thoại" required />
                <TextField
                  variant="outlined"
                  {...register('phone_number')}
                  fullWidth
                  size="small"
                  error={!!errors.phone_number}
                  helperText={errors.phone_number?.message}
                />
              </Grid>

              <Grid size={12}>
                <FieldTitle title="Mục tiêu cá nhân" required />
                <Select {...register('role')} fullWidth size="small" defaultValue="">
                  <MenuItem value="" disabled>
                    Chọn mục tiêu
                  </MenuItem>
                  <MenuItem value="user">Phục vụ học hành...</MenuItem>
                  <MenuItem value="seller">Phục vụ nhu cầu kinh doanh...</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ my: 2 }}
            >
              <Typography component="span" fontSize={12}>
                Đã có tài khoản?
              </Typography>
              <Link color="warning" sx={{ cursor: 'pointer' }} onClick={() => onSwitchToLogin()}>
                Đăng nhập
              </Link>
            </Stack>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Button type="submit" variant="contained" color="warning">
                Tạo tài khoản
              </Button>
            </Box>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
