import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const TopBar = () => {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#121212' }}>
      <Toolbar>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '700', // Esto hará que el título esté en negrita
            fontSize: '24px',
            color: 'white',
            textAlign: 'left',
            width: '100%'
          }}
        >
          Space Launcher
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
