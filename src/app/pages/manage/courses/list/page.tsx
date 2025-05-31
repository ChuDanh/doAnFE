import { Box, Button, CardMedia, Chip, Link, Stack, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Iconify from '../../../../../shared/components/iconify/iconify';
import { styleDataGrid } from '../../../../../shared/styles/data-grid-styles.ts';
import { useMemo, useState } from 'react';
import { DeleteCourseConfirm } from '../../../../../shared/components/dialog/course/delete-course-confirm.tsx';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useGetCourseByAccount } from '../../../../../core/courses/use-get-course-by-account.ts';
import { useSnackbar } from 'notistack';

export const ManageCoursesList = () => {
  const { data, mutate } = useGetCourseByAccount();
  const { enqueueSnackbar } = useSnackbar();

  const paginationModel = { page: 0, pageSize: 10 };

  const router = useNavigate();

  const [getId, setGetId] = useState<string | null>(null);
  const [deleteCourse, setDeleteCourse] = useState(false);

  const handleDeleteConfirm = (id: string) => {
    setGetId(id);
    setDeleteCourse(true);
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await fetch(`http://localhost:3001/v1/course/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      await mutate();
      setGetId(null);
      setDeleteCourse(false);
      enqueueSnackbar('Xóa khóa học thành công', { variant: 'success' });
    } catch (e: any) {
      enqueueSnackbar(e.message, { variant: 'error' });
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên khóa học',
      width: 300,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Link
          underline="hover"
          color="textPrimary"
          href={`/manage/courses/detail/${params.row.id}`}
          sx={{ '&:hover': { color: 'primary.main' } }}
        >
          <Typography
            fontSize={15}
            sx={{
              display: '-webkit-box', // tạo 1 container flexbox, cần thiết cho WebkitLineClamp
              overflow: 'hidden',
              textOverflow: 'ellipsis', // hiển thị ...
              WebkitBoxOrient: 'vertical', // định hướng theo chiều dọc
              WebkitLineClamp: 3, // giới hạn số dòng hiển thị
            }}
          >
            {params.value}
          </Typography>
        </Link>
      ),
    },
    {
      field: 'image_course',
      headerName: 'Hình ảnh',
      width: 300,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <CardMedia
          component="img"
          src={params.value as string}
          sx={{
            objectFit: 'contain',
            width: 'auto',
            height: '100%',
            maxWidth: '100%',
          }}
        />
      ),
    },
    {
      field: 'level',
      headerName: 'Cấp độ',
      width: 150,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => {
        const level = params.value as string;
        return (
          <Chip
            label={level === 'basic' ? 'Cơ bản' : 'Nâng cao'}
            color={level === 'basic' ? 'success' : 'error'}
          />
        );
      },
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 200,
      sortable: true,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontSize={15}>{format(new Date(params.value), 'dd/MM/yyyy')}</Typography>
      ),
    },
    {
      field: 'price',
      headerName: 'Giá',
      flex: 2,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <span>
            {params.value === 0 ? 'Miễn phí' : `${Number(params.value).toLocaleString('vi-VN')} đ`}
          </span>
        );
      },
    },
    {
      field: 'action',
      headerName: '',
      flex: 1,
      sortable: false,
      align: 'center',
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <Tooltip title={'Chỉnh sửa'} placement="top" arrow>
            <Button
              variant="contained"
              size="small"
              sx={{ mb: 1 }}
              color="info"
              onClick={() => router(`/manage/courses/edit/${params.row.id}`)}
            >
              <Iconify icon="eva:edit-2-outline" width={25} height={25} />
            </Button>
          </Tooltip>

          <Tooltip title={'Xóa'} placement="top" arrow>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => handleDeleteConfirm(params.row.id)}
            >
              <Iconify icon="eva:trash-2-outline" width={25} height={25} />
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ];

  const convertData = useMemo(
    () =>
      data?.map((course) => ({
        id: course._id,
        name: course.name,
        image_course: course.image_course,
        createdAt: course.createdAt,
        price: course.price,
        level: course.level,
      })) || [],
    [data]
  );

  return (
    <Box p={4}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" fontWeight={700}>
          Danh sách khóa học
        </Typography>

        <Button
          variant="contained"
          color="warning"
          size="medium"
          startIcon={<Iconify icon="eva:plus-outline" />}
          onClick={() => router('/manage/courses/add')}
        >
          <Typography fontWeight={500} fontSize={14}>
            Thêm khóa học
          </Typography>
        </Button>
      </Stack>

      <DataGrid
        columns={columns}
        rows={convertData}
        disableColumnMenu
        hideFooterSelectedRowCount
        disableRowSelectionOnClick
        pageSizeOptions={[10, 15, 20]}
        sx={{ border: 0, ...styleDataGrid }}
        getRowHeight={() => 'auto'}
        initialState={{ pagination: { paginationModel } }}
        slots={{
          noRowsOverlay: () => (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
              <Typography fontSize={18} color="textSecondary">
                Không có khóa học
              </Typography>
            </Box>
          ),
        }}
      />

      {deleteCourse && (
        <DeleteCourseConfirm
          open={deleteCourse}
          onClose={() => setDeleteCourse(false)}
          onDelete={() => handleDeleteCourse(getId || '')}
        />
      )}
    </Box>
  );
};
