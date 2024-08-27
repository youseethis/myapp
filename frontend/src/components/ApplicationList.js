// frontend\src\components\ApplicationList.js
import React, { useState, useEffect, useContext } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import handleApprove from './handleApprove';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ApplicationContext } from '../context/ApplicationContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { dispatch } = useContext(ApplicationContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicationsRes = await axios.get('http://localhost:4000/api/applications');
        const applicationsData = applicationsRes.data;

        const usersRes = await axios.get('http://localhost:4000/users');
        const usersData = usersRes.data;

        const paymentsRes = await axios.get('http://localhost:4000/api/payments');
        const paymentsData = paymentsRes.data;

        const combinedData = applicationsData.map(application => {
          const user = usersData.find(user => user._id === application.userID);
          const payment = paymentsData.find(payment => payment.applicationID === application._id);
          return {
            id: application._id,
            fullName: `${user?.Fname} ${user?.Lname}`,
            address: user?.address,
            controlno: payment?.controlno,
            amount: payment?.amount,
            paymentStatus: payment?.paymentStatus,
            status: application.status,
          };
        });

        setApplications(combinedData);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproveClick = async (applicationId) => {
    try {
      const updatedApplication = await handleApprove(applicationId);
      
      setApplications((prevApplications) =>
        prevApplications.map((application) =>
          application.id === applicationId ? { ...application, status: 'approved' } : application
        )
      );

      dispatch({ type: 'SET_APPLICATION', payload: updatedApplication });

      localStorage.setItem('application', JSON.stringify(updatedApplication));

      toast.success('Certificate issued!');
    } catch (error) {
      toast.error('Failed to approve application.');
      console.error('Failed to approve application:', error);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Applications List
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Full Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Address</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Control No</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Payment Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Certificate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application, index) => (
              <TableRow key={application.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{application.fullName}</TableCell>
                <TableCell>{application.address}</TableCell>
                <TableCell>{application.controlno}</TableCell>
                <TableCell>{application.amount}</TableCell>
                <TableCell>{application.paymentStatus}</TableCell>
                <TableCell>
                  {application.status === 'approved' ? (
                    
                    <CheckCircleIcon style={{ color: 'green', fontWeight: 'bold' }}></CheckCircleIcon>
                  ) : (
                    <button
                      disabled={application.paymentStatus !== 'completed'}
                      onClick={() => handleApproveClick(application.id)}
                      style={{
                        backgroundColor: application.paymentStatus === 'completed' ? '#4caf50' : '#cccccc',
                        color: 'white',
                        border: 'none',
                        padding: '6px 12px',
                        cursor: application.paymentStatus === 'completed' ? 'pointer' : 'not-allowed',
                      }}
                    >
                      Issue 
                    </button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </Box>
  );
};

export default ApplicationList;
