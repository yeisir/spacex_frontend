import React, { useEffect, useState } from 'react';
import { Typography, Box, Grid, Paper } from '@mui/material';
import { Rocket, CheckCircle, Cancel, ArrowForward } from '@mui/icons-material';
import axios from 'axios';

// Componente reutilizable para cada resumen
const SummaryItem = ({ icon: Icon, color, count, label }) => (
  <Grid item>
    <Box display="flex" alignItems="center" justifyContent="flex-start" sx={{ marginLeft: 2 }}>
      <Icon fontSize="large" sx={{ color, marginRight: 5 }} />
      <Box>
        <Typography variant="h4" sx={{ textAlign: 'center' }}>{count}</Typography>
        <Typography variant="body1" sx={{ textAlign: 'center' }}>{label}</Typography>
      </Box>
    </Box>
  </Grid>
);

const SummarySection = () => {
  const [launchData, setLaunchData] = useState({
    total: 0,
    success: 0,
    failed: 0,
    upcoming: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ec2-3-147-69-118.us-east-2.compute.amazonaws.com:3001/api/launches');
        const launches = response.data;

        // Contar los lanzamientos por estado
        const success = launches.filter(l => l.status === 'success').length;
        const failed = launches.filter(l => l.status === 'failed').length;
        const upcoming = launches.filter(l => l.status === 'upcoming').length;

        setLaunchData({
          total: launches.length,
          success,
          failed,
          upcoming,
        });
      } catch (error) {
        console.error('Error al obtener los datos de lanzamientos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ padding: 3, backgroundColor: "#1e274b", color: "#fff" }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 'bold',
          fontFamily: 'Roboto, sans-serif',
          fontSize: '24px',
          textAlign: 'center'
        }}
      >
        Summary of launches over the years.
      </Typography>

      <Box mt={2}>
        <Grid container direction="column" spacing={2}>
          <SummaryItem icon={Rocket} color="primary" count={launchData.total} label="Total Launches" />
          <SummaryItem icon={CheckCircle} color="success.main" count={launchData.success} label="Success Launches" />
          <SummaryItem icon={Cancel} color="error.main" count={launchData.failed} label="Failed Launches" />
          <SummaryItem icon={ArrowForward} color="warning.main" count={launchData.upcoming} label="Upcoming Launches" />
        </Grid>
      </Box>
    </Paper>
  );
};

export default SummarySection;
