import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const ProtectedRoute = ({ element }) => {
  const { user } = useAuthContext();

  return user ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
