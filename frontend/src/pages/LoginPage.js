import { Container, Paper, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>
        <LoginForm />
      </Paper>
    </Container>
  );
};

export default LoginPage
