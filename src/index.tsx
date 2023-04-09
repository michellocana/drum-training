import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './contexts/AuthProvider'
import Root from './pages/Root'
import Training from './pages/Training'
import { ROUTES } from './constants/routes'
import TracksProvider from './contexts/TracksProvider'
import PlayerProvider from './contexts/PlayerProvider'
import MomentsProvider from './contexts/MomentsProvider'
import Layout from './pages/Layout'
import BaseLayout from './components/UI/BaseLayout'

// TODO: fix base url behavior on github pages
const root = ReactDOM.createRoot(document.querySelector('#root')!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TracksProvider>
          <MomentsProvider>
            <BaseLayout>
              <Routes>
                <Route path={ROUTES.ROOT} element={<Root />} />
                <Route
                  path={ROUTES.TRAINING}
                  element={
                    <PlayerProvider>
                      <Training />
                    </PlayerProvider>
                  }
                />
                <Route path={'/layout'} element={<Layout />} />
              </Routes>
            </BaseLayout>
          </MomentsProvider>
        </TracksProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
