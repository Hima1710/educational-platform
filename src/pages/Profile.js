import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';

// مكون لعرض علامة التبويب
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Profile() {
  // بيانات المستخدم (في التطبيق الحقيقي ستأتي من API)
  const [userData] = useState({
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '0123456789',
    grade: 'الصف الثاني الثانوي',
    balance: 250,
    avatar: null,
    joinDate: 'يناير 2023',
  });

  // حالة علامات التبويب
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // محاكاة بيانات المعاملات
  const transactions = [
    { id: 1, date: '2023-05-15', description: 'شراء دورة كيمياء', amount: -50 },
    { id: 2, date: '2023-05-10', description: 'إيداع رصيد', amount: 100 },
    { id: 3, date: '2023-05-05', description: 'شراء دورة فيزياء', amount: -75 },
    { id: 4, date: '2023-05-01', description: 'إيداع رصيد', amount: 200 },
  ];

  // محاكاة بيانات الدورات المحفوظة
  const savedCourses = [
    { id: 1, title: 'الكيمياء العضوية', subject: 'الكيمياء', progress: 60 },
    { id: 2, title: 'الفيزياء الحديثة', subject: 'الفيزياء', progress: 30 },
    { id: 3, title: 'التكنولوجيا الحيوية', subject: 'علوم متكاملة', progress: 45 },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container spacing={4}>
        {/* معلومات المستخدم الأساسية */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 4 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 2,
                  bgcolor: 'primary.main',
                }}
              >
                {userData.avatar ? (
                  <img src={userData.avatar} alt={userData.name} />
                ) : (
                  <PersonIcon sx={{ fontSize: 80 }} />
                )}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {userData.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                {userData.grade}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
              >
                تعديل الملف الشخصي
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                معلومات الاتصال
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="البريد الإلكتروني" secondary={userData.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="رقم الهاتف" secondary={userData.phone} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="الصف الدراسي" secondary={userData.grade} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <HistoryIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="تاريخ الانضمام" secondary={userData.joinDate} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* المحتوى الرئيسي */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <AccountBalanceWalletIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                <Box>
                  <Typography variant="h6">رصيدك الحالي</Typography>
                  <Typography variant="h4" color="primary.main">
                    {userData.balance} جنيه
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ ml: 'auto' }}
                >
                  إضافة رصيد
                </Button>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  aria-label="profile tabs"
                  variant="fullWidth"
                >
                  <Tab icon={<HistoryIcon />} label="المعاملات" />
                  <Tab icon={<BookmarkIcon />} label="الدورات المحفوظة" />
                  <Tab icon={<SettingsIcon />} label="الإعدادات" />
                </Tabs>
              </Box>

              {/* علامة تبويب المعاملات */}
              <TabPanel value={tabValue} index={0}>
                <Typography variant="h6" gutterBottom>
                  سجل المعاملات
                </Typography>
                <List>
                  {transactions.map((transaction) => (
                    <React.Fragment key={transaction.id}>
                      <ListItem>
                        <ListItemText
                          primary={transaction.description}
                          secondary={transaction.date}
                        />
                        <Typography
                          variant="body1"
                          color={transaction.amount > 0 ? 'success.main' : 'error.main'}
                        >
                          {transaction.amount > 0 ? '+' : ''}{transaction.amount} جنيه
                        </Typography>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              {/* علامة تبويب الدورات المحفوظة */}
              <TabPanel value={tabValue} index={1}>
                <Typography variant="h6" gutterBottom>
                  الدورات المحفوظة
                </Typography>
                <List>
                  {savedCourses.map((course) => (
                    <React.Fragment key={course.id}>
                      <ListItem>
                        <ListItemText
                          primary={course.title}
                          secondary={`${course.subject} - التقدم: ${course.progress}%`}
                        />
                        <Button variant="outlined" size="small">
                          متابعة
                        </Button>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              </TabPanel>

              {/* علامة تبويب الإعدادات */}
              <TabPanel value={tabValue} index={2}>
                <Typography variant="h6" gutterBottom>
                  إعدادات الحساب
                </Typography>
                <List>
                  <ListItem>
                    <ListItemText
                      primary="تغيير كلمة المرور"
                      secondary="تحديث كلمة المرور الخاصة بك"
                    />
                    <Button variant="outlined" size="small">
                      تغيير
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="تفضيلات الإشعارات"
                      secondary="تخصيص الإشعارات التي تتلقاها"
                    />
                    <Button variant="outlined" size="small">
                      تخصيص
                    </Button>
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemText
                      primary="حذف الحساب"
                      secondary="حذف حسابك وكل بياناتك"
                    />
                    <Button variant="outlined" color="error" size="small">
                      حذف
                    </Button>
                  </ListItem>
                </List>
              </TabPanel>
            </CardContent>
          </Card>

          {/* بطاقة الإحصائيات */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                إحصائيات التعلم
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">
                      3
                    </Typography>
                    <Typography variant="body2">الدورات المسجلة</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">
                      12
                    </Typography>
                    <Typography variant="body2">ساعات التعلم</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h4" color="primary.main">
                      5
                    </Typography>
                    <Typography variant="body2">الاختبارات المكتملة</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile; 