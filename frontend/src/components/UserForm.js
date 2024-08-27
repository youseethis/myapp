import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    Fname: '',
    Lname: '',
    gender: '',
    Phone: '',
    email: '',
    address: '',
    credentials: {
      email: '',
      password: ''
    }
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('credentials.')) {
      const credentialsField = name.split('.')[1];
      setFormData((prevFormData) => ({
        ...prevFormData,
        credentials: {
          ...prevFormData.credentials,
          [credentialsField]: value
        }
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users', formData);
      console.log(response.data);
      toast.success('User created successfully!');

      // Clear form or show success message
      setFormData({
        Fname: '',
        Lname: '',
        gender: '',
        Phone: '',
        email: '',
        address: '',
        credentials: {
          email: '',
          password: ''
        }
      });
      setError(null);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="Fname" className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                id="Fname"
                name="Fname"
                value={formData.Fname}
                onChange={handleChange}
                placeholder="Enter first name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Lname" className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="Lname"
                name="Lname"
                value={formData.Lname}
                onChange={handleChange}
                placeholder="Enter last name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender</label>
              <input
                type="text"
                className="form-control"
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                placeholder="Enter gender"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Phone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                id="Phone"
                name="Phone"
                value={formData.Phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="credentialsEmail" className="form-label">Credentials Email</label>
              <input
                type="email"
                className="form-control"
                id="credentialsEmail"
                name="credentials.email"
                value={formData.credentials.email}
                onChange={handleChange}
                placeholder="Enter credentials email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="credentialsPassword" className="form-label">Credentials Password</label>
              <input
                type="password"
                className="form-control"
                id="credentialsPassword"
                name="credentials.password"
                value={formData.credentials.password}
                onChange={handleChange}
                placeholder="Enter credentials password"
              />
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error.error}</div>}
        <button type="submit" className="btn btn-primary">Create User</button>
      </form>
    </div>
  );
};

export default UserForm;
