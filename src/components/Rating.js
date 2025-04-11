import React, { useState } from 'react';
import {
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Fade,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CloseIcon from '@mui/icons-material/Close';

const RatingComponent = ({ subject, onRatingSubmit }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([
    {
      id: 1,
      user: 'أحمد محمد',
      rating: 4,
      comment: 'مادة رائعة ومفيدة جداً',
      date: '2024-03-15',
      likes: 12,
      dislikes: 2,
    },
    {
      id: 2,
      user: 'سارة أحمد',
      rating: 5,
      comment: 'شرح ممتاز وأمثلة عملية',
      date: '2024-03-14',
      likes: 8,
      dislikes: 1,
    },
  ]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRating(0);
    setReview('');
  };

  const handleSubmit = () => {
    const newReview = {
      id: reviews.length + 1,
      user: 'المستخدم الحالي',
      rating,
      comment: review,
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      dislikes: 0,
    };

    setReviews([newReview, ...reviews]);
    onRatingSubmit && onRatingSubmit(newReview);
    handleCloseDialog();
  };

  const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            تقييمات المادة
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleOpenDialog}
            startIcon={<StarIcon />}
          >
            أضف تقييماً
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              {averageRating.toFixed(1)}
            </Typography>
            <Rating 
              value={averageRating} 
              precision={0.1} 
              readOnly 
              sx={{ ml: 1 }}
            />
          </Box>
          <Typography variant="body2" color="text.secondary">
            ({reviews.length} تقييم)
          </Typography>
        </Box>

        <List>
          {reviews.map((review, index) => (
            <React.Fragment key={review.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mr: 1 }}>
                        {review.user}
                      </Typography>
                      <Rating value={review.rating} readOnly size="small" />
                      <Chip 
                        label={review.date} 
                        size="small" 
                        sx={{ ml: 1 }}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" paragraph>
                        {review.comment}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small">
                          <ThumbUpIcon fontSize="small" />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {review.likes}
                          </Typography>
                        </IconButton>
                        <IconButton size="small">
                          <ThumbDownIcon fontSize="small" />
                          <Typography variant="caption" sx={{ ml: 0.5 }}>
                            {review.dislikes}
                          </Typography>
                        </IconButton>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < reviews.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">أضف تقييماً جديداً</Typography>
            <IconButton onClick={handleCloseDialog} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              قيم المادة
            </Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              size="large"
            />
          </Box>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="اكتب تقييمك"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog}>إلغاء</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            disabled={!rating || !review}
          >
            إرسال التقييم
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RatingComponent; 