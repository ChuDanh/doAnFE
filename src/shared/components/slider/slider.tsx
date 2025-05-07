import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Grid, Typography } from '@mui/material';

type SliderProps = {
  images: { url: string }[];
};

export const SimpleSlider = ({ images }: SliderProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Slider {...settings}>
      {images.map((image, i) => (
        <Box key={i}>
          <Grid
            container
            height={250}
            sx={{ border: '1px solid #ccc', borderRadius: 5, bgcolor: 'black' }}
            alignItems="center"
          >
            <Grid size={7}>
              <Typography fontSize={30} fontWeight={600} color="#FFFFFF">
                Title
              </Typography>
              <Typography fontSize={25} fontWeight={400} color="#FFFFFF">
                Description
              </Typography>
            </Grid>

            <Grid size={5}>
              <img
                src={image.url}
                height={250}
                width="100%"
                style={{ borderTopRightRadius: 15, borderBottomRightRadius: 15 }}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Slider>
  );
};
