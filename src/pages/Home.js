import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Box,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ScienceIcon from '@mui/icons-material/Science';
import CalculateIcon from '@mui/icons-material/Calculate';

function Home() {
  const navigate = useNavigate();

  const subjects = [
    {
      title: 'الكيمياء',
      description: 'دروس في الكيمياء للمرحلة الثانوية',
      icon: <ScienceIcon sx={{ fontSize: 60 }} />,
      color: '#4caf50',
    },
    {
      title: 'الفيزياء',
      description: 'دروس في الفيزياء للمرحلة الثانوية',
      icon: <CalculateIcon sx={{ fontSize: 60 }} />,
      color: '#2196f3',
    },
    {
      title: 'العلوم المتكاملة',
      description: 'دروس متكاملة في العلوم',
      icon: <SchoolIcon sx={{ fontSize: 60 }} />,
      color: '#9c27b0',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          component="h1"
          variant="h2"
          color="primary"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          أهلاً بك في منصتنا التعليمية
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          منصة تعليمية متكاملة للكيمياء والفيزياء والعلوم للمرحلة الثانوية
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/subjects')}
          sx={{ mt: 4 }}
        >
          استكشف المواد الدراسية
        </Button>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {subjects.map((subject) => (
          <Grid item xs={12} sm={6} md={4} key={subject.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: 6,
                },
              }}
            >
              <Box
                sx={{
                  p: 3,
                  display: 'flex',
                  justifyContent: 'center',
                  bgcolor: subject.color,
                  color: 'white',
                }}
              >
                {subject.icon}
              </Box>
              <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {subject.title}
                </Typography>
                <Typography color="text.secondary">
                  {subject.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Home; 