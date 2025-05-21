export const styleDataGrid = {
  '& .MuiDataGrid-cell': {
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    minHeight: '100px !important',
    maxHeight: 'fit-content !important',
  },
  '& .MuiDataGrid-row': {
    maxHeight: 'fit-content !important',
    fontSize: 15,
    fontStyle: 'italic',
  },
  '& .MuiDataGrid-cell:focus': {
    // Loại bỏ outline khi focus
    outline: 'none',
  },
  '& .MuiDataGrid-cell:focus-within': {
    // Loại bỏ outline khi focus
    outline: 'none',
  },
  '& .MuiDataGrid-columnHeaderTitle': {
    fontSize: 17,
    fontWeight: 'bold',
  },
};
