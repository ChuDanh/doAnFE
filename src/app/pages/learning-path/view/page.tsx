import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const learningPaths = [
  {
    id: 1,
    title: 'Lộ trình học Front-end',
    description:
      'Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.',
    url_img: '/AI_development-roadmap.jpg',
  },
  {
    id: 2,
    title: 'Lộ trình học Back-end',
    description:
      'Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.',
    url_img: '/AI_development-roadmap.jpg',
  },
];

export const LearningPath = () => {
  const router = useNavigate();

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
            <CustomCard
              title={path.title}
              description={path.description}
              onClick={() => router(`/learning-path/${path.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

type Props = {
  title: string;
  description: string;
  onClick: () => void;
};
const CustomCard = ({ title, description, onClick }: Props) => {
  return (
    <Card
      elevation={4}
      sx={{
        position: 'relative',
        borderRadius: 2,
      }}
    >
      <CardContent
        sx={{
          minHeight: '100%',
          display: 'flex',
          flexDirection: 'column',
          p: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box', // tạo 1 container flexbox, cần thiết cho WebkitLineClamp
            overflow: 'hidden',
            textOverflow: 'ellipsis', // hiển thị ...
            WebkitBoxOrient: 'vertical', // định hướng theo chiều dọc
            WebkitLineClamp: 2, // giới hạn số dòng hiển thị
          }}
        >
          {description}
        </Typography>

        <Box
          sx={{
            mt: 'auto',
            pt: 2,
          }}
        >
          <Button variant="contained" size="medium" onClick={onClick}>
            Xem chi tiết
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
