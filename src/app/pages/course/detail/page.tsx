import { useNavigate, useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import LayersIcon from '@mui/icons-material/Layers';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useGetCourseById } from '../../../../core/courses/use-get-course-by-id.ts';
import { ELevel } from '../../../../core/types.ts';
import { formatDuration } from '../../../../shared/utils.ts';
import { useSnackbar } from 'notistack';
import { useGetLearningCourseById } from '../../../../core/learning-course/use-get-learning-course-by-id.ts';

export const CourseDetail = () => {
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = params;

  const { data } = useGetCourseById({ _id: id || undefined });

  const { data: learningCourseData, mutate } = useGetLearningCourseById(id || '');

  const router = useNavigate();

  const handleGetLearningCourse = async (id: string) => {
    try {
      await fetch('http://localhost:3001/v1/learning_course/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          course: id,
        }),
      });
      await mutate(); // Wait for mutate to complete
      router(`/course/learning/${id}`);
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };
  return (
    <Box p={4}>
      {data ? (
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {data.name}
            </Typography>
            <Typography variant="body1" mb={4}>
              {data.description}
            </Typography>

            <Typography variant="h6" fontWeight={600} mb={2}>
              Bạn sẽ học được gì?
            </Typography>
            <Grid container spacing={1}>
              {data.knowledge.map((item, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Box display="flex" alignItems="center">
                    <CheckCircleOutlineIcon
                      fontSize="small"
                      color="warning"
                      sx={{ my: 1, mr: 1 }}
                    />
                    <Typography variant="body2">{item}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box mt={5}>
              <Typography variant="h6" fontWeight={600} mb={2}>
                Nội dung khóa học
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                <strong>{data.chapters.length} chương</strong> ·
                <strong>
                  {' '}
                  {data.chapters.reduce(
                    (totalLessons, chapter) => totalLessons + chapter.lessons.length,
                    0
                  )}{' '}
                  bài học
                </strong>
              </Typography>

              {data.chapters.map((chapter, index) => (
                <Accordion defaultExpanded sx={{ bgcolor: '#f5f5f5' }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} key={index}>
                    <Typography fontWeight={600}>{`${index + 1}. ${chapter.name}`}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: '#ffffff' }}>
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <List dense disablePadding>
                        <>
                          <ListItem key={lessonIndex}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent={'space-between'}
                              sx={{ width: '100%' }}
                            >
                              <ListItemText
                                primary={` - ${index + 1}.${lessonIndex + 1}. ${lesson.name}`}
                              />
                              <Typography
                                component="span"
                                sx={{ flexShrink: 0 }}
                                color="textSecondary"
                                fontSize={14}
                              >
                                {lesson.duration
                                  ? formatDuration(lesson.duration)
                                  : 'Chưa cập nhật'}
                              </Typography>
                            </Stack>
                          </ListItem>
                          {lessonIndex < chapter.lessons.length - 1 && <Divider />}
                        </>
                      </List>
                    ))}
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ boxShadow: 0 }}>
              <Box
                position="relative"
                height={200}
                bgcolor="transparent"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <img src={data.image_course} height={180} style={{ borderRadius: 10 }} />
              </Box>
              <CardContent>
                <Typography variant="h5" color="error" fontWeight={600} textAlign="center">
                  {data.price === 0
                    ? 'Miễn phí'
                    : `${new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(data.price)}`}{' '}
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon sx={{ justifyContent: 'center' }}>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Trình độ: ${data.level === ELevel.BASIC ? 'Cơ bản' : 'Nâng cao'}`}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon sx={{ justifyContent: 'center' }}>
                      <LayersIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Tổng số: ${data.chapters.reduce(
                        (totalLessons, chapter) => totalLessons + chapter.lessons.length,
                        0
                      )} bài học`}
                    />
                  </ListItem>
                </List>

                {id && learningCourseData && learningCourseData.isLearning ? (
                  <Box display="flex" justifyContent="center" my={2}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => router(`/course/learning/${id}`)}
                      color="warning"
                    >
                      Tiếp tục học
                    </Button>
                  </Box>
                ) : id &&
                  (data.price === 0 || (learningCourseData && learningCourseData.is_paid)) ? (
                  <Box display="flex" justifyContent="center" my={2}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => handleGetLearningCourse(id)}
                      color={'success'}
                    >
                      Bắt đầu học
                    </Button>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="center" my={2}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => router(`/course/learning`)}
                    >
                      Đăng ký học
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Skeleton variant="rectangular" height={400} />
      )}
    </Box>
  );
};
