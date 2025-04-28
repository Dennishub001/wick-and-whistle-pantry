import React from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function Navbar({ isSignedUp, setIsSignedUp }) {
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.setItem("isSignedUp", "false"); 
    setIsSignedUp(false);
    Swal.fire('Logged Out', 'You have successfully logged out.', 'success');
  };

  return (
    <nav className="navbar">
      <div>
        <h1 className="title">Wick & Whistle Pantry</h1>
      </div>
      <ul className="nav-links">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/favorites" className="nav-button">My Favorites</Link>
        {!isSignedUp && (
          <Link to="/signup" className="nav-button">
            Sign Up
          </Link>
        )}
        {isSignedUp && ( 
          <button onClick={handleLogout} className="small-button">Logout</button>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
