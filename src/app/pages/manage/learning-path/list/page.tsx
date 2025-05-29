import { Box, Button, Chip, Stack, Tooltip, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import Iconify from '../../../../../shared/components/iconify';
import { styleDataGrid } from '../../../../../shared/styles/data-grid-styles.ts';
import { useGetListLearningPath } from '../../../../../core/learning-path/use-get-list-learning-path.ts';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const LearningPathPage = () => {
  const paginationModel = { page: 0, pageSize: 5 };
  const router = useNavigate();
  const { data } = useGetListLearningPath();

  const convertData = useMemo(() => {
    return (
      data?.map((item) => ({
        id: item._id,
        name: item.name,
        image: {
          name: item.image.name,
          url: item.image.url,
        },
        createdAt: item.createdAt,
      })) || []
    );
  }, [data]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên lộ trình',
      width: 300,
      flex: 2,
      sortable: false,
    },
    {
      field: 'image',
      headerName: 'Hình ảnh',
      width: 150,
      flex: 2,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" alignItems="center">
          <Chip
            label={params.value?.name}
            onClick={() => {
              if (params.value?.url) {
                window.open(params.value.url, '_blank');
              }
            }}
          />
        </Box>
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 200,
      flex: 1,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Typography fontSize={15}>{format(new Date(params.value), 'dd/MM/yyyy')}</Typography>
      ),
    },
    {
      field: 'action',
      headerName: '',
      flex: 0,
      sortable: false,
      renderCell: () => (
        <Box>
          <Tooltip title={'Xóa'} placement="top" arrow>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => console.log('Delete')}
            >
              <Iconify icon="eva:trash-2-outline" width={25} height={25} />
            </Button>
          </Tooltip>
        </Box>
      ),
    },
  ];

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
          onClick={() => router('/manage/learning-path/add')}
        >
          <Typography fontWeight={500} fontSize={14}>
            Thêm lộ trình học tập
          </Typography>
        </Button>
      </Stack>
      {data && data.length > 0 && (
        <DataGrid
          columns={columns}
          rows={convertData}
          disableColumnMenu
          hideFooterSelectedRowCount
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 15]}
          sx={{ border: 0, ...styleDataGrid }}
          getRowHeight={() => 'auto'}
          initialState={{ pagination: { paginationModel } }}
          slots={{
            noRowsOverlay: () => (
              <Box display="flex" alignItems="center" justifyContent="center" height="100%">
                <Typography fontSize={18} color="textSecondary">
                  Không có lộ trình học nào
                </Typography>
              </Box>
            ),
          }}
        />
      )}
    </Box>
  );
};
