import { CardMedia, Container, Typography } from '@mui/material';
import { BackButton } from '../../../../shared/components/back-button/back-button.tsx';
import { useParams } from 'react-router-dom';

export const LearningPathDetail = () => {
  const params = useParams();
  const { id } = params;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BackButton href={'/learning-path'} />

      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
        title
      </Typography>

      <CardMedia component="img" src="#" />
    </Container>
  );
};
