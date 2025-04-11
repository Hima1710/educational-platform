import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  Grid,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Tooltip,
  Fade,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';

const Progress = ({ subject }) => {
  // بيانات تجريبية للتقدم
  const progress = {
    overall: 65,
    chapters: {
      completed: 5,
      total: 8,
    },
    exercises: {
      completed: 75,
      total: 120,
    },
    videos: {
      completed: 15,
      total: 24,
    },
    achievements: [
      {
        id: 1,
        title: 'متعلم نشط',
        description: 'أكملت 5 فصول بنجاح',
        icon: <SchoolIcon />,
        color: '#4caf50',
      },
      {
        id: 2,
        title: 'ممارس دؤوب',
        description: 'حللت 50 تمرين',
        icon: <AssignmentIcon />,
        color: '#2196f3',
      },
      {
        id: 3,
        title: 'مشاهد متميز',
        description: 'شاهدت 10 فيديوهات',
        icon: <VideoLibraryIcon />,
        color: '#f50057',
      },
    ],
    recentActivity: [
      {
        id: 1,
        title: 'أكملت الفصل الثالث',
        date: '2024-03-15',
        type: 'chapter',
      },
      {
        id: 2,
        title: 'حللت 10 تمارين',
        date: '2024-03-14',
        type: 'exercise',
      },
      {
        id: 3,
        title: 'شاهدت فيديو جديد',
        date: '2024-03-13',
        type: 'video',
      },
    ],
  };

  const getProgressColor = (value) => {
    if (value >= 80) return '#4caf50';
    if (value >= 60) return '#2196f3';
    if (value >= 40) return '#ff9800';
    return '#f44336';
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          تقدمك في المادة
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: getProgressColor(progress.overall) }}>
              {progress.overall}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              من إجمالي المادة
            </Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={progress.overall} 
            sx={{ 
              height: 10, 
              borderRadius: 5,
              bgcolor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                bgcolor: getProgressColor(progress.overall),
              },
            }}
          />
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                bgcolor: 'primary.light',
                color: 'white',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {progress.chapters.completed}/{progress.chapters.total}
              </Typography>
              <Typography variant="body2">الفصول المكتملة</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                bgcolor: 'secondary.light',
                color: 'white',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {progress.exercises.completed}/{progress.exercises.total}
              </Typography>
              <Typography variant="body2">التمارين المحلولة</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 2, 
                textAlign: 'center',
                bgcolor: 'error.light',
                color: 'white',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                {progress.videos.completed}/{progress.videos.total}
              </Typography>
              <Typography variant="body2">الفيديوهات المشاهدة</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          الإنجازات
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {progress.achievements.map((achievement) => (
            <Grid item xs={12} sm={4} key={achievement.id}>
              <Fade in={true} timeout={500}>
                <Paper 
                  elevation={2} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    alignItems: 'center',
                    bgcolor: achievement.color,
                    color: 'white',
                  }}
                >
                  <Avatar sx={{ bgcolor: 'white', color: achievement.color, mr: 2 }}>
                    {achievement.icon}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {achievement.title}
                    </Typography>
                    <Typography variant="body2">
                      {achievement.description}
                    </Typography>
                  </Box>
                </Paper>
              </Fade>
            </Grid>
          ))}
        </Grid>

        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          النشاط الأخير
        </Typography>
        <List>
          {progress.recentActivity.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getProgressColor(progress.overall) }}>
                    {activity.type === 'chapter' && <SchoolIcon />}
                    {activity.type === 'exercise' && <AssignmentIcon />}
                    {activity.type === 'video' && <VideoLibraryIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={activity.title}
                  secondary={activity.date}
                />
                <Chip 
                  icon={<CheckCircleIcon />} 
                  label="مكتمل" 
                  color="success" 
                  size="small"
                />
              </ListItem>
              {index < progress.recentActivity.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Progress; 