import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { RouterProvider } from "react-router-dom";
import router from './Router.jsx';
import AuthProvider from './Auth/Providers/AuthProvider.jsx';
// import AuthProvider from './Auth/Providers/AuthProvider.jsx';

// import {
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query"

// const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <  QueryClientProvider client={queryClient}> */}
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {/* </QueryClientProvider> */}
  </StrictMode>,
)
