// frontend/src/components/ApplicationTabs/handlePay.js
import axios from 'axios';
import { toast } from 'react-toastify';

export const handlePay = async (paymentId, applicationDispatch) => {
  try {
    const response = await axios.patch(`http://localhost:4000/api/payments/${paymentId}`, {
      paymentStatus: 'completed',
    });

    if (response.status === 200) {
      toast.success('Payment completed');

      // Update the payment status in the ApplicationContext
      applicationDispatch({
        type: 'SET_PAYMENT_STATUS',
        payload: response.data, // Assuming response.data contains the updated payment object
      });

      // Update local storage
      localStorage.setItem('paymentStatus', JSON.stringify(response.data));
    } else {
      throw new Error('Failed to update payment status');
    }
  } catch (error) {
    console.error('Error updating payment status:', error);
    toast.error('Failed to update payment status');
  }
};
