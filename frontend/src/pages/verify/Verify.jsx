import React, { useContext, useSearchParams, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../verify/Verify.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';


const Verify = () => {
  const { url } = useContext(StoreContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get(("success"))
  const orderId = searchParams.get(("orderId"))
  const navigate = useNavigate();
  console.log(success, orderId);

  const verifyPayment = async() => {
    const response = await axios.post(url+"/api/order/verify", {success, orderId });
    if(response.data.success){
      navigate("/myorders");
    }else {
      navigate("/");
    }
  }

  useEffect(() => {
    verifyPayment();
  },[]);
  
  return (
    <div className='verify'>
      <div className="spinner">

      </div>
      </div>
  )
}

export default Verify;