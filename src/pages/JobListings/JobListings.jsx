import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import JobCard from '../../components/JobCard/JobCard';
import { getAllJobs } from '../../redux/slices/jobsSlice';

const JobListings = () => {
  const dispatch = useDispatch();
  const { jobsList, loading, error } = useSelector((state) => state.jobs);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  const filteredJobs = jobsList.filter(
    (job) =>
      (job.jobTitle || job.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.companyName || job.company || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Job Listings
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Discover Your Next Career Opportunity
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search jobs by title, description, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mt: 2, backgroundColor: 'white' }}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          Showing {filteredJobs.length} of {jobsList.length} jobs
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>

      {filteredJobs.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            backgroundColor: 'grey.100',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No jobs found matching your search criteria
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your search terms
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default JobListings;

