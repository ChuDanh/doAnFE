import { Box, Grid, Stack, Typography } from '@mui/material';

export const Footer = () => {
  return (
    <Box sx={{ py: 3, px: 10, borderTop: '1px solid #e8ebed', mt: 10 }}>
      <Grid container spacing={2}>
        <Grid size={4}>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <img src="/logo.png" height={50} style={{ borderRadius: 10 }} />
            <Typography fontWeight={600} fontSize={20}>
              Courses
            </Typography>
          </Stack>

          <Typography fontWeight={400} color={'textSecondary'} fontSize={14}>
            <strong>Lĩnh vực hoạt động</strong>: Giáo dục, công nghệ - lập trình. Chúng tôi tập
            trung xây dựng và phát triển các sản phẩm mang lại giá trị cho lập trình viên Việt Nam.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
