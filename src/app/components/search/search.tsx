import Iconify from '../../../shared/components/iconify';
import { TextField } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

export const Search = () => {
  const methods = useForm();
  const { register, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
    } catch (err) {
      console.log(err);
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
