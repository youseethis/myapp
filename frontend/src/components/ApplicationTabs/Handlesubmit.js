// frontend/src/components/ApplicationTabs/handleSubmit.js
import axios from 'axios';
import { toast } from 'react-toastify';

export const handleSubmit = async ({
  user,
  attendedCourse,
  specifyYear,
  certificateNo,
  uploadedFile,
  setLoading,
  setError,
  dispatch, // Auth dispatch function
  applicationDispatch // Application context dispatch function
}) => {
  console.log('Handle submit Dispatch is a function:', typeof dispatch === 'function'); // Should now be true

  setLoading(true);
  setError(null);

  try {
    // Fetch the current season
    const seasonsResponse = await axios.get('http://localhost:4000/api/seasons');
    const currentSeason = seasonsResponse.data.find((season) => season.seasonstatus === 'current');

    if (!currentSeason) {
      toast.error('No current season found.');
      setLoading(false);
      return;
    }

    // Step 1: Create application entry
    const applicationData = {
      userID: user._id,
      status: 'pending',
      season_ID: currentSeason._id, // Use the current season ID
    };

    const appResponse = await axios.post('http://localhost:4000/api/applications', applicationData);
    console.log('Application created:', appResponse.data);
    toast.success('Application created successfully.');

    // Store application in local storage and dispatch
    localStorage.setItem('application', JSON.stringify(appResponse.data));
    applicationDispatch({ type: 'SET_APPLICATION', payload: appResponse.data });

    const applicationID = appResponse.data._id; // Get the application ID from the response

    // Step 2: Create payment entry
    const paymentData = {
      paymentStatus: 'pending',
      amount: 50000, // Example amount
      applicationID: applicationID, // Use the application ID from the created application
    };

    console.log('Sending payment data:', paymentData); // Log payment data being sent

    const paymentResponse = await axios.post('http://localhost:4000/api/payments', paymentData);
    console.log('Payment created:', paymentResponse.data);
    toast.success('Payment created successfully.');

    // Store payment status in local storage and dispatch
    localStorage.setItem('paymentStatus', JSON.stringify(paymentResponse.data));
    applicationDispatch({ type: 'SET_PAYMENT_STATUS', payload: paymentResponse.data });

    // Step 3: If attendedCourse is "yes", handle certification data
    if (attendedCourse === 'yes') {
      try {
        // Upload the file first
        const formData = new FormData();
        formData.append('file', uploadedFile);

        const fileResponse = await axios.post('http://localhost:4000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (fileResponse.status === 200) {
          // Log success message if the upload was successful
          console.log('File uploaded successfully:', fileResponse.data.filePath);
          toast.success('File uploaded successfully.');

          // Set certifieds and historyset
          const filePath = fileResponse.data.filePath;
          const certifiedData = {
            year: specifyYear,
            certificateNo: certificateNo,
            userID: user._id,
            filePath: filePath, // Include the uploaded file path
          };
          console.log('Certified Data:', certifiedData);

          const certResponse = await axios.post('http://localhost:4000/certifieds', certifiedData);

          if (certResponse.status === 200) {
            console.log('Certified data posted successfully:', certResponse.data);
            toast.success('Certified data posted successfully.');

            // Store certified data in local storage and dispatch
            localStorage.setItem('certified', JSON.stringify(certResponse.data));
            applicationDispatch({ type: 'SET_CERTIFIED', payload: certResponse.data });
          } else {
            console.log('Certified data post failed:', certResponse.status);
            toast.error('Certified data post failed.');
          }

          // Update the histoset in the historyset model
          console.log('Historyset ID:', user.historysetId);
          console.log('User object:', user);

          const historysetResponse = await axios.patch(
            `http://localhost:4000/historyset/${user.historysetId}`,
            {
              histoset: 'set',
            }
          );

          if (historysetResponse.status === 200) {
            console.log('Historyset updated successfully:', historysetResponse.data);
            toast.success('Historyset updated successfully.');

            // Store historyset data in local storage and dispatch
            localStorage.setItem('historyset', JSON.stringify(historysetResponse.data));
            applicationDispatch({ type: 'SET_HISTORYSET', payload: historysetResponse.data });

            // Update histoset in local storage and auth context
            const updatedUser = { ...user, histoset: 'set' };
            localStorage.setItem('userDetails', JSON.stringify(updatedUser));
            dispatch({ type: 'LOGIN', payload: updatedUser });
          } else {
            console.log('Error updating historyset:', historysetResponse.status);
            toast.error('Error updating historyset.');
          }
        } else {
          // Log failure message if the upload did not return a 200 status
          console.log('File upload failed with status:', fileResponse.status);
          toast.error('File upload failed.');
        }
      } catch (error) {
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
        toast.error('Error uploading file.');
      }
    }
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    setError('There was an error submitting the application and payment.');
    toast.error('Error submitting the application and payment.');
  } finally {
    setLoading(false);
  }
};
