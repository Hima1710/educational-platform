import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function Navbar({ toggleColorMode }) {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          منصة تعليمية
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>
          الرئيسية
        </Button>
        <Button color="inherit" onClick={() => navigate('/subjects')}>
          المواد الدراسية
        </Button>
        <Button color="inherit" onClick={() => navigate('/profile')}>
          الملف الشخصي
        </Button>
        <IconButton onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 