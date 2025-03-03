import React from 'react';
import { Grid, createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import Dashboard from './components/Dashboard';
import SummarySection from './components/SummarySection';
import RecoveryAttemptsChart from './components/BarChart';
import TimeChartComponent from './components/TimeChart';

function App() {
  // Crear el tema en modo oscuro por defecto
  const theme = createTheme({
    palette: {
      mode: 'dark', // Modo oscuro por defecto
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Aplica el tema globalmente */}
      <div>
        <Dashboard />
        {/* Contenedor para Resumen de Lanzamientos y PieChart */}
        <Grid container spacing={2} justifyContent="space-between" alignItems="flex-start">
          <Grid item xs={12} md={6}> {/* Ocupa la mitad en pantallas grandes */}
            <SummarySection />
          </Grid>
          <Grid item xs={12} md={6}> {/* Ocupa la mitad en pantallas grandes */}
            <RecoveryAttemptsChart/>
          </Grid>
        </Grid>

        {/* Contenedor para el TimeChart */}
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <TimeChartComponent />
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  );
}

export default App;
