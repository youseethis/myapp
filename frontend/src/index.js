// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { SeasonContextProvider } from './context/SeasonContext'; // Correct import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SeasonContextProvider>
        <App />
      </SeasonContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
