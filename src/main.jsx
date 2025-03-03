import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import 'animate.css'
import ThemeProvider from './ThemeProvider/ThemeProvider'
import Authentication from './Authentication/Authentication'
import router from './Routes/Routes'


// query client instance 
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authentication>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <RouterProvider router={router} />
            <ToastContainer position="top-center"
              autoClose={1500}
              hideProgressBar={false}
              closeOnClick={true}
              pauseOnHover={true}
              draggable={true} />
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </Authentication>
  </StrictMode >,
)
