import React from 'react'
import SideBar from './Components/SideBar/SideBar';
import { Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/Add'
import List from './Pages/List/List'
import Orders from './Pages/Orders/Orders'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Components/NavBar/NavBar'

const App = () => {

  const url = "https://shop-eco-backend.onrender.com";

  return (
    <div className='app'>
      <ToastContainer />
      <NavBar />
      <hr />
      <div className='app-content'>
        <SideBar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
