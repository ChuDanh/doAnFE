import { Link, Stack, Typography } from '@mui/material';
import Iconify from '../iconify';
import { useNavigate } from 'react-router-dom';

type Props = {
  href?: string;
};
export const BackButton = ({ href }: Props) => {
  const router = useNavigate();

  return (
    <Link underline="none" sx={{ cursor: 'pointer' }} onClick={() => router(href || '#')}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          '&:hover .icon': {
            transform: 'translateX(-3px)',
          },
        }}
      >
        <Iconify
          icon="material-symbols:arrow-back-2-rounded"
          width={28}
          color="#808990"
          sx={{
            transition: 'transform 0.3s',
          }}
          className="icon"
        />
        <Typography fontSize={14} color="textSecondary">
          Quay lại
        </Typography>
      </Stack>
    </Link>
  );
};
