import React from 'react'
import NavBar from './components/NavBar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Shop from './Pages/Shop'
import About from './Pages/About'
import Started from './Pages/Started'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Product from './Pages/Product'
import Login from './Pages/Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
       <NavBar/>
       <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/started' element={<Started/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path='productId' element={<Product/>} />

        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
