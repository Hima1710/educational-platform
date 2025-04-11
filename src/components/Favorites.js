import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  IconButton,
  Chip,
  Fade,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';

const Favorites = ({ subjects, onRemoveFavorite }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // بيانات تجريبية للمواد المفضلة
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: 'الكيمياء',
      description: 'دراسة المادة وتفاعلاتها وتغيراتها',
      image: '/images/chemistry.jpg',
      level: 'متوسط',
      duration: '12 أسبوع',
      grade: 'الصف الأول الثانوي',
    },
    {
      id: 2,
      title: 'الفيزياء',
      description: 'دراسة الظواهر الطبيعية والقوانين التي تحكمها',
      image: '/images/physics.jpg',
      level: 'متقدم',
      duration: '12 أسبوع',
      grade: 'الصف الثاني الثانوي',
    },
  ]);

  const handleOpenDialog = (subject) => {
    setSelectedSubject(subject);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSubject(null);
  };

  const handleRemoveFavorite = (subjectId) => {
    setFavorites(favorites.filter(subject => subject.id !== subjectId));
    onRemoveFavorite && onRemoveFavorite(subjectId);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'متوسط':
        return 'primary';
      case 'متقدم':
        return 'secondary';
      case 'متخصص':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            المواد المفضلة
          </Typography>
          <Chip 
            icon={<FavoriteIcon />} 
            label={`${favorites.length} مواد`} 
            color="primary"
          />
        </Box>

        {favorites.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <FavoriteBorderIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              لا توجد مواد مفضلة حالياً
            </Typography>
            <Typography variant="body2" color="text.secondary">
              قم بإضافة المواد المفضلة لديك من صفحة المواد الدراسية
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {favorites.map((subject) => (
              <Grid item xs={12} sm={6} md={4} key={subject.id}>
                <Fade in={true} timeout={500}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 8,
                      },
                    }}
                  >
                    <CardActionArea onClick={() => handleOpenDialog(subject)}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={subject.image}
                        alt={subject.title}
                        sx={{ 
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                          {subject.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {subject.description}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                          <Tooltip title={`مستوى ${subject.level}`}>
                            <Chip 
                              label={subject.level} 
                              color={getLevelColor(subject.level)} 
                              size="small" 
                              icon={<StarIcon />}
                            />
                          </Tooltip>
                          <Tooltip title={`مدة الدراسة: ${subject.duration}`}>
                            <Chip 
                              label={subject.duration} 
                              variant="outlined" 
                              size="small" 
                              icon={<AccessTimeIcon />}
                            />
                          </Tooltip>
                        </Box>
                        <Chip 
                          label={subject.grade} 
                          icon={<SchoolIcon />} 
                          size="small" 
                          sx={{ mt: 1 }}
                        />
                      </CardContent>
                    </CardActionArea>
                    <Box sx={{ p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <Tooltip title="إزالة من المفضلة">
                        <IconButton 
                          onClick={() => handleRemoveFavorite(subject.id)}
                          color="error"
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Fade}
      >
        {selectedSubject && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {selectedSubject.title}
                </Typography>
                <IconButton onClick={handleCloseDialog} size="small">
                  <DeleteIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <img 
                    src={selectedSubject.image} 
                    alt={selectedSubject.title}
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      borderRadius: 8,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" paragraph>
                    {selectedSubject.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip 
                      label={`المستوى: ${selectedSubject.level}`} 
                      color={getLevelColor(selectedSubject.level)}
                    />
                    <Chip 
                      label={`المدة: ${selectedSubject.duration}`} 
                      variant="outlined"
                    />
                    <Chip 
                      label={selectedSubject.grade} 
                      icon={<SchoolIcon />}
                    />
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog}>إغلاق</Button>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<FavoriteIcon />}
              >
                الانتقال للمادة
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Favorites; 