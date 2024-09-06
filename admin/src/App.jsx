import React from 'react';
import Navbar from './components/navbar/Navbar'
import SideBar from './components/sidebar/sideBar'
import { Routes,Route} from 'react-router-dom';
import Add from './components/pages/add/Add';
import List from './components/pages/list/List';
import Order from './components/pages/orders/Order';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "http://localhost:3000";
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <div className="app-content">
        <SideBar />
        <Routes>
          <Route path='/add' element={<Add url={url} />}/>
          <Route path='/list' element={<List url={url}t />}/>
          <Route path='/orders' element={<Order url={url}er />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;