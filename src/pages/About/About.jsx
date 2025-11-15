import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Divider,
} from '@mui/material';
import {
  Visibility as VisionIcon,
  EmojiObjects as MissionIcon,
  Star as ValueIcon,
} from '@mui/icons-material';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          About Job Portal
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Connecting Talent with Opportunity
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Job Portal was founded with a simple mission: to make job searching
          easier and more efficient for everyone. We understand that finding the
          right job can be challenging, and we're here to help bridge the gap
          between talented professionals and companies looking for the best
          candidates.
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Our platform brings together job seekers and employers in a seamless,
          user-friendly environment. Whether you're a recent graduate looking for
          your first opportunity or an experienced professional seeking new
          challenges, we have something for everyone.
        </Typography>
      </Paper>

      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              textAlign: 'center',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <VisionIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Our Vision
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              To become the leading job portal that empowers individuals to find
              meaningful careers and helps companies build exceptional teams.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              textAlign: 'center',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <MissionIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              To simplify the job search process by providing a comprehensive
              platform that connects qualified candidates with their ideal
              employers.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              height: '100%',
              textAlign: 'center',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              },
            }}
          >
            <ValueIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Our Values
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Integrity, innovation, and inclusivity guide everything we do. We
              believe in creating opportunities for everyone, regardless of
              background.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 4, backgroundColor: 'primary.light' }}>
        <Typography variant="h5" gutterBottom>
          What We Offer
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              For Job Seekers
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  Access to diverse job opportunities
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Detailed company profiles and insights
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Easy application process
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Career resources and guidance
                </Typography>
              </li>
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              For Employers
            </Typography>
            <ul>
              <li>
                <Typography variant="body2">
                  Access to qualified candidates
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Streamlined recruitment process
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Company branding opportunities
                </Typography>
              </li>
              <li>
                <Typography variant="body2">
                  Analytics and reporting tools
                </Typography>
              </li>
            </ul>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default About;

