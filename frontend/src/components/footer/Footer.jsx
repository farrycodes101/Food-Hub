import React from 'react';
import './Footer.css';
import { assets } from '../../assets/Assets';

export const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img src={assets.Logo} alt="" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae deserunt aperiam aliquid, quibusdam ducimus placeat possimus aut! Corporis, placeat? Corrupti doloremque autem tempore reprehenderit distinctio unde libero quos cupiditate perferendis!</p>
                    <div className="footer-social-icons">
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-centre">
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>Reach Us</h2>
                    <ul>
                        <li>+91-775-398-0987</li>
                        <li>contact@foodhub.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2024 © FoodHub.com. All Rights Reserved.</p>
        </div>
    )
}
