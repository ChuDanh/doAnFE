import { Box, Button, Card, CardContent, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGetListLearningPath } from '../../../../core/learning-path/use-get-list-learning-path.ts';

export const LearningPath = () => {
  const router = useNavigate();

  const { data } = useGetListLearningPath();

  return (
    <Box px={{ xs: 2, md: 4 }} py={6}>
      <Typography variant="h3" fontWeight="bold" gutterBottom align="center">
        Lộ trình học
      </Typography>
      <Typography variant="body1" mb={4} color="textSecondary" fontSize={16} align="center">
        Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. <br /> Ví dụ: Để đi
        làm với vị trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".
      </Typography>

      {data ? (
        <Grid container spacing={3} sx={{ mt: 8 }} justifyContent="center">
          {data.map((path, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <CustomCard title={path.name} onClick={() => router(`/learning-path/${path._id}`)} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Grid container spacing={3} sx={{ mt: 8 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rectangular" height={80} sx={{ width: '100%' }} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rectangular" height={80} sx={{ width: '100%' }} />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Skeleton variant="rectangular" height={80} sx={{ width: '100%' }} />
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

type Props = {
  title: string;
  onClick: () => void;
};
const CustomCard = ({ title, onClick }: Props) => {
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
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Typography fontWeight="bold" gutterBottom fontSize={20}>
            {title}
          </Typography>

          <Box
            sx={{
              mt: 'auto',
            }}
          >
            <Button variant="text" size="small" onClick={onClick}>
              <Typography fontSize={13}>Xem chi tiết</Typography>
            </Button>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
