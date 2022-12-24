import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './pages/root'
import FirebaseProvider from './contexts/FirebaseProvider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
])

const root = ReactDOM.createRoot(document.querySelector('#root')!)

root.render(
  <React.StrictMode>
    <FirebaseProvider>
      <RouterProvider router={router} />
    </FirebaseProvider>
  </React.StrictMode>,
)
