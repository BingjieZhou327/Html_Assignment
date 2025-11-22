import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  Button,
  Chip,
} from '@mui/material';
import { Work as WorkIcon, Add as AddIcon } from '@mui/icons-material';
import { getAllJobs } from '../../redux/slices/jobsSlice';

const AdminJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobsList, loading, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  const handleAddJob = () => {
    navigate('/admin/add-job');
  };

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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography
              variant="h3"
              component="h1"
              sx={{ fontWeight: 'bold', color: 'primary.main' }}
            >
              Job Management
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddJob}
            size="large"
          >
            Add New Job
          </Button>
        </Box>
        <Typography variant="h6" color="text.secondary" paragraph>
          View and manage all job postings
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
                  Company
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                  Job Title
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                  Description
                </TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>
                  Salary
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobsList && jobsList.length > 0 ? (
                jobsList.map((job, index) => (
                  <TableRow
                    key={job.id || index}
                    sx={{
                      '&:nth-of-type(odd)': { backgroundColor: 'grey.50' },
                      '&:hover': { backgroundColor: 'primary.light' },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {job.companyName || job.company || 'N/A'}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>
                      {job.jobTitle || job.title || 'N/A'}
                    </TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      {job.description ? (
                        job.description.length > 100
                          ? `${job.description.substring(0, 100)}...`
                          : job.description
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={`$${job.salary ? job.salary.toLocaleString() : '0'}`}
                        color="success"
                        size="small"
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No jobs found
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
          Total Jobs: {jobsList?.length || 0}
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminJobs;

