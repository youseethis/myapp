// frontend/src/pages/ApplicationPage.js
import React, { useState, useContext, useEffect } from 'react';
import { Box, Tabs, Tab, Typography, LinearProgress, Paper, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CourseOutline from '../components/ApplicationTabs/CourseOutline';
import TimeTable from '../components/ApplicationTabs/TimeTable';
import Venue from '../components/ApplicationTabs/Venue';
import Tutors from '../components/ApplicationTabs/Tutors';
import LearningMaterials from '../components/ApplicationTabs/LearningMaterials';
import Requirements from '../components/ApplicationTabs/Requirements';
import { ApplicationContext } from '../context/ApplicationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Applicationform from '../components/ApplicationTabs/Applicationform';
import { handlePay } from '../components/ApplicationTabs/handlePay';
import { AuthContext } from '../context/AuthContext';

const ApplicationPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const { state, dispatch } = useContext(ApplicationContext);
  const { user } = useContext(AuthContext);

  const {
    application = null,
    paymentStatus = null,
  } = state;

  // Update progress based on application status and payment status
  useEffect(() => {
    if (application?.status === 'approved') {
      setProgress(100);
    } else if (paymentStatus?.paymentStatus === 'completed') {
      setProgress(70);
    } else {
      setProgress(30);
    }
  }, [application, paymentStatus]);

  useEffect(() => {
    console.log('Application Context State:', state);
  }, [state]);

  useEffect(() => {
    console.log('Payment Status Updated:', paymentStatus);
  }, [paymentStatus]);

    // Logic to download the certificate
    const handleDownloadCertificate = () => {
      if (user) {
        const fullName = `${user.Fname} ${user.Lname}`;
        const certificateUrl = `http://localhost:4000/api/certificate/generate?fullName=${encodeURIComponent(fullName)}`;
        window.open(certificateUrl, '_blank');
      } else {
        console.error("User information not found.");
      }
    };
    

  const renderApplicationTab = () => {
    if (application) {
      return (
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fafafa', mb: 2, borderRadius: 0 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#4caf50' }}>
            Application Progress
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 2 }}>
              <Box sx={{ flexGrow: 1, mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 12,
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#4caf50',
                    },
                  }}
                />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${progress}%`}</Typography>
              </Box>
            </Box>
            {application.status === 'approved' && (
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                  Congratulations! Your application has been approved.
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: 2, borderRadius: 0 }}
                  onClick={handleDownloadCertificate}
                >
                  Download Certificate
                </Button>
              </Box>
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1"><strong>ID:</strong> {application._id}</Typography>
            <Typography variant="body1"><strong>Status:</strong> {application.status}</Typography>
          </Box>
        </Paper>
      );
    } else {
      return <Applicationform />;
    }
  };

  const renderPaymentDetails = () => {
    if (paymentStatus) {
      console.log('Payment Status:', paymentStatus);
      const isPaid = paymentStatus.paymentStatus === 'completed';
      return (
        <Box sx={{ flexBasis: '50%', p: 1 }}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fafafa', mb: 2, borderRadius: 0 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#4caf50' }}>
              Payment Control no
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1"><strong>Amount:</strong> {paymentStatus.amount}</Typography>
              <Typography variant="body1"><strong>Control Number:</strong> {paymentStatus.controlno}</Typography>
              <Typography variant="body1"><strong>Status:</strong> {paymentStatus.paymentStatus}</Typography>
            </Box>
            <Button 
              variant="contained" 
              color={isPaid ? 'success' : 'primary'} 
              sx={{
                width: '100%',
                mt: 2,
                borderRadius: 0,
                backgroundColor: isPaid ? '#e0f7fa' : undefined,
                color: isPaid ? '#4caf50' : undefined,
                fontWeight: isPaid ? 'bold' : undefined,
                cursor: isPaid ? 'default' : 'pointer',
                '&:disabled': {
                  backgroundColor: '#e0f7fa', // Keep background color even when disabled
                  color: '#4caf50', // Green text
                }
              }}
              onClick={!isPaid ? () => handlePay(paymentStatus._id, dispatch) : null}
              disabled={isPaid}
              startIcon={isPaid ? <CheckCircleIcon /> : null}
            >
              {isPaid ? 'Paid' : 'Pay Now'}
            </Button>
          </Paper>
        </Box>
      );
    } else {
      return (
        <Box sx={{ flexBasis: '50%', p: 1 }}>
          <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fafafa', mb: 2, borderRadius: 0 }}>
            <Typography variant="body1">No payment details available.</Typography>
          </Paper>
        </Box>
      );
    }
  };

  const renderPaymentInstructions = () => {
    if (paymentStatus) {
      const payment = paymentStatus;
      if (payment.paymentStatus === 'pending') {
        return (
          <Box sx={{ flexBasis: '50%', p: 1 }}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fafafa', mb: 2, borderRadius: 0 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#ff9800' }}>
                Payment Instructions
              </Typography>
              <Typography variant="body1">
                Please complete the payment using the provided control number. You can pay through Banks or Mobile money.
              </Typography>
            </Paper>
          </Box>
        );
      } else if (payment.paymentStatus === 'completed') {
        return (
          <Box sx={{ flexBasis: '50%', p: 1 }}>
            <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fafafa', mb: 2, borderRadius: 0 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: '#4caf50' }}>
                Payment Successful
              </Typography>
              <Typography variant="body1">
                Your payment has been successfully processed. Your certificate is waiting for final approval.
              </Typography>
            </Paper>
          </Box>
        );
      }
    }
    return (
      <Box sx={{ flexBasis: '50%', p: 1 }}>
        <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fafafa', mb: 2, borderRadius: 0 }}>
          <Typography variant="body1">No payment status information available.</Typography>
        </Paper>
      </Box>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ width: 250, borderRight: 1, borderColor: 'divider', backgroundColor: '#f5f5f5' }}>
          <Tabs
            orientation="vertical"
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="vertical tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab
              label="Application status"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                minWidth: 250,
                width: 250,
                height: 70,
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                borderBottom: '1px solid #ddd',
                backgroundColor: tabIndex === 0 ? '#e0e0e0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            />
            <Tab
              label="Course outline"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                minWidth: 250,
                width: 250,
                height: 70,
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                borderBottom: '1px solid #ddd',
                backgroundColor: tabIndex === 1 ? '#e0e0e0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            />
            <Tab
              label="Time table"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                minWidth: 250,
                width: 250,
                height: 70,
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                borderBottom: '1px solid #ddd',
                backgroundColor: tabIndex === 2 ? '#e0e0e0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            />
            <Tab
              label="Venue"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                minWidth: 250,
                width: 250,
                height: 70,
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                borderBottom: '1px solid #ddd',
                backgroundColor: tabIndex === 3 ? '#e0e0e0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            />
            <Tab
              label="Tutors"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                minWidth: 250,
                width: 250,
                height: 70,
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                borderBottom: '1px solid #ddd',
                backgroundColor: tabIndex === 4 ? '#e0e0e0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            />
            <Tab
              label="Learning materials"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                minWidth: 250,
                width: 250,
                height: 70,
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                borderBottom: '1px solid #ddd',
                backgroundColor: tabIndex === 5 ? '#e0e0e0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            />
            <Tab
              label="Requirements"
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                minWidth: 250,
                width: 250,
                height: 70,
                justifyContent: 'flex-start',
                textAlign: 'left',
                textTransform: 'none',
                borderBottom: '1px solid #ddd',
                backgroundColor: tabIndex === 6 ? '#e0e0e0' : 'transparent',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                },
                '&.Mui-selected': {
                  backgroundColor: '#e0e0e0',
                },
              }}
            />
          </Tabs>
        </Box>

        <Box sx={{ flexGrow: 1, p: 3 }}>
          {tabIndex === 0 && (
            <>
              {renderApplicationTab()}
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {application && renderPaymentDetails()}
                {application && renderPaymentInstructions()}
              </Box>
            </>
          )}
          {tabIndex === 1 && <CourseOutline />}
          {tabIndex === 2 && <TimeTable />}
          {tabIndex === 3 && <Venue />}
          {tabIndex === 4 && <Tutors />}
          {tabIndex === 5 && <LearningMaterials />}
          {tabIndex === 6 && <Requirements />}
        </Box>
      </Box>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Box>
  );
};

export default ApplicationPage;
