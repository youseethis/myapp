// frontend\src\components\handleApprove.js
import axios from 'axios';

const handleApprove = async (applicationId) => {
  try {
    const response = await axios.patch(`http://localhost:4000/api/applications/${applicationId}`, {
      status: 'approved',
    });
    return response.data; // Return the updated application data if needed
  } catch (error) {
    console.error('Failed to approve application:', error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};

export default handleApprove;

