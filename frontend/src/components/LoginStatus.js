// frontend/src/components/LoginStatus.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Adjust path as needed

const ExampleComponent = () => {
  const { state, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('user'); // Clear user data from localStorage
  };

  return (
    <div>
      <h2>Welcome, {state.user ? state.user.username : 'Guest'}</h2>
      {state.user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <p>Please login to access this content.</p>
      )}
    </div>
  );
};

export default ExampleComponent;
