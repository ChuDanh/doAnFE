// MyCourses.tsx
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Link,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Course = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  progress: number;
};

const courses: Course[] = [
  {
    id: 1,
    title: 'Xây Dựng Website với ReactJS',
    subtitle: 'Học cách đây 2 ngày trước',
    image: '/it-beginner.png',
    progress: 10,
  },
  {
    id: 2,
    title: 'Node & ExpressJS',
    subtitle: 'Học cách đây 1 ngày trước',
    image: '/it-beginner.png',
    progress: 0,
  },
  {
    id: 3,
    title: 'Kiến Thức Nhập Môn IT',
    subtitle: 'Học cách đây 2 ngày trước',
    image: '/it-beginner.png',
    progress: 0,
  },
  {
    id: 4,
    title: 'Xây Dựng Website với ReactJS',
    subtitle: 'Học cách đây 1 năm trước',
    image: '/it-beginner.png',
    progress: 100,
  },
];

export const MyCourses = () => {
  const router = useNavigate();

  const completedCourses = courses.filter((course) => course.progress === 100);
  const inProgressCourses = courses.filter((course) => course.progress !== 100);

  const renderCourseGrid = (items: Course[]) => (
    <Grid container spacing={3} mb={4}>
      {items.map((course) => (
        <Grid size={3} key={course.id}>
          <Card
            sx={{
              borderRadius: 3,
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            <Link
              onClick={() => router(`/course/${course.id}`)}
              underline="none"
              sx={{ cursor: 'pointer' }}
            >
              <CardMedia component="img" height="140" image={course.image} alt={course.title} />
            </Link>
            <CardContent>
              <Link
                onClick={() => router(`/course/${course.id}`)}
                underline="hover"
                sx={{ cursor: 'pointer' }}
                color="textPrimary"
              >
                <Typography variant="subtitle1" fontWeight={600}>
                  {course.title}
                </Typography>
              </Link>

              <Typography variant="body2" color="text.secondary" mb={1}>
                {course.subtitle}
              </Typography>
              {course.progress !== undefined && (
                <LinearProgress
                  variant="determinate"
                  value={course.progress}
                  sx={{ height: 6, borderRadius: 5 }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Khóa học của tôi
      </Typography>
      {courses.length === 0 ? (
        <Typography color="text.secondary">Chưa có khóa học.</Typography>
      ) : null}
      {completedCourses.length > 0 && (
        <>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Đã hoàn thành
          </Typography>
          {renderCourseGrid(completedCourses)}
        </>
      )}

      {inProgressCourses.length === 0 ? (
        <Typography color="text.secondary">Bạn chưa hoàn thành khóa học nào.</Typography>
      ) : (
        <>
          <Typography variant="h6" fontWeight={600} mb={2}>
            Chưa hoàn thành
          </Typography>
          {renderCourseGrid(inProgressCourses)}
        </>
      )}
    </Box>
  );
};
