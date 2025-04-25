import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"
 const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation after successful login
 
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const success = login(email, password); // Try logging in with provided email & password
    if (!success) {
      setError("Invalid email or password"); // Show error if login fails
    } else {
      navigate("/dashboard"); // Redirect to dashboard after successful login
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ textAlign: "center" }}>Login</h2>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
