// frontend/src/TestComponents/LocalStorageDisplay.js

import React, { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';

const LocalStorageDisplay = () => {
  const { application, paymentStatus, certified, historyset } = useContext(ApplicationContext);
  const [localStorageData, setLocalStorageData] = useState({});

  useEffect(() => {
    // Get all local storage items related to useLogin
    const userToken = localStorage.getItem('userToken');
    const userDetails = localStorage.getItem('userDetails');
    const histoset = localStorage.getItem('histoset');
    const historysetId = localStorage.getItem('historysetId');

    // Update local storage data state when context changes
    setLocalStorageData({
      userToken,
      userDetails: JSON.parse(userDetails),
      histoset,
      historysetId,
      historyset,
      application,
      paymentStatus,
      certified,
    });
  }, [application, paymentStatus, certified, historyset]); // Dependency array to update when context changes

  return (
    <div>
      <h2>Local Storage Data</h2>
      <div>
        <h3>User Token</h3>
        <pre>{localStorageData.userToken}</pre>
      </div>
      <div>
        <h3>User Details</h3>
        <pre>{JSON.stringify(localStorageData.userDetails, null, 2)}</pre>
      </div>
      <div>
        <h3>Histoset</h3>
        <pre>{localStorageData.histoset}</pre>
      </div>
      <div>
        <h3>Historyset ID</h3>
        <pre>{localStorageData.historysetId}</pre>
      </div>
      <div>
        <h3>Historyset</h3>
        <pre>{JSON.stringify(localStorageData.historyset, null, 2)}</pre>
      </div>
      <div>
        <h3>Application</h3>
        <pre>{JSON.stringify(localStorageData.application, null, 2)}</pre>
      </div>
      <div>
        <h3>Payment Status</h3>
        <pre>{JSON.stringify(localStorageData.paymentStatus, null, 2)}</pre>
      </div>
      <div>
        <h3>Certified</h3>
        <pre>{JSON.stringify(localStorageData.certified, null, 2)}</pre>
      </div>
    </div>
  );
};

export default LocalStorageDisplay;
