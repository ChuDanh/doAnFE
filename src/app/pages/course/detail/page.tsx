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
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import LayersIcon from '@mui/icons-material/Layers';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const features = [
  'Example 1',
  'Example 1',
  'Example 1',
  'Example 1',
  'Example 1',
  'Example 1',
  'Example 1',
  'Example 1',
  'Example 1',
  'Example 1',
];

export const CourseDetail = () => {
  const params = useParams();
  const { id } = params;

  const router = useNavigate();
  return (
    <Box p={4}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Lập Trình JavaScript Cơ Bản
          </Typography>
          <Typography variant="body1" mb={4}>
            Học Javascript cơ bản phù hợp cho người chưa từng học lập trình. Với hơn 100 bài học và
            có bài tập thực hành sau mỗi bài học.
          </Typography>

          <Typography variant="h6" fontWeight={600} mb={2}>
            Bạn sẽ học được gì?
          </Typography>
          <Grid container spacing={1}>
            {features.map((item, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Box display="flex" alignItems="center">
                  <CheckCircleOutlineIcon fontSize="small" color="warning" sx={{ my: 1, mr: 1 }} />
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
              <strong>20 chương</strong> · <strong>205 bài học</strong> ·{' '}
            </Typography>

            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight={600}>1. Giới thiệu</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense disablePadding>
                  <ListItem>
                    <ListItemText primary="Giới thiệu" secondary="04:20" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Giới thiệu" secondary="02:08" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText primary="Giới thiệu" secondary="01:00" />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>
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
              <img src="/slider-img/pic2.jpg" height={150} />
            </Box>
            <CardContent>
              <Typography variant="h5" color="error" fontWeight={600} textAlign="center">
                Miễn phí
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ justifyContent: 'center' }}>
                    <SchoolIcon />
                  </ListItemIcon>
                  <ListItemText primary="Trình độ cơ bản" />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ justifyContent: 'center' }}>
                    <LayersIcon />
                  </ListItemIcon>
                  <ListItemText primary="Tổng số 205 bài học" />
                </ListItem>
              </List>

              <Box display="flex" justifyContent="center" my={2}>
                <Button variant="contained" size="large" onClick={() => router(`/course/learning`)}>
                  Đăng ký học
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
