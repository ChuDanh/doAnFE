import { Typography, TypographyProps } from '@mui/material';

export const FieldTitle = ({
  title,
  required,
  sx,
  ...other
}: { title?: string; required?: boolean } & TypographyProps) => {
  return title ? (
    <Typography
      variant="body2"
      sx={{
        fontWeight: 'bold',
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        ...sx,
      }}
      {...other}
    >
      {title}
      {required && (
        <Typography component="span" color="error">
          *
        </Typography>
      )}
    </Typography>
  ) : null;
};
