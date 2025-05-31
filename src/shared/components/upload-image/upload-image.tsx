import { Box, Button, Typography } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import Iconify from '../iconify';

type Props = {
  setValue: (name: 'image_course', value: string) => void;
  getValues: (name: 'image_course') => string;
  imageUrl?: string;
  state: 'edit' | 'detail' | 'add';
};

export const ImageUploader = ({ setValue, imageUrl, state }: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        setValue('image_course', reader.result as string); // nếu chỉ cần base64
        // Nếu cần upload lên Cloudinary ở đây thì xử lý thêm
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (!file && imageUrl) {
      setPreviewUrl(imageUrl);
    }
  }, [file, imageUrl]);

  const handleRemoveImage = () => {
    setFile(null);
    setPreviewUrl('');
    setValue('image_course', '');
  };

  return (
    <Box>
      <Typography fontWeight="600" mb={1}>
        Hình ảnh khóa học
      </Typography>

      {previewUrl ? (
        <Box>
          <Box>
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                maxWidth: '100%',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            />
          </Box>
          {(state === 'edit' || state === 'add') && (
            <Button
              onClick={handleRemoveImage}
              variant="outlined"
              color="error"
              startIcon={<Iconify icon={'mdi:trash-can-outline'} width={20} height={20} />}
            >
              Xóa
            </Button>
          )}
        </Box>
      ) : (
        <>
          {state !== 'detail' && (
            <Button variant="outlined" component="label">
              Tải ảnh lên
              <input type="file" accept="image/*" hidden onChange={handleFileChange} />
            </Button>
          )}
        </>
      )}
    </Box>
  );
};
