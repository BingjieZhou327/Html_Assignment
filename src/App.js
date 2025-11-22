import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';

// Components
import Navbar from './components/Navbar/Navbar';
import RoleBasedRoute from './components/RoleBasedRoute/RoleBasedRoute';

// Pages - Employee
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import JobListings from './pages/JobListings/JobListings';
import Contact from './pages/Contact/Contact';
import CompanyShowcase from './pages/CompanyShowcase/CompanyShowcase';

// Pages - Admin
import Employees from './pages/Admin/Employees';
import AddJob from './pages/Admin/AddJob';
import AdminJobs from './pages/Admin/AdminJobs';

import './App.css';

// Create Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#e3f2fd',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes */}
            <Route
              path="/admin/employees"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <Employees />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/jobs"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AdminJobs />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/admin/add-job"
              element={
                <RoleBasedRoute allowedRoles={['admin']}>
                  <AddJob />
                </RoleBasedRoute>
              }
            />

            {/* Employee Routes */}
            <Route
              path="/home"
              element={
                <RoleBasedRoute allowedRoles={['employee']}>
                  <Home />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/about"
              element={
                <RoleBasedRoute allowedRoles={['employee']}>
                  <About />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/jobs"
              element={
                <RoleBasedRoute allowedRoles={['employee']}>
                  <JobListings />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/contact"
              element={
                <RoleBasedRoute allowedRoles={['employee']}>
                  <Contact />
                </RoleBasedRoute>
              }
            />
            <Route
              path="/companies"
              element={
                <RoleBasedRoute allowedRoles={['employee']}>
                  <CompanyShowcase />
                </RoleBasedRoute>
              }
            />

            {/* Default Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

