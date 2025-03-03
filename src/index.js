import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import Dashboard from './components/Dashboard';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Dark mode
const theme = createTheme({
  palette: {
    mode: 'dark', 
  },
});

const root = ReactDOM.createRoot(document.getElementById('root')); // Usando createRoot en lugar de render
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>  {/* Aplicar el tema oscuro globalmente */}
      <CssBaseline /> {/* Aplica los estilos básicos del tema */}
      <Dashboard />
    </ThemeProvider>
  </React.StrictMode>
);
