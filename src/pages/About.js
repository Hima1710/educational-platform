import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupsIcon from '@mui/icons-material/Groups';
import PsychologyIcon from '@mui/icons-material/Psychology';

const features = [
  {
    icon: <SchoolIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'خبرة تعليمية متميزة',
    description: 'نقدم تعليماً عالي الجودة مع التركيز على الفهم العميق للمفاهيم العلمية',
  },
  {
    icon: <EmojiEventsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'نتائج متميزة',
    description: 'طلابنا يحققون أعلى الدرجات في الاختبارات الوطنية والدولية',
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'كادر تعليمي متميز',
    description: 'معلمون ذوو خبرة عالية في تدريس العلوم والكيمياء والفيزياء',
  },
  {
    icon: <PsychologyIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    title: 'منهج متطور',
    description: 'مناهج حديثة تواكب التطور العلمي والتكنولوجي',
  },
];

const achievements = [
  'تحقيق أعلى نسبة نجاح في المواد العلمية',
  'تخريج دفعات من الطلاب المتميزين',
  'تنظيم مسابقات علمية وورش عمل',
  'تعاون مع مؤسسات تعليمية مرموقة',
];

function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          عن مدرسة أمنية سعيد
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          نقدم تعليماً متميزاً في العلوم والكيمياء والفيزياء
        </Typography>
      </Box>

      {/* Features Section */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  {feature.icon}
                  <Typography variant="h5" component="h2" sx={{ ml: 2 }}>
                    {feature.title}
                  </Typography>
                </Box>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Mission Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          رؤيتنا
        </Typography>
        <Typography paragraph>
          نسعى لتقديم تعليم متميز في العلوم والكيمياء والفيزياء، ونهدف إلى تخريج طلاب قادرين على
          فهم وتطبيق المفاهيم العلمية في حياتهم اليومية ومستعدين للتحديات المستقبلية.
        </Typography>
      </Box>

      {/* Achievements Section */}
      <Box>
        <Typography variant="h4" component="h2" gutterBottom>
          إنجازاتنا
        </Typography>
        <List>
          {achievements.map((achievement, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <EmojiEventsIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={achievement} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default About; 