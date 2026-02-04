import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Registration from './components/Registration'
import ListPlayer from './components/ListPlayer'
import SideNavBar from './components/SideNavBar'
import AppTitleBar from './components/AppTitleBar';


const App = () => {

  return (
    <BrowserRouter>
      <div className="flex">
        <SideNavBar />
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/players" element={<ListPlayer />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
