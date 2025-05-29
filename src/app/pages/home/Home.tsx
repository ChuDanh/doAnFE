import { SimpleSlider } from '../../../shared/components/slider/slider.tsx';
import { IMG } from './constants.ts';
import { Box, Grid, Typography } from '@mui/material';
import { CourseItem } from '../../../shared/components/course-item/course-item.tsx';
import Iconify from '../../../shared/components/iconify';
import { useGetCourseList } from '../../../core/courses/use-get-course-list.ts';
import { format } from 'date-fns';

export default function Home() {
  const { data } = useGetCourseList();

  return (
    <>
      <Box sx={{ pl: 1, pt: 2, mb: 3 }}>
        <SimpleSlider images={IMG} />
      </Box>

      {data && data.pro_courses.length > 0 && (
        <>
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
            {data?.pro_courses.map((course, index) => (
              <>
                <Grid size={3}>
                  <CourseItem
                    key={index}
                    id={course._id}
                    title={course.name}
                    price={course.price}
                    author={course.author.full_name}
                    dateTime={format(course.createdAt, 'dd/MM/yyyy')}
                    img={course.image_course}
                  />
                </Grid>
              </>
            ))}
          </Grid>
        </>
      )}

      {data && data.free_courses.length > 0 && (
        <>
          <Typography sx={{ pt: 5, pl: 8, mb: 2 }} fontSize={30} fontWeight={600}>
            Khóa học miễn phí
          </Typography>
          <Grid container spacing={3} sx={{ px: 8 }}>
            {data?.free_courses.map((course, index) => (
              <>
                <Grid size={3}>
                  <CourseItem
                    id={course._id}
                    key={index}
                    title={course.name}
                    price={course.price}
                    author={course.author.full_name}
                    dateTime={format(course.createdAt, 'dd/MM/yyyy')}
                    img={course.image_course}
                  />
                </Grid>
              </>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}
