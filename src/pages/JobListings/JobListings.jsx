import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import JobCard from '../../components/JobCard/JobCard';
import jobPosts from '../../data/jobPosts';

const JobListings = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobPosts.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          placeholder="Search jobs by title or description..."
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
          Showing {filteredJobs.length} of {jobPosts.length} jobs
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

