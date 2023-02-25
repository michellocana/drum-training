import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider'
import Root from './pages/Root'
import Training from './pages/Training'
import { ROUTES } from './constants/routes'
import TracksProvider from './contexts/TracksProvider'

const root = ReactDOM.createRoot(document.querySelector('#root')!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TracksProvider>
          <Routes>
            <Route path={ROUTES.ROOT} element={<Root />} />
            <Route path={ROUTES.TRAINING} element={<Training />} />
          </Routes>
        </TracksProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
