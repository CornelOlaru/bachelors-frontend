
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
// import TablePage from './pages/Table/TablePage.jsx';
import MainPage from './pages/MainPage/MainPage.jsx';
import { CartProvider } from './context/cartContext.jsx';
import TablePage from './pages/Table/TablePage.jsx';
import ProductModal from './pages/ProductModal/ProductModal.jsx';


const router = createBrowserRouter([
  
   {
    path: '/',
    element: < MainPage/>  // sau ce vrei tu pentru pagina de start
  },
  {
    path: '/table/:tableId',
    element: <MainPage />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>

          <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
