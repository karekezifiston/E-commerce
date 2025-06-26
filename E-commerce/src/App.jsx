import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Shop from './Pages/Shop';
import About from './Pages/About';
import Started from './Pages/Started';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Product from './Pages/Product';
import Login from './Pages/Login';
import ShopCategory from './Pages/ShopCategory';
import men_banner from './components/Assets/banner-men.png';
import women_banner from './components/Assets/banner-women.png';
import kids_banner from './components/Assets/banner-kids.png';

const Loading = () => (
  <div className='wait'>
    <div className='rotate'>
      <p>Free server life 😅 please give it a second to get ready!</p>
    </div>
  </div>
);

const AppContent = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show the loading overlay during page transition
    setLoading(true);

    // Simulate content loading for 3 seconds
    const timer = setTimeout(() => setLoading(false), 900); // Adjust duration if needed

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [location]);

  return (
    <div>
      {loading && <Loading />}
      {!loading && (
        <>
          <NavBar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/started" element={<Started />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
            <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
            <Route path="/kids" element={<ShopCategory banner={kids_banner} category="kid" />} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      )}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
