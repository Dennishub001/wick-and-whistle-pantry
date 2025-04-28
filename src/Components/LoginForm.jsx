import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./Login.css"

function SignUpPage({ setIsSignedUp }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (email && name) {
      localStorage.setItem('isSignedUp', true);
      setIsSignedUp(true);

      // SweetAlert success message
      Swal.fire({
        title: 'Success!',
        text: 'You have successfully signed up!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/'); // Redirect to the homepage after closing the alert
      });
    } else {
      // SweetAlert error message
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all fields!',
        icon: 'error',
        confirmButtonText: 'Retry',
      });
    }
  };

  return (
    <div className='signup-container'>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
      className='signup-form'
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignUp} className='signup-form'>
        Sign Up
      </button>
    </div>
  );
}

export default SignUpPage;
