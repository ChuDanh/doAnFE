import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { BackButton } from '../../../../shared/components/back-button/back-button.tsx';

export const FrontendLearningPath = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton href={'/learning-path'} />

      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
        Lộ trình học Front-end
      </Typography>

      <Box sx={{ my: 2, pl: 2, borderLeft: '4px solid red' }}>
        <Typography variant="body2" fontStyle="italic">
          Các khóa học có thể chưa đầy đủ, chúng tôi vẫn đang nỗ lực hoàn thiện trong thời gian sớm
          nhất.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          1. Tìm hiểu về ngành IT
        </Typography>
        <Typography paragraph color="textSecondary">
          Để theo ngành IT – Phần mềm cần rèn luyện những kỹ năng nào? Bạn đã có sẵn tố chất phù hợp
          với ngành chưa? Cùng tìm hiểu ngành này nhé các bạn.
        </Typography>

        <Card variant="outlined" sx={{ mb: 2, borderRadius: 5 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={3.5}>
                <CardMedia
                  component="img"
                  image="/it-beginner.png"
                  alt="Kiến thức nền tảng"
                  sx={{ borderRadius: 5 }}
                />
              </Grid>

              <Grid size={8.5}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight="bold">Kiến Thức Nhập Môn IT</Typography>
                  <Chip label="Miễn phí" color="error" size="small" sx={{ mt: 1, mb: 2 }} />
                  <Typography variant="body2" gutterBottom>
                    Để có cái nhìn tổng quan về ngành IT – Lập trình web các bạn nên xem các videos
                    tại khóa này trước nhé.
                  </Typography>
                  <Button variant="contained" color="primary" size="small">
                    Tiếp tục học
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>

      <Box mt={4}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          2. HTML và CSS
        </Typography>
        <Typography paragraph color="textSecondary">
          Để học web Front-end chúng ta luôn bắt đầu với ngôn ngữ HTML và CSS, đây là 2 ngôn ngữ cốt
          lõi trong mọi website trên Internet.
        </Typography>

        <Card variant="outlined" sx={{ borderRadius: 5 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid size={3.5}>
                <CardMedia
                  component="img"
                  image="/html-css-pro.png"
                  alt="HTML CSS Pro"
                  sx={{ borderRadius: 5 }}
                />
              </Grid>

              <Grid size={8.5}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography fontWeight="bold">HTML CSS Pro</Typography>
                  <Typography sx={{ textDecoration: 'line-through', fontSize: 14 }}>
                    2.500.000đ
                  </Typography>
                  <Typography color="error" fontWeight="bold">
                    1.299.000đ
                  </Typography>

                  <Typography variant="body2" sx={{ my: 1 }}>
                    Khóa học phù hợp cho cả người mới bắt đầu, học thiết kế giao diện Figma, 300+
                    bài tập, flashcards, mini games,...
                  </Typography>
                  <Button variant="contained" color="primary" size="small">
                    Xem khóa học
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};
