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
  onDelete: () => void;
};
export const DeleteCourseConfirm = ({ open, onClose, onDelete }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography fontSize={25} fontWeight={600}>
          Xác nhận xóa khóa học
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn xóa khóa học này không? Hành động này sẽ không thể hoàn tác.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button variant="contained" onClick={onDelete} color="error">
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
};
