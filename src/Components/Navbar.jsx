import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div >
        <h1>testing the elements</h1>
      
      <h1 className="tittle">Wick & Whistle Pantry </h1>
      </div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contacts">Contact</a></li>
      </ul>
    </nav>
  );
}
export default Navbar;