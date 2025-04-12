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
import Iconify from '../../shared/components/iconify';
import { FieldTitle } from '../../shared/components/field-title/field-title.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect, useMemo } from 'react';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSwitchToRegister: VoidFunction;
  onLoggedIn: (token: string) => void;
};

type LoginProps = {
  username: string;
  password: string;
};

export const LoginDialog = ({ open, onClose, onSwitchToRegister, onLoggedIn }: Props) => {
  const defaultValues = useMemo(
    () => ({
      username: '',
      password: '',
    }),
    []
  );

  const methods = useForm<LoginProps>({
    defaultValues,
  });

  const { register, handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      const logApi = await axios.post(`http://localhost:3001/v1/auth/login`, data);
      localStorage.setItem('accessToken', logApi.data.accessToken);
      onLoggedIn(logApi.data.accessToken);
      onClose();
    } catch (error) {
      console.log(error);
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
        <img src="./logo.png" height={60} style={{ borderRadius: 10 }} />
        <Typography fontWeight={600} fontSize={20}>
          Login
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: 2, mb: 3, mx: 3 }}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Grid container>
              <Grid size={12}>
                <FieldTitle title="User Name" required />
                <TextField
                  variant="outlined"
                  {...register('username', { required: true, onChange: (e) => console.log(e) })}
                  fullWidth
                  sx={{ mb: 2 }}
                  size="small"
                />
              </Grid>
              <Grid size={12}>
                <FieldTitle title="Password" required />
                <TextField
                  type="password"
                  variant="outlined"
                  {...register('password')}
                  fullWidth
                  size="small"
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
                Don't have account?
              </Typography>
              <Link color="warning" sx={{ cursor: 'pointer' }} onClick={() => onSwitchToRegister()}>
                Sign up
              </Link>
            </Stack>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Button variant="contained" color="warning" type="submit">
                Login
              </Button>
            </Box>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
