import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Snackbar,
  Alert,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const contactInfo = [
  {
    icon: <LocationOnIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
    title: 'العنوان',
    content: 'شارع الرئيسي، المدينة التعليمية',
  },
  {
    icon: <PhoneIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
    title: 'الهاتف',
    content: '+20 123 456 7890',
  },
  {
    icon: <EmailIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
    title: 'البريد الإلكتروني',
    content: 'info@amnasaid.edu',
  },
  {
    icon: <AccessTimeIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
    title: 'ساعات العمل',
    content: 'من الأحد إلى الخميس: 8:00 صباحاً - 4:00 مساءً',
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Form submitted:', formData);
    setOpenSnackbar(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" textAlign="center" gutterBottom>
        اتصل بنا
      </Typography>
      <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
        نحن هنا لمساعدتك والإجابة على استفساراتك
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Information */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 4 }}>
            {contactInfo.map((info, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {info.icon}
                    <Typography variant="h6" sx={{ ml: 2 }}>
                      {info.title}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">{info.content}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                أرسل لنا رسالة
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="الاسم"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      dir="rtl"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="البريد الإلكتروني"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      dir="rtl"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="رقم الهاتف"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      dir="rtl"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="الرسالة"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      dir="rtl"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      إرسال الرسالة
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact; 