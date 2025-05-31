import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Stack,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useRef, useState } from 'react';
import { FieldTitle } from '../../../shared/components/field-title/field-title.tsx';
import { FormProvider, useForm } from 'react-hook-form';
import { ExitDialog } from '../../../shared/components/dialog/exit/exit-dialog.tsx';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../shared/components/iconify';
import { WhoAmI } from '../../../core/who-am-i/who-am-i.ts';
import { TUserProfile } from '../../../core/types.ts';
import { formatDate } from 'date-fns';
import axios from 'axios';

export const MyProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [avatarSelected, setAvatarSelected] = useState<any>(null);
  const router = useNavigate();

  const { data, mutate } = WhoAmI();

  const { enqueueSnackbar } = useSnackbar();

  const [exit, setExit] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const methods = useForm<TUserProfile>({
    defaultValues: {
      full_name: data?.full_name || '',
      username: data?.username || '',
      email: data?.email || '',
      dob: data?.dob || '',
      phone_number: data?.phone_number || '',
      address: data?.address || '',
      role: data?.role || '',
      avatar: data?.avatar || '',
    },
  });

  const {
    handleSubmit,
    register,
    formState: { isDirty },
    reset,
    watch,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('file', avatarSelected);
    formData.append('upload_preset', 'image_upload');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dczxvkvei/image/upload', {
        method: 'POST',
        body: formData,
      });

      const resultData = await response.json();
      const urlImage = resultData.url;

      const formattedData = {
        ...data,
        avatar: urlImage,
      };

      await axios.put(' http://localhost:3001/v1/users/update', formattedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
      });
      await mutate();
      enqueueSnackbar('Cập nhật thông tin thành công', { variant: 'success' });
    } catch (err: any) {
      enqueueSnackbar(err.response?.data.message, { variant: 'error' });
    }
  });

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setAvatarSelected(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExit = () => {
    if (isDirty) {
      return setExit(true);
    }
    return router(-1);
  };

  useEffect(
    () => {
      reset({
        full_name: data?.full_name || '',
        username: data?.username || '',
        email: data?.email || '',
        dob: data?.dob ? formatDate(new Date(data.dob), 'yyyy-MM-dd') : '',
        phone_number: data?.phone_number || '',
        address: data?.address || '',
        role: data?.role || '',
        avatar: data?.avatar || '',
      });
      setAvatarUrl(data?.avatar || '');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Box sx={{ py: 4, px: 10 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2 }}
            >
              <Typography fontSize={38} fontWeight={600}>
                Thông tin người dùng
              </Typography>

              <Stack direction="row" spacing={1}>
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  startIcon={<Iconify icon="fluent:save-16-filled" width={20} height={20} />}
                >
                  Lưu
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  onClick={handleExit}
                  startIcon={<Iconify icon="material-symbols:cancel" width={20} height={20} />}
                >
                  Hủy
                </Button>
              </Stack>
            </Stack>
            <Grid container spacing={4}>
              <Grid size={4}>
                <Card elevation={3} sx={{ borderRadius: 5 }}>
                  <CardContent sx={{ p: 5 }}>
                    <Grid container spacing={3}>
                      <Grid size={12}>
                        <Box display="flex" justifyContent="center">
                          <AvatarWrapper>
                            <Avatar
                              {...register('avatar')}
                              src={avatarUrl}
                              alt="My Avatar"
                              sx={{ width: 150, height: 150, border: '2px dashed #ccc' }}
                            />
                            <EditIconButton
                              className="edit-icon"
                              size="medium"
                              onClick={handleEditClick}
                            >
                              <EditIcon fontSize="medium" />
                            </EditIconButton>
                            {avatarUrl && avatarUrl !== data?.avatar && (
                              <IconButton
                                className="delete-icon"
                                size="medium"
                                onClick={() => setAvatarUrl(data?.avatar || '')}
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  backgroundColor: 'white',
                                  '&:hover': { backgroundColor: '#d42f2f', color: 'white' },
                                }}
                              >
                                <Iconify icon="mdi:delete" width={20} height={20} />
                              </IconButton>
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              style={{ display: 'none' }}
                            />
                          </AvatarWrapper>
                        </Box>
                      </Grid>

                      <Grid size={12}>
                        <FieldTitle title="Họ và tên" fontSize={18} />
                        <TextField
                          {...register('full_name')}
                          fullWidth
                          size="small"
                          placeholder="Nhập họ và tên"
                        />
                      </Grid>

                      <Grid size={12} sx={{ mb: 2 }}>
                        <FieldTitle title="Vai Trò" fontSize={18} />
                        <TextField
                          value={
                            watch('role') === 'admin'
                              ? 'Quản trị viên'
                              : watch('role') === 'user'
                                ? 'Người dùng'
                                : watch('role') === 'seller'
                                  ? 'Người bán'
                                  : ''
                          }
                          fullWidth
                          size="small"
                          placeholder="Vai trò"
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid size={8}>
                <Card elevation={3} sx={{ borderRadius: 5 }}>
                  <CardContent sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                      <Grid size={12}>
                        <FieldTitle title="Thông tin cá nhân" fontSize={22} />
                      </Grid>
                      <Grid size={6}>
                        <FieldTitle title="Tài khoản người dùng" fontSize={18} />
                        <TextField
                          {...register('username')}
                          fullWidth
                          size="small"
                          placeholder="Tài khoản người dùng"
                          disabled
                        />
                      </Grid>
                      <Grid size={6}>
                        <FieldTitle title="Email" fontSize={18} />
                        <TextField
                          {...register('email')}
                          fullWidth
                          size="small"
                          placeholder="Email"
                        />
                      </Grid>
                      <Grid size={6}>
                        <FieldTitle title="DoB" fontSize={18} />
                        <TextField {...register('dob')} fullWidth size="small" type="date" />
                      </Grid>
                      <Grid size={6}>
                        <FieldTitle title="Sdt" fontSize={18} />
                        <TextField
                          {...register('phone_number')}
                          fullWidth
                          size="small"
                          placeholder="Sdt"
                        />
                      </Grid>
                      <Grid size={12} sx={{ mb: 2 }}>
                        <FieldTitle title="Địa chỉ" fontSize={18} />
                        <TextField
                          {...register('address')}
                          fullWidth
                          size="small"
                          placeholder="Địa chỉ"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </form>
      </FormProvider>

      {exit && <ExitDialog open={exit} onClose={() => setExit(false)} onExit={() => router(-1)} />}
    </>
  );
};

const AvatarWrapper = styled(Box)(() => ({
  position: 'relative',
  display: 'inline-block',
  '&:hover .edit-icon': {
    opacity: 1,
  },
}));

const EditIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  opacity: 0,
  transition: 'opacity 0.3s',
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
  },
}));
