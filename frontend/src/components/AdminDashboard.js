// frontend\src\components\AdminDashboard.js
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ApplicationList from './ApplicationList';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      
      {user ? (
        <div>
         
          <ApplicationList />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AdminDashboard;

