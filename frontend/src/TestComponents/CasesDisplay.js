// frontend/src/TestComponents/CasesDisplay.js
import React, { useContext } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';

const CasesDisplay = () => {
  const {
    application,
    paymentStatus,
    certified,
    historyset,
    error,
    loading,
  } = useContext(ApplicationContext);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Cases Display</h2>
      <div>
        <h3>Application</h3>
        <pre>{JSON.stringify(application, null, 2)}</pre>
      </div>
      <div>
        <h3>Payment Status</h3>
        <pre>{JSON.stringify(paymentStatus, null, 2)}</pre>
      </div>
      <div>
        <h3>Certified</h3>
        <pre>{JSON.stringify(certified, null, 2)}</pre>
      </div>
      <div>
        <h3>Historyset</h3>
        <pre>{JSON.stringify(historyset, null, 2)}</pre>
      </div>
    </div>
  );
};

export default CasesDisplay;
