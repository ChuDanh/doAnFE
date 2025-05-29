import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import { FieldTitle } from '../../../../../shared/components/field-title/field-title.tsx';
import { useState } from 'react';
import { ExitDialog } from '../../../../../shared/components/dialog/exit/exit-dialog.tsx';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';

type TFormData = {
  name: string;
  image: {
    name: string;
    url: string;
  };
};
export const AddLearningPathPage = () => {
  const router = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm<TFormData>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<any>(null);
  const [exitCourse, setExitCourse] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'image_upload');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dczxvkvei/image/upload', {
        method: 'POST',
        body: formData,
      });

      const resultData = await response.json();
      const nameImage = resultData.original_filename;
      const urlImage = resultData.url;

      const learningPathData = {
        ...data,
        image: {
          name: nameImage,
          url: urlImage,
        },
      };

      await axios.post('http://localhost:3001/v1/learning_path/add', learningPathData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      enqueueSnackbar('Thêm lộ trình học tập thành công', { variant: 'success' });
    } catch (err: any) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  });

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImageFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const previewUrl = event.target?.result as string;
        setPreviewImage(previewUrl); // Update state with the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExit = () => {
    if (isDirty) {
      setExitCourse(true);
    } else {
      router(`/manage/learning-path/list`);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Box p={4}>
            <Typography variant="h4" fontWeight="600" mb={5} align="center">
              Thêm lộ trình học tập
            </Typography>

            <Grid container spacing={2} sx={{ mx: 20 }}>
              <Grid size={12} sx={{ mb: 2 }}>
                <FieldTitle title="Tên lộ trình" required fontSize={18} />
                <TextField
                  {...register('name', { required: true })}
                  fullWidth
                  size="small"
                  placeholder="Nhập tên lộ trình"
                />
              </Grid>
              <Grid size={12}>
                <FieldTitle title="Hình ảnh" required fontSize={18} />
                <Box mt={2}>
                  {!previewImage ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageSelect}
                        style={{ display: 'none' }}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button variant="outlined" color="info" component="span">
                          Upload Image
                        </Button>
                      </label>
                    </>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setPreviewImage(null)} // Clear the preview image
                      sx={{ mt: 1 }}
                    >
                      Delete Image
                    </Button>
                  )}
                  {previewImage && (
                    <Box mt={2} display="flex" justifyContent="center">
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{ width: '60%', height: 'auto', borderRadius: '8px' }}
                      />
                    </Box>
                  )}
                </Box>
              </Grid>

              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
                sx={{ width: '100%' }}
              >
                <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                  Lưu
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2 }}
                  onSubmit={handleExit}
                >
                  Hủy
                </Button>
              </Stack>
            </Grid>
          </Box>
        </form>
      </FormProvider>

      {exitCourse && (
        <ExitDialog
          open={exitCourse}
          onClose={() => setExitCourse(false)}
          onExit={() => router(`/manage/learning-path/list`)}
        />
      )}
    </>
  );
};
