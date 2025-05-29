import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

type Props = {
  open: boolean;
  onClose: () => void;
  onExit: () => void;
};

export const ExitDialog = ({ open, onClose, onExit }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography fontSize={25} fontWeight={600}>
          Xác nhận thoát
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Dữ liệu của bạn sẽ không được lưu lại. Bạn có chắc chắn muốn thoát không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose} color="inherit">
          Hủy
        </Button>
        <Button variant="contained" onClick={onExit} color="error">
          Thoát
        </Button>
      </DialogActions>
    </Dialog>
  );
};
