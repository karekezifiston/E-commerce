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
import ShopCategory from './Pages/ShopCategory'
import men_banner from './components/Assets/banner-men.png'
import women_banner from './components/Assets/banner-women.png'
import kids_banner from './components/Assets/banner-kids.png'

const App = () => {
  return (
    <div>
      <BrowserRouter>
       <NavBar/>
       <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/started' element={<Started/>}/>
        <Route path='/about' element={<About/>}/>    
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/womens' element={<ShopCategory banner={women_banner}category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kids_banner}category="kid"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
       </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
