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
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Iconify from '../../shared/components/iconify';
import Box from '@mui/material/Box';
import { FieldTitle } from '../../shared/components/field-title/field-title.tsx';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import axios from 'axios';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onSwitchToLogin: VoidFunction;
};

type FormData = {
  full_name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  role: string;
};

export const RegisterDialog = ({ open, onClose, onSwitchToLogin }: Props) => {
  const [role, setRole] = useState('user');

  const defaultValues = useMemo(
    () => ({
      full_name: '',
      username: '',
      password: '',
      email: '',
      phone_number: '',
      role: 'user',
    }),
    []
  );

  const methods = useForm<FormData>({
    defaultValues,
  });

  const { register, handleSubmit, reset } = methods;

  const handleChangeRole = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };

  const onSubmit = handleSubmit(async (data: FormData) => {
    try {
      await axios.post('http://localhost:3001/v1/auth/register', data);
      onSwitchToLogin();
    } catch (error) {
      console.error(error);
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
          Register
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ mt: 2, mb: 3, mx: 3 }}>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid size={12}>
                <FieldTitle title="Full Name" required />
                <TextField
                  variant="outlined"
                  {...register('full_name')}
                  fullWidth
                  size="small"
                  required
                />
              </Grid>

              <Grid size={12}>
                <FieldTitle title="User Name" required />
                <TextField
                  variant="outlined"
                  {...register('username')}
                  fullWidth
                  size="small"
                  required
                />
              </Grid>

              <Grid size={12}>
                <FieldTitle title="Password" required />
                <TextField
                  variant="outlined"
                  {...register('password')}
                  fullWidth
                  size="small"
                  required
                  type="password"
                />
              </Grid>

              <Grid size={12}>
                <FieldTitle title="Email" required />
                <TextField
                  variant="outlined"
                  {...register('email')}
                  fullWidth
                  size="small"
                  required
                />
              </Grid>

              <Grid size={6}>
                <FieldTitle title="Phone" required />
                <TextField
                  variant="outlined"
                  {...register('phone_number')}
                  fullWidth
                  size="small"
                  required
                />
              </Grid>

              <Grid size={6}>
                <FieldTitle title="Role" />
                <Select
                  {...register('role')}
                  fullWidth
                  size="small"
                  value={role}
                  onChange={handleChangeRole}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="seller">Seller</MenuItem>
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
                Already have account?
              </Typography>
              <Link color="warning" sx={{ cursor: 'pointer' }} onClick={() => onSwitchToLogin()}>
                Sign in
              </Link>
            </Stack>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Button type="submit" variant="contained" color="warning">
                Create Account
              </Button>
            </Box>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};
