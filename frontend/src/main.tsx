import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Account from './pages/account'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/account/:id",
    element: <Account />,
  }
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
