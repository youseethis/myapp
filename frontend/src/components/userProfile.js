import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card, CardContent, Typography } from '@mui/material';

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  if (!user) {
    return <Typography variant="h5">User not found</Typography>;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            User Profile
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Name: {user.Fname} {user.Lname}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Gender: {user.gender}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Phone: {user.Phone}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Email: {user.credentials.email}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Created At: {new Date(user.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
