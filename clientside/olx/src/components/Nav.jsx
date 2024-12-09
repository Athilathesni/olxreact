import React from "react";
import "./Nav.css";  // Import the CSS for the navbar

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
      <div className="search1-bar">
          <input
            type="text"
            placeholder=""
            className="search1-input"
          />
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Find Cars, Mobiles and more..."
            className="search-input"
          />
        </div>
        <div>
            <img src="" alt="" />
        </div>
        <div className="cont">
        <div className="eng">  
        <select className="engs">
            <option value="">ENGLISH</option>
            <option value="">हिन्दी</option>
        </select>
        </div>
        <div className="lod">Login</div>
        <button className="sell"><span className="plu">+</span>SELL</button>
   </div>
       
      </div>
    </nav>
  );
};

export default Nav;
