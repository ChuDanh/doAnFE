import { CardMedia, Container, Skeleton, Typography } from '@mui/material';
import { BackButton } from '../../../../shared/components/back-button/back-button.tsx';
import { useParams } from 'react-router-dom';
import { useGetLearningPathById } from '../../../../core/learning-path/use-get-learning-path-by-id.ts';

export const LearningPathDetail = () => {
  const params = useParams();
  const { id } = params;

  const { data } = useGetLearningPathById({ _id: id || '' });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton href={'/learning-path'} />

      {data ? (
        <>
          <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
            {data.name}
          </Typography>

          <CardMedia component="img" src={data.image.url} alt={data.image.name} />
        </>
      ) : (
        <Skeleton variant="rectangular" height={100} sx={{ width: '100%' }} />
      )}
    </Container>
  );
};
