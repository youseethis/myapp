import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainAppBar from './components/MainAppBar';
import MainSideBar from './components/MainSideBar';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { AuthContext } from './context/AuthContext';
import UserProfile from './components/userProfile';
import Application from './pages/ApplicationPage';
import AdminDashboard from './components/AdminDashboard';
import { ApplicationContextProvider } from './context/ApplicationContext'; // Import ApplicationContextProvider
import ApplicationFooter from './components/ApplicationFooter';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
       <ApplicationContextProvider>
      <div>
        <MainAppBar />
        <div className="Flex">
          {user ? <MainSideBar /> : ""}
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  user.histoset === 'na' ? (
                    <>
                      {console.log('histoset value:', user.histoset)}
                      <AdminDashboard />
                    </>
                  ) : (
                    <>
                      {console.log('histoset value:', user.histoset)}
                      {console.log('historysetID value:', user.historysetId)}
                      <Application />
                    </>
                  )
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage />}
            />
            <Route
              path="/AdminDashboard"
              element={user ? <AdminDashboard /> : <LoginPage />}
            />
            <Route
              path="/Users"
              element={user ? <UserList /> : <LoginPage />}
            />
            <Route
              path="/AddUser"
              element={user ? <UserForm /> : <LoginPage />}
            />
            <Route
              path="/UserProfile/:userId"
              element={user ? <UserProfile /> : <LoginPage />}
            />
            <Route
              path="/application"
              element={user ? <Application /> : <LoginPage />}
            />
          </Routes>
        </div>
      </div>
      {user && <ApplicationFooter />}
      </ApplicationContextProvider>
    </Router>
  );
}

export default App;
