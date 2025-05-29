import { useSearchParams } from 'react-router-dom';
import { useGetCourseList } from '../../../../core/courses/use-get-course-list';
import { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Iconify from '../../../../shared/components/iconify';
import { CourseItem } from '../../../../shared/components/course-item/course-item.tsx';
import { format } from 'date-fns';

export const SearchResult = () => {
  const [params] = useSearchParams();
  const keyword = params.get('keyword') || undefined;

  const { data, mutate } = useGetCourseList(keyword);

  useEffect(
    () => {
      if (keyword) {
        mutate();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [keyword]
  );
  return (
    <Box p={3}>
      <Typography sx={{ mb: 5 }} fontSize={30} fontWeight={600} align={'center'}>
        Kết quả tìm kiếm cho: <span style={{ color: '#1976d2' }}>{keyword}</span>
      </Typography>

      {data?.pro_courses.length === 0 && data?.free_courses.length === 0 && (
        <Box>
          <Box width={'100%'} display="flex" justifyContent="center">
            <img src="/no-result.png" width="40%" height="40%" />
          </Box>
          <Typography
            sx={{ mb: 2 }}
            fontSize={20}
            fontWeight={500}
            color="textSecondary"
            align="center"
          >
            Không tìm thấy khóa học
          </Typography>
        </Box>
      )}

      {data && data.pro_courses?.length > 0 && (
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
          <Grid container spacing={3} sx={{ px: 8, pt: 2 }}>
            {data?.pro_courses.map((course, index) => (
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
            ))}
          </Grid>
        </>
      )}

      {data && data.free_courses.length > 0 && (
        <>
          <Typography sx={{ pt: 5, pl: 8, mb: 2 }} fontSize={30} fontWeight={600}>
            Khóa học miễn phí
          </Typography>
          <Grid container spacing={3} sx={{ px: 8, pt: 2 }}>
            {data?.free_courses.map((course, index) => (
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
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};
