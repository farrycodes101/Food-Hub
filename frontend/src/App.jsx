import { useState } from 'react'
import Navbar from "./components/navbar/Navbar.jsx";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Cart from "./pages/cart/Cart.jsx";
import PlaceOrder from "./pages/placeorder/PlaceOrder.jsx";
import { Footer } from './components/footer/Footer.jsx';
import Login from './components/login/Login.jsx';
import Verify from './pages/verify/Verify.jsx';
import MyOrders from './pages/myorders/MyOrders.jsx';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {
      showLogin ? <Login setShowLogin={setShowLogin} /> : <></>
    }
      <div className="app">
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>

  );
}

export default App;
