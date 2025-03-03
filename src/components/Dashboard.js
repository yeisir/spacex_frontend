import React from 'react';
import SummarySection from './SummarySection';
import RecoveryAttemptsChart from './BarChart';
import TimeChartComponent from './TimeChart';
import { Container, Grid, Paper, Typography } from '@mui/material';
import TopBar from './TopBar';

const Dashboard = () => {
  return (
    <div>
      <TopBar />
      <Container maxWidth="lg" sx={{ padding: 3 }}>
        <Grid container spacing={3}>
          {/* Fila con BarChart primero */}
          <Grid container item spacing={3} xs={12} md={12}>
            <Grid item xs={12}>
              <Paper sx={{ padding: 2 }}>
                <TimeChartComponent />
              </Paper>
            </Grid>
          </Grid>

          {/* Fila con Summary y PieChart */}
          <Grid container item spacing={3} xs={12} md={8}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, backgroundColor: '#161a29' }}>
                <SummarySection />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
              <Paper sx={{ padding: 2 }}>
                <RecoveryAttemptsChart />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
