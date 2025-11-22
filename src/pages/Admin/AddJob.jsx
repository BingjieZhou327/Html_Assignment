import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Grid,
} from '@mui/material';
import { AddCircle as AddIcon, Work as WorkIcon } from '@mui/icons-material';
import { addNewJob, resetCreateStatus } from '../../redux/slices/jobsSlice';

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { createLoading, createError, createSuccess } = useSelector((state) => state.jobs);

  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    salary: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset create status when component mounts
    dispatch(resetCreateStatus());
  }, [dispatch]);

  useEffect(() => {
    // Redirect to jobs list after successful creation
    if (createSuccess) {
      setTimeout(() => {
        navigate('/admin/jobs');
      }, 2000);
    }
  }, [createSuccess, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Job title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.salary.trim()) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || Number(formData.salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await dispatch(
        addNewJob({
          companyName: formData.companyName,
          jobTitle: formData.jobTitle,
          description: formData.description,
          salary: Number(formData.salary),
        })
      ).unwrap();

      // Clear form
      setFormData({
        companyName: '',
        jobTitle: '',
        description: '',
        salary: '',
      });
    } catch (err) {
      console.error('Failed to create job:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <WorkIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography
            variant="h3"
            component="h1"
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Add New Job
          </Typography>
        </Box>
        <Typography variant="h6" color="text.secondary" paragraph>
          Create a new job posting
        </Typography>
      </Box>

      {createSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Job created successfully! Redirecting...
        </Alert>
      )}

      {createError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {createError}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                error={!!errors.companyName}
                helperText={errors.companyName}
                disabled={createLoading}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                error={!!errors.jobTitle}
                helperText={errors.jobTitle}
                disabled={createLoading}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                disabled={createLoading}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                error={!!errors.salary}
                helperText={errors.salary}
                disabled={createLoading}
                type="number"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                startIcon={createLoading ? <CircularProgress size={20} /> : <AddIcon />}
                disabled={createLoading}
                sx={{ py: 1.5 }}
              >
                {createLoading ? 'Creating Job...' : 'Create Job'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddJob;

