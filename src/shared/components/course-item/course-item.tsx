import { Avatar, Card, CardContent, CardMedia, Link, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

type Props = {
  id: string;
  title: string;
  price: number;
  author: string;
  dateTime: string;
  img?: string;
};
export const CourseItem = ({ id, img, title, price, author, dateTime }: Props) => {
  const router = useNavigate();

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <Link onClick={() => router(`/course/${id}`)} underline="none" sx={{ cursor: 'pointer' }}>
          <CardMedia component="img" src={img || ''} height={150} />
        </Link>
        <CardContent sx={{ backgroundColor: '#f7f7f7' }}>
          <Link
            onClick={() => router(`/course/${id}`)}
            underline="none"
            color="textPrimary"
            sx={{ cursor: 'pointer' }}
          >
            <Typography fontSize={18} fontWeight={500}>
              {title}
            </Typography>
          </Link>

          <Typography fontSize={15} fontWeight={400} color="error">
            {price === 0 ? 'Miễn phí' : `${price.toLocaleString('vi-VN')}đ`}
          </Typography>

          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mt: 3 }}
          >
            <Stack direction="row" spacing={1}>
              <Avatar src="" sx={{ width: 24, height: 24 }} />
              <Typography fontSize={15} fontWeight={400} color="textSecondary">
                {author}
              </Typography>
            </Stack>

            <Typography fontSize={15} fontWeight={400} color="textSecondary">
              {dateTime}
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};
