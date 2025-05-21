import { useData } from '../../../context/DataContext.tsx';
import { SimpleSlider } from '../../../shared/components/slider/slider.tsx';
import { IMG } from './constants.ts';
import { Box, Grid, Typography } from '@mui/material';
import { CourseList, courseListFree } from './mockData.ts';
import { CourseItem } from '../../../shared/components/course-item/course-item.tsx';
import Iconify from '../../../shared/components/iconify';

export default function Home() {
  const { data } = useData();

  return (
    <>
      <Box sx={{ pl: 1, pt: 2, mb: 3 }}>
        <SimpleSlider images={IMG} />
      </Box>

      <Typography sx={{ pt: 5, pl: 8, mb: 2 }} fontSize={30} fontWeight={600}>
        Khóa học nâng cao
        <Iconify
          icon="material-symbols-light:crown-rounded"
          color="#e1dd0b"
          width={30}
          sx={{ ml: 1 }}
        />
      </Typography>

      <Grid container spacing={3} sx={{ px: 8 }}>
        {CourseList.map((course, index) => (
          <Grid size={3}>
            <CourseItem
              key={index}
              id={course.id}
              title={course.title}
              price={course.price}
              author={course.author}
              dateTime={course.date_time}
              img={course.img}
            />
          </Grid>
        ))}
      </Grid>

      <Typography sx={{ pt: 5, pl: 8, mb: 2 }} fontSize={30} fontWeight={600}>
        Khóa học miễn phí
      </Typography>

      <Grid container spacing={3} sx={{ px: 8 }}>
        {courseListFree.map((course, index) => (
          <Grid size={3}>
            <CourseItem
              id={course.id}
              key={index}
              title={course.title}
              price={course.price}
              author={course.author}
              dateTime={course.date_time}
              img={course.img}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
