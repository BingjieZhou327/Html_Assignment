import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import {
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';

const JobCard = ({ job }) => {
  const title = job.jobTitle || job.title || 'Untitled Position';
  const company = job.companyName || job.company || 'Company';
  const description = job.description || 'No description available';
  const salary = job.salary || null;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom color="primary">
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <BusinessIcon sx={{ fontSize: 18, mr: 1, color: 'text.secondary' }} />
          <Typography variant="subtitle2" color="text.secondary">
            {company}
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          paragraph
          sx={{ minHeight: '80px' }}
        >
          {description.length > 150 ? `${description.substring(0, 150)}...` : description}
        </Typography>
        {salary && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Chip
              icon={<MoneyIcon />}
              label={`$${salary.toLocaleString()}`}
              color="success"
              size="small"
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
        )}
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          size="small"
          variant="contained"
          endIcon={<OpenInNewIcon />}
          href={job.applyLink || '#'}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
        >
          Apply Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default JobCard;

