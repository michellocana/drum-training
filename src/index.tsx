import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FirebaseProvider from './contexts/FirebaseProvider'
import Root from './pages/Root'
import Training from './pages/Training'
import { ROUTES } from './constants/routes'

const root = ReactDOM.createRoot(document.querySelector('#root')!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <Routes>
          <Route path={ROUTES.ROOT} element={<Root />} />
          <Route path={ROUTES.TRAINING} element={<Training />} />
        </Routes>
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
