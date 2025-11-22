import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Chip,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  ContactMail as ContactIcon,
  Business as BusinessIcon,
  Logout as LogoutIcon,
  People as PeopleIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { logout, loadAuthFromStorage } from '../../redux/slices/authSlice';
import { clearSession } from '../../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { isAuthenticated, userType, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Load auth from storage on mount
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  const handleLogout = () => {
    clearSession();
    dispatch(logout());
    navigate('/login');
  };

  // Admin navigation items
  const adminNavItems = [
    { path: '/admin/employees', label: 'Employees', icon: <PeopleIcon /> },
    { path: '/admin/jobs', label: 'Jobs', icon: <WorkIcon /> },
    { path: '/admin/add-job', label: 'Add Job', icon: <AddIcon /> },
  ];

  // Employee navigation items
  const employeeNavItems = [
    { path: '/home', label: 'Home', icon: <HomeIcon /> },
    { path: '/about', label: 'About', icon: <InfoIcon /> },
    { path: '/jobs', label: 'Job Listings', icon: <WorkIcon /> },
    { path: '/contact', label: 'Contact', icon: <ContactIcon /> },
    { path: '/companies', label: 'Companies', icon: <BusinessIcon /> },
  ];

  const navItems = userType === 'admin' ? adminNavItems : employeeNavItems;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <WorkIcon sx={{ mr: 1 }} />
            Job Portal
            {userType && (
              <Chip
                label={userType === 'admin' ? 'Admin' : 'Employee'}
                color={userType === 'admin' ? 'secondary' : 'success'}
                size="small"
                sx={{ ml: 2, fontWeight: 'bold' }}
              />
            )}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {user && (
              <Typography variant="body2" sx={{ mr: 2, color: 'white' }}>
                {user.username || user.name || 'User'}
              </Typography>
            )}
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                startIcon={item.icon}
                sx={{
                  backgroundColor:
                    location.pathname === item.path
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                ml: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;

