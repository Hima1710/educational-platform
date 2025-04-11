import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import PhysicsIcon from '@mui/icons-material/Physics';
import BiotechIcon from '@mui/icons-material/Biotech';

const subjects = [
  {
    title: 'الكيمياء',
    description: 'دراسة المادة وتفاعلاتها وتغيراتها',
    icon: <ScienceIcon sx={{ fontSize: 60 }} />,
    color: '#4caf50',
  },
  {
    title: 'الفيزياء',
    description: 'دراسة القوى والطاقة والحركة',
    icon: <PhysicsIcon sx={{ fontSize: 60 }} />,
    color: '#2196f3',
  },
  {
    title: 'علوم متكاملة',
    description: 'دراسة شاملة للعلوم الطبيعية',
    icon: <BiotechIcon sx={{ fontSize: 60 }} />,
    color: '#f50057',
  },
];

function Home() {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            مدرسة أمنية سعيد التعليمية
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            تعليم متميز في الكيمياء والفيزياء والعلوم المتكاملة
          </Typography>
          <Button
            component={RouterLink}
            to="/subjects"
            variant="contained"
            color="secondary"
            size="large"
            sx={{ mt: 4 }}
          >
            ابدأ التعلم الآن
          </Button>
        </Container>
      </Box>

      {/* Subjects Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" textAlign="center" gutterBottom>
          المواد الدراسية
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {subjects.map((subject) => (
            <Grid item xs={12} md={4} key={subject.title}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
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
                  <Typography gutterBottom variant="h5" component="h3">
                    {subject.title}
                  </Typography>
                  <Typography>{subject.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Home; 