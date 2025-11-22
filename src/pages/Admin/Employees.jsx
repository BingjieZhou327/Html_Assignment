import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';
import { getAllUsers } from '../../redux/slices/usersSlice';

const Employees = () => {
  const dispatch = useDispatch();
  const { usersList, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <PeopleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Employee Management
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" paragraph>
          View and manage all registered users
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: 'primary.main' }}>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                  #
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                  Email
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                  User Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList && usersList.length > 0 ? (
                usersList.map((user, index) => (
                  <TableRow
                    key={user.id || index}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: 'grey.50' },
                      '&:hover': { backgroundColor: 'primary.light' },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {user.name || user.username || 'N/A'}
                    </TableCell>
                    <TableCell>{user.email || 'N/A'}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.type || 'employee'}
                        color={user.type === 'admin' ? 'primary' : 'success'}
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="text.secondary">
          Total Users: {usersList?.length || 0}
        </Typography>
      </Box>
    </Container>
  );
};

export default Employees;

