import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Registration from './components/Registration'
import ListPlayer from './components/ListPlayer'
import SideNavBar from './components/SideNavBar'
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './components/LoginPage';

const App = () => {

  return (
    <BrowserRouter>
      <div className="flex">
        <SideNavBar />
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/players"
            element={
              <PrivateRoute>
                <ListPlayer />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
