import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Business as BusinessIcon } from '@mui/icons-material';
import { fetchImages } from '../../services/api';

const CompanyShowcase = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const response = await fetchImages();
      
      // Transform the response to match our needs
      // Assuming the API returns an array of image objects
      if (Array.isArray(response)) {
        setCompanies(response);
      } else if (response.images && Array.isArray(response.images)) {
        setCompanies(response.images);
      } else {
        // Fallback: create dummy data if API doesn't return expected format
        setCompanies([
          {
            id: 1,
            name: 'Tech Innovations Inc.',
            image: 'https://via.placeholder.com/400x300?text=Tech+Innovations',
          },
          {
            id: 2,
            name: 'Digital Solutions Ltd.',
            image: 'https://via.placeholder.com/400x300?text=Digital+Solutions',
          },
          {
            id: 3,
            name: 'Creative Agency Co.',
            image: 'https://via.placeholder.com/400x300?text=Creative+Agency',
          },
          {
            id: 4,
            name: 'Global Enterprises',
            image: 'https://via.placeholder.com/400x300?text=Global+Enterprises',
          },
          {
            id: 5,
            name: 'Future Systems',
            image: 'https://via.placeholder.com/400x300?text=Future+Systems',
          },
          {
            id: 6,
            name: 'Smart Technologies',
            image: 'https://via.placeholder.com/400x300?text=Smart+Technologies',
          },
        ]);
      }
      setError('');
    } catch (err) {
      console.error('Error fetching companies:', err);
      setError('Failed to load company images. Showing placeholder data.');
      
      // Show placeholder data on error
      setCompanies([
        {
          id: 1,
          name: 'Tech Innovations Inc.',
          image: 'https://via.placeholder.com/400x300?text=Tech+Innovations',
        },
        {
          id: 2,
          name: 'Digital Solutions Ltd.',
          image: 'https://via.placeholder.com/400x300?text=Digital+Solutions',
        },
        {
          id: 3,
          name: 'Creative Agency Co.',
          image: 'https://via.placeholder.com/400x300?text=Creative+Agency',
        },
        {
          id: 4,
          name: 'Global Enterprises',
          image: 'https://via.placeholder.com/400x300?text=Global+Enterprises',
        },
        {
          id: 5,
          name: 'Future Systems',
          image: 'https://via.placeholder.com/400x300?text=Future+Systems',
        },
        {
          id: 6,
          name: 'Smart Technologies',
          image: 'https://via.placeholder.com/400x300?text=Smart+Technologies',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Company Showcase
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Explore Our Partner Companies
        </Typography>
      </Box>

      {error && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {companies.map((company, index) => (
            <Grid item xs={12} sm={6} md={4} key={company.id || index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={company.image || company.url || `https://via.placeholder.com/400x300?text=Company+${index + 1}`}
                  alt={company.name || company.filename || `Company ${index + 1}`}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1,
                    }}
                  >
                    <BusinessIcon sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" component="h3">
                      {company.name || company.filename || `Company ${index + 1}`}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {company.description || 'Leading company in the industry'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && companies.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            backgroundColor: 'grey.100',
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No companies available at the moment
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default CompanyShowcase;

