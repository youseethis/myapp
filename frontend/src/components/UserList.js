import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Spinner } from 'react-bootstrap';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Pagination from '@mui/material/Pagination';
import * as XLSX from 'xlsx'; // Import the xlsx library
import DraggableModal from './DraggableModal';
import DeleteModal from './DeleteModal';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { format } from 'date-fns'; // Import date-fns for date formatting

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initial loading state is true
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users per page
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsersAndHistorysets = async () => {
    try {
      setLoading(true); // Set loading to true before the API call
      const [usersResponse, historysetsResponse] = await Promise.all([
        axios.get('/users'),
        axios.get('/historyset'),
      ]);

      const users = usersResponse.data;
      const historysets = historysetsResponse.data;

      // Join users with their historyset
      const usersWithHistoryset = users.map(user => {
        const historyset = historysets.find(h => h.userID === user._id);
        return { ...user, histoset: historyset ? historyset.histoset : 'N/A' };
      });

      setUsers(usersWithHistoryset);
      setFilteredUsers(usersWithHistoryset);
    } catch (error) {
      console.error('Error fetching users and historysets:', error);
    } finally {
      setLoading(false); // Set loading to false after the data is fetched
    }
  };

  useEffect(() => {
    fetchUsersAndHistorysets();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = users.filter(user =>
      user.Fname.toLowerCase().includes(lowercasedFilter) ||
      user.Lname.toLowerCase().includes(lowercasedFilter) ||
      user.gender.toLowerCase().includes(lowercasedFilter) ||
      user.Phone.toLowerCase().includes(lowercasedFilter) ||
      user.credentials.email.toLowerCase().includes(lowercasedFilter)
    );
    setFilteredUsers(filteredData);
  }, [searchTerm, users]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewClick = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleDeleteConfirm = (user) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  const handleAddUserClick = () => {
    setAddModalOpen(true);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleClose = () => {
    setViewModalOpen(false);
    setDeleteModalOpen(false);
    setAddModalOpen(false);
    setEditModalOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`/users/${selectedUser._id}`);
      if (response.status === 200) {
        toast.success('User deleted successfully');
        fetchUsersAndHistorysets();
      } else {
        toast.error('Failed to delete user');
      }
      handleClose();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (user) => {
    setLoading(true);
    try {
      const unhashedPassword = user.credentials.password;

      const userToAdd = {
        ...user,
        credentials: {
          ...user.credentials,
          password: unhashedPassword,
        },
      };

      const response = await axios.post('/users', userToAdd, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201 || response.status === 200) {
        const newUser = response.data; // Get the newly added user data
        const historysetData = {
          histoset: 'na',
          userID: newUser._id,
        };

        // Add entry to the Historyset model
        const historysetResponse = await axios.post('/historyset', historysetData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (historysetResponse.status === 201 || historysetResponse.status === 200) {
          toast.success('User and historyset added successfully');
        } else {
          toast.error('User added but failed to add historyset');
        }

        fetchUsersAndHistorysets();
      } else {
        toast.error('Failed to add user');
      }
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            if (error.response.data.error && error.response.data.error.includes('E11000 duplicate key error')) {
              toast.error('This email is already registered. Please use a different email.');
            } else {
              toast.error(`Failed to add user: ${error.response.data.error || 'Bad request'}`);
            }
            break;
          case 401:
            toast.error('Unauthorized. Please log in and try again.');
            break;
          case 403:
            toast.error('Forbidden. You do not have permission to perform this action.');
            break;
          case 404:
            toast.error('Not found. The requested resource could not be found.');
            break;
          case 500:
            toast.error('Internal server error. Please try again later.');
            break;
          default:
            toast.error(`An error occurred: ${error.response.statusText}`);
        }
      } else {
        toast.error('Failed to add user: An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (updatedUser) => {
    setLoading(true);
    try {
      if (updatedUser.credentials && updatedUser.credentials.password) {
        const unhashedPassword = updatedUser.credentials.password;
        updatedUser = {
          ...updatedUser,
          credentials: {
            ...updatedUser.credentials,
            password: unhashedPassword,
          },
        };
      }

      await new Promise(resolve => setTimeout(resolve, 2000));

      const response = await axios.patch(`/users/${selectedUser._id}`, updatedUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        toast.success('User updated successfully');
        fetchUsersAndHistorysets();
      } else {
        toast.error('Failed to update user');
      }
      handleClose();
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsers.map((user, index) => ({
      No: index + 1,
      Name: `${user.Fname} ${user.Lname}`,
      Gender: user.gender,
      'Phone no': user.Phone,
      'Email': user.credentials.email,
      'Histoset': user.histoset,
      'Created At': format(new Date(user.createdAt), "EEEE, dd MMMM yyyy, hh:mm a"), // Format the createdAt field
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
    XLSX.writeFile(workbook, 'Users.xlsx');
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div id="userTable">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Button variant="contained" color="primary" onClick={handleAddUserClick} startIcon={<AddIcon />}>
          Add User
        </Button>
        <Button variant="contained" color="secondary" onClick={handleExport} style={{ marginLeft: '10px' }}>
          Export to Excel
        </Button>
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ width: '300px' }}
        />
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Phone no</th>
                <th>Email Address</th>
                <th>Histoset</th>
                <th>Created</th>
                <th>View</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{indexOfFirstUser + index + 1}</td>
                  <td>{user.Fname} {user.Lname}</td>
                  <td>{user.gender}</td>
                  <td>{user.Phone}</td>
                  <td>{user.credentials.email}</td>
                  <td>{user.histoset}</td> {/* Display the histoset */}
                  <td>{format(new Date(user.createdAt), "EEEE, dd MMMM yyyy, hh:mm a")}</td> {/* Format the createdAt field */}
                  <td>
                    <IconButton onClick={() => handleViewClick(user)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton onClick={() => handleEditClick(user)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton onClick={() => handleDeleteConfirm(user)} color="primary">
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            count={Math.ceil(filteredUsers.length / usersPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            className="d-flex justify-content-center mt-3"
          />
        </>
      )}
      {selectedUser && (
        <DraggableModal open={viewModalOpen} onClose={handleClose} userId={selectedUser._id}>
          <div>
            <p><strong>Name:</strong> {selectedUser.Fname} {selectedUser.Lname}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><strong>Phone:</strong> {selectedUser.Phone}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
          </div>
        </DraggableModal>
      )}
      {selectedUser && (
        <DeleteModal open={deleteModalOpen} onClose={handleClose} onDelete={handleDeleteUser} loading={loading}>
          <div>
            <p><strong>Name:</strong> {selectedUser.Fname} {selectedUser.Lname}</p>
            <p><strong>Gender:</strong> {selectedUser.gender}</p>
            <p><strong>Phone:</strong> {selectedUser.Phone}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
          </div>
        </DeleteModal>
      )}
      {selectedUser && (
        <EditUserModal open={editModalOpen} onClose={handleClose} user={selectedUser} onEditUser={handleEditUser} loading={loading} />
      )}
      <AddUserModal open={addModalOpen} onClose={handleClose} onAddUser={handleAddUser} loading={loading} />
      <ToastContainer />
    </div>
  );
};

export default UserList;
