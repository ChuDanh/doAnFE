import { Box, Button, CardMedia, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { data } from './constants.ts';
import Iconify from '../../../shared/components/iconify';
import { styleDataGrid } from '../../../shared/styles/data-grid-styles.ts';

export const CartPage = () => {
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'TÊN KHÓA HỌC', width: 300, sortable: false },
    {
      field: 'image',
      headerName: 'HÌNH ẢNH',
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
    { field: 'seller', headerName: 'NGƯỜI BÁN', width: 300, sortable: false },
    {
      field: 'price',
      headerName: 'GIÁ',
      flex: 2,
      renderCell: (params: GridRenderCellParams) => {
        const formattedPrice = Number(params.value).toLocaleString('vi-VN') + ' đ';
        return <span>{formattedPrice}</span>;
      },
    },
    {
      field: 'action',
      headerName: '',
      flex: 1,
      sortable: false,
      renderCell: () => (
        <Button variant="contained" color="error" size="small">
          <Iconify icon="eva:trash-2-outline" width={25} height={25} />
        </Button>
      ),
    },
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Giỏ hàng
      </Typography>

      <DataGrid
        columns={columns}
        rows={data}
        checkboxSelection
        disableColumnMenu
        hideFooterSelectedRowCount
        disableRowSelectionOnClick
        hideFooterPagination
        getRowHeight={() => 'auto'}
        slots={{
          noRowsOverlay: () => (
            <Box display="flex" alignItems="center" justifyContent="center" height="100%">
              <Typography fontSize={18} color="textSecondary">
                Không có khóa học
              </Typography>
            </Box>
          ),
        }}
        sx={{
          border: 0,
          ...styleDataGrid,
        }}
      />

      <Box display="flex" justifyContent="flex-end">
        <Typography fontSize={20} fontWeight={600} color="textPrimary">
          Tổng cộng: 0 đ
        </Typography>
      </Box>

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" color="warning" size="large">
          Thanh Toán
        </Button>
      </Box>
    </Box>
  );
};
