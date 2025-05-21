import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App.tsx';
import { SnackbarProvider } from 'notistack';
import { SWRConfig } from 'swr';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <BrowserRouter>
        <SWRConfig
          value={{
            // Tải lại dữ liệu khi cửa sổ được focus
            revalidateOnFocus: false,
            // Tải lại khi kết nối mạng được khôi phục
            revalidateOnReconnect: false,
            refreshInterval: 5000,
          }}
        >
          <App />
        </SWRConfig>
      </BrowserRouter>
    </SnackbarProvider>
  </StrictMode>
);
