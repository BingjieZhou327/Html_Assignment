import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Home = () => {
  const features = [
    {
      icon: <WorkIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Browse Jobs',
      description: 'Explore hundreds of job opportunities from top companies',
      link: '/jobs',
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Company Profiles',
      description: 'Discover companies and their work culture',
      link: '/companies',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Career Growth',
      description: 'Find positions that match your career aspirations',
      link: '/jobs',
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Professional Network',
      description: 'Connect with industry professionals and recruiters',
      link: '/contact',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Welcome to Job Portal
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Your Gateway to Career Success
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Discover exciting job opportunities, connect with leading companies,
          and take the next step in your career journey.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            component={Link}
            to="/jobs"
            variant="contained"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            Browse Jobs
          </Button>
          <Button
            component={Link}
            to="/companies"
            variant="outlined"
            size="large"
            sx={{ px: 4, py: 1.5 }}
          >
            View Companies
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Button
                  component={Link}
                  to={feature.link}
                  variant="text"
                  size="small"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, p: 4, backgroundColor: 'grey.100', borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Why Choose Us?
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Trusted by Thousands
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join thousands of job seekers who have found their dream careers
              through our platform.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Top Companies
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access exclusive job postings from leading companies across
              various industries.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Easy Application
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Simple and streamlined application process to help you apply
              quickly and efficiently.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;

