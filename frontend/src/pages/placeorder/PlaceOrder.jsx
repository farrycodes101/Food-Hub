import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../placeorder/PlaceOrder.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {

  const { getTotalCartAmount, token, food_list, cartItem, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    contact: ''
  });

  const onChangehandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItem = [];
    food_list.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItem.push(itemInfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItem,
      amount: getTotalCartAmount() + 2
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      alert("Eror");
    }
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate('/cart');
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangehandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangehandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='Email' />
        <input required name='street' onChange={onChangehandler} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangehandler} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangehandler} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangehandler} value={data.zipcode} type="text" placeholder='Zip Code' />
          <input required name='country' onChange={onChangehandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='contact' onChange={onChangehandler} value={data.contact} type="text" placeholder='Contact' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub-Total</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
            </div>
          </div>
          <button type='submit'>Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;