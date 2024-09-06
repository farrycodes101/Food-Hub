import React from 'react';
// import '../Header/Header.css';
import './Header.css';
const Header = () => {
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>Order Your Favourite Foods Here</h2>
                <p>Welcome to <b><i>Food Hub</i></b>, Your ultimate destination for all things delicious! Whether you're a seasoned home chef or just starting to explore the culinary world, we have something for everyone. Dive into our extensive collection of mouth-watering recipes, from comforting classics to trendy, modern dishes. Join our vibrant community of food lovers, share your own recipes, and exchange tips with fellow enthusiasts. At <i>Food Hub</i>, we believe in making every meal an unforgettable experience."</p>
                <button>View Menu</button>
            </div>
        </div>
    )
}

export default Header;