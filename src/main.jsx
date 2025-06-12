
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import TablePage from './pages/Table/TablePage.jsx';


const router = createBrowserRouter([
  {
    path: '/table/:tableId',
    element: <TablePage />
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
          <RouterProvider router={router} />
  </StrictMode>,
)
