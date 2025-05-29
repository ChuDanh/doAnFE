import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Iconify from '../../../shared/components/iconify';
import { FieldTitle } from '../../../shared/components/field-title/field-title.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useLoginValidation } from './validation.ts';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { WhoAmI } from '../../../core/who-am-i/who-am-i.ts';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSwitchToRegister: VoidFunction;
};

type LoginProps = {
  username: string;
  password: string;
};

export const LoginDialog = ({ open, onClose, onSwitchToRegister }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = WhoAmI();
  const defaultValues = useMemo(
    () => ({
      username: '',
      password: '',
    }),
    []
  );

  const { schema } = useLoginValidation();

  const methods = useForm<LoginProps>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const logApi = await axios.post(`http://localhost:3001/v1/auth/login`, data);
      localStorage.setItem('accessToken', logApi.data.accessToken);
      // onLoggedIn(logApi.data.accessToken);
      enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
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
        <Typography fontWeight={600} fontSize={20}>
          Đăng nhập
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: 2, mb: 3, mx: 3 }}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Grid container>
              <Grid size={12}>
                <FieldTitle title="Tên đăng nhập" required />
                <TextField
                  variant="outlined"
                  {...register('username', { required: true })}
                  fullWidth
                  sx={{ mb: 2 }}
                  size="small"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                />
              </Grid>
              <Grid size={12}>
                <FieldTitle title="Mật khẩu" required />
                <TextField
                  type="password"
                  variant="outlined"
                  {...register('password')}
                  fullWidth
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
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
                Chưa có tài khoản?
              </Typography>
              <Link color="warning" sx={{ cursor: 'pointer' }} onClick={() => onSwitchToRegister()}>
                Đăng ký
              </Link>
            </Stack>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Button variant="contained" color="warning" type="submit">
                Đăng nhập
              </Button>
            </Box>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
