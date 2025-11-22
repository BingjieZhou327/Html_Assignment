import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadAuthFromStorage } from '../../redux/slices/authSlice';
import { Box, CircularProgress } from '@mui/material';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, userType, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    // Load auth from storage if not already loaded
    if (!isAuthenticated && !loading) {
      dispatch(loadAuthFromStorage());
    }
  }, [dispatch, isAuthenticated, loading]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user type doesn't match allowed roles, redirect appropriately
  if (allowedRoles && !allowedRoles.includes(userType)) {
    // Redirect to appropriate home page based on user type
    if (userType === 'admin') {
      return <Navigate to="/admin/employees" replace />;
    } else if (userType === 'employee') {
      return <Navigate to="/home" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RoleBasedRoute;

