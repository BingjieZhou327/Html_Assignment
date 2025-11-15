import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Work as WorkIcon,
  ContactMail as ContactIcon,
  Business as BusinessIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { clearSession, isAuthenticated } from '../../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  const navItems = [
    { path: '/home', label: 'Home', icon: <HomeIcon /> },
    { path: '/about', label: 'About', icon: <InfoIcon /> },
    { path: '/jobs', label: 'Job Listings', icon: <WorkIcon /> },
    { path: '/contact', label: 'Contact', icon: <ContactIcon /> },
    { path: '/companies', label: 'Companies', icon: <BusinessIcon /> },
  ];

  if (!authenticated) {
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
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
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

