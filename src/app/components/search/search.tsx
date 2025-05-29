import Iconify from '../../../shared/components/iconify';
import { TextField } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

export const Search = () => {
  const router = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm();
  const { register, handleSubmit, setValue } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      router(`/course/search?keyword=${encodeURIComponent(data.keyword)}`);
      setValue('keyword', '');
    } catch (err: any) {
      enqueueSnackbar(err.response.data.message, { variant: 'error' });
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} style={{ width: '30%' }}>
        <TextField
          slotProps={{
            input: {
              startAdornment: <Iconify icon="mdi:search" color="text.secondary" width={30} />,
            },
          }}
          placeholder="Tìm kiếm khóa học"
          variant="standard"
          autoComplete="off"
          sx={{ width: '100%' }}
          {...register('keyword')}
        />
      </form>
    </FormProvider>
  );
};
