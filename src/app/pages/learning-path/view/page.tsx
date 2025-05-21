// pages/LearningPath.tsx
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';

const learningPaths = [
  {
    title: 'Lộ trình học Front-end',
    description:
      'Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.',
    icon: '/front-end-pic.png',
    href: '/learning-path/front-end',
  },
  {
    title: 'Lộ trình học Back-end',
    description:
      'Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.',
    icon: '/back-end-pic.png',
    href: '/learning-path/back-end',
  },
];

export const LearningPath = () => {
  return (
    <Box px={{ xs: 2, md: 4 }} py={6}>
      <Typography variant="h3" fontWeight="bold" gutterBottom align="center">
        Lộ trình học
      </Typography>
      <Typography variant="body1" mb={4} color="textSecondary" fontSize={16} align="center">
        Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. <br /> Ví dụ: Để đi
        làm với vị trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".
      </Typography>

      <Grid container spacing={3} sx={{ mt: 8 }}>
        {learningPaths.map((path, index) => (
          <Grid size={{ xs: 12, md: 6 }} key={index}>
            <Card elevation={4} sx={{ borderRadius: 3, px: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={9}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {path.title}
                    </Typography>
                    <Typography variant="body2" mb={2} color="textSecondary" fontSize={14}>
                      {path.description}
                    </Typography>

                    <Button variant="contained" size="small" href={path.href}>
                      Xem chi tiết
                    </Button>
                  </Grid>

                  <Grid size={3} container justifyContent="center">
                    <Box
                      sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        border: '4px solid orange',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#fff',
                        p: 1,
                      }}
                    >
                      <img
                        src={path.icon}
                        alt={path.title}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
