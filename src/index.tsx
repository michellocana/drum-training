import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BaseLayout from './components/UI/BaseLayout'
import { ROUTES } from './constants/routes'
import AuthProvider from './contexts/AuthProvider'
import MomentsProvider from './contexts/MomentsProvider'
import PlayerProvider from './contexts/PlayerProvider'
import TracksProvider from './contexts/TracksProvider'
import './index.css'
import Root from './pages/Root'
import Training from './pages/Training'

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
              </Routes>
            </BaseLayout>
          </MomentsProvider>
        </TracksProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
