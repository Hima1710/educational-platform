import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Zoom,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  CircularProgress,
  Tooltip,
  Badge,
  Fade,
  Grow,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScienceIcon from '@mui/icons-material/Science';
import PhysicsIcon from '@mui/icons-material/Physics';
import BiotechIcon from '@mui/icons-material/Biotech';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';
import { Link as RouterLink } from 'react-router-dom';

// مكون لعرض نموذج ثلاثي الأبعاد
function Model3D({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

// مكون لعرض علامة التبويب
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`subjects-tabpanel-${index}`}
      aria-labelledby={`subjects-tab-${index}`}
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

// مكون لعرض بطاقة المادة الدراسية
function SubjectCard({ subject, onClick }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // تحديد أيقونة المادة
  const getSubjectIcon = () => {
    switch (subject.title) {
      case 'الكيمياء':
        return <ScienceIcon sx={{ fontSize: 40, color: '#4caf50' }} />;
      case 'الفيزياء':
        return <PhysicsIcon sx={{ fontSize: 40, color: '#2196f3' }} />;
      case 'علوم متكاملة':
        return <BiotechIcon sx={{ fontSize: 40, color: '#f50057' }} />;
      default:
        return <ScienceIcon sx={{ fontSize: 40 }} />;
    }
  };

  // تحديد لون المستوى
  const getLevelColor = () => {
    switch (subject.level) {
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
    <Grow in={true} timeout={500}>
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
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            p: 1,
            zIndex: 1,
          }}
        >
          {getSubjectIcon()}
        </Box>
        
        <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
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
          <CardContent sx={{ flexGrow: 1, p: 2 }}>
            <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
              {subject.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2 }}>
              {subject.description}
            </Typography>
            
            <Divider sx={{ my: 1 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
              <Tooltip title={`مستوى ${subject.level}`}>
                <Chip 
                  label={subject.level} 
                  color={getLevelColor()} 
                  size="small" 
                  icon={<StarIcon />}
                  sx={{ fontWeight: 'bold' }}
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
          </CardContent>
        </CardActionArea>
      </Card>
    </Grow>
  );
}

// مكون لعرض قسم الصف الدراسي
function GradeSection({ grade, expanded, onChange, subjects, filterType }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // تحديد لون الصف
  const getGradeColor = () => {
    switch (grade.id) {
      case 'grade1':
        return '#4caf50'; // أخضر
      case 'grade2':
        return '#2196f3'; // أزرق
      case 'grade3':
        return '#f50057'; // وردي
      default:
        return theme.palette.primary.main;
    }
  };

  // تصفية المواد حسب النوع
  const filteredSubjects = filterType 
    ? subjects.filter(subject => subject.title === filterType)
    : subjects;

  return (
    <Accordion
      expanded={expanded}
      onChange={onChange}
      sx={{ 
        mb: 2,
        borderRadius: 2,
        overflow: 'hidden',
        '&:before': {
          display: 'none',
        },
        boxShadow: 3,
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${grade.id}-content`}
        id={`${grade.id}-header`}
        sx={{
          bgcolor: getGradeColor(),
          color: 'white',
          '& .MuiAccordionSummary-content': {
            my: 1,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <SchoolIcon sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {grade.title}
          </Typography>
          <Badge 
            badgeContent={filteredSubjects.length} 
            color="secondary" 
            sx={{ ml: 'auto' }}
          />
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ p: 3, bgcolor: 'background.paper' }}>
        <Grid container spacing={4}>
          {filteredSubjects.map((subject) => (
            <Grid item xs={12} sm={6} md={4} key={subject.id}>
              <SubjectCard 
                subject={subject} 
                onClick={() => onChange(subject)} 
              />
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

function Subjects() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [expandedGrade, setExpandedGrade] = useState('grade1');
  const [loading, setLoading] = useState(true);

  // محاكاة تحميل البيانات
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleGradeChange = (grade) => (event, isExpanded) => {
    setExpandedGrade(isExpanded ? grade : false);
  };

  // بيانات المواد الدراسية
  const grades = [
    {
      id: 'grade1',
      title: 'الصف الأول الثانوي',
      subjects: [
        {
          id: 1,
          title: 'الكيمياء',
          description: 'دراسة المادة وتفاعلاتها وتغيراتها',
          image: '/images/chemistry.jpg',
          model3d: '/models/chemistry.glb',
          topics: ['التركيب الذري', 'الجدول الدوري', 'الروابط الكيميائية', 'الحسابات الكيميائية'],
          level: 'متوسط',
          duration: '12 أسبوع',
          chapters: 8,
          exercises: 120,
          videos: 24,
        },
        {
          id: 2,
          title: 'الفيزياء',
          description: 'دراسة الظواهر الطبيعية والقوانين التي تحكمها',
          image: '/images/physics.jpg',
          model3d: '/models/physics.glb',
          topics: ['الحركة والقوى', 'الطاقة والحرارة', 'الكهرباء والمغناطيسية', 'الموجات والضوء'],
          level: 'متوسط',
          duration: '12 أسبوع',
          chapters: 10,
          exercises: 150,
          videos: 30,
        },
        {
          id: 3,
          title: 'علوم متكاملة',
          description: 'دمج العلوم المختلفة لفهم العالم من حولنا',
          image: '/images/integrated-science.jpg',
          model3d: '/models/integrated-science.glb',
          topics: ['البيئة والتنوع الحيوي', 'الطاقة المتجددة', 'التكنولوجيا الحيوية', 'الفضاء والفلك'],
          level: 'متوسط',
          duration: '12 أسبوع',
          chapters: 9,
          exercises: 130,
          videos: 26,
        },
      ],
    },
    {
      id: 'grade2',
      title: 'الصف الثاني الثانوي',
      subjects: [
        {
          id: 4,
          title: 'الكيمياء',
          description: 'دراسة متقدمة في الكيمياء العضوية والغير عضوية',
          image: '/images/chemistry-advanced.jpg',
          model3d: '/models/chemistry-advanced.glb',
          topics: ['الكيمياء العضوية', 'الكيمياء الحرارية', 'الكيمياء الكهربية', 'الكيمياء التحليلية'],
          level: 'متقدم',
          duration: '12 أسبوع',
          chapters: 12,
          exercises: 180,
          videos: 36,
        },
        {
          id: 5,
          title: 'الفيزياء',
          description: 'دراسة متقدمة في الفيزياء الحديثة',
          image: '/images/physics-advanced.jpg',
          model3d: '/models/physics-advanced.glb',
          topics: ['الديناميكا الحرارية', 'الضوء والبصريات', 'الفيزياء الحديثة', 'الفيزياء النووية'],
          level: 'متقدم',
          duration: '12 أسبوع',
          chapters: 14,
          exercises: 200,
          videos: 40,
        },
        {
          id: 6,
          title: 'علوم متكاملة',
          description: 'دراسة متقدمة في العلوم المتكاملة',
          image: '/images/integrated-science-advanced.jpg',
          model3d: '/models/integrated-science-advanced.glb',
          topics: ['التكنولوجيا الحيوية', 'البيئة والتنمية المستدامة', 'الطاقة المتجددة', 'النانوتكنولوجي'],
          level: 'متقدم',
          duration: '12 أسبوع',
          chapters: 11,
          exercises: 160,
          videos: 32,
        },
      ],
    },
    {
      id: 'grade3',
      title: 'الصف الثالث الثانوي',
      subjects: [
        {
          id: 7,
          title: 'الكيمياء',
          description: 'دراسة متخصصة في الكيمياء التطبيقية',
          image: '/images/chemistry-specialized.jpg',
          model3d: '/models/chemistry-specialized.glb',
          topics: ['الكيمياء العضوية المتقدمة', 'الكيمياء الصناعية', 'الكيمياء البيئية', 'الكيمياء الحيوية'],
          level: 'متخصص',
          duration: '12 أسبوع',
          chapters: 15,
          exercises: 220,
          videos: 44,
        },
        {
          id: 8,
          title: 'الفيزياء',
          description: 'دراسة متخصصة في الفيزياء التطبيقية',
          image: '/images/physics-specialized.jpg',
          model3d: '/models/physics-specialized.glb',
          topics: ['الفيزياء الكمية', 'النسبية', 'الفيزياء الفلكية', 'الفيزياء التطبيقية'],
          level: 'متخصص',
          duration: '12 أسبوع',
          chapters: 16,
          exercises: 240,
          videos: 48,
        },
        {
          id: 9,
          title: 'علوم متكاملة',
          description: 'دراسة متخصصة في العلوم المتكاملة',
          image: '/images/integrated-science-specialized.jpg',
          model3d: '/models/integrated-science-specialized.glb',
          topics: ['النانوتكنولوجي', 'الذكاء الاصطناعي', 'الروبوتات', 'الفضاء والفلك'],
          level: 'متخصص',
          duration: '12 أسبوع',
          chapters: 13,
          exercises: 190,
          videos: 38,
        },
      ],
    },
  ];

  // تحديد نوع المادة حسب علامة التبويب
  const getFilterType = () => {
    switch (tabValue) {
      case 1:
        return 'الكيمياء';
      case 2:
        return 'الفيزياء';
      case 3:
        return 'علوم متكاملة';
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Fade in={true} timeout={800}>
        <Box>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            align="center" 
            sx={{ 
              mb: 2,
              fontWeight: 'bold',
              color: theme.palette.primary.main,
            }}
          >
            المواد الدراسية
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            color="text.secondary" 
            sx={{ mb: 6 }}
          >
            اختر الصف الدراسي والمواد المتاحة للتعلم
          </Typography>
        </Box>
      </Fade>

      <Paper 
        sx={{ 
          mb: 4, 
          borderRadius: 2,
          overflow: 'hidden',
          boxShadow: 3,
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? "fullWidth" : "standard"}
          centered={!isMobile}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <Tab label="جميع المواد" icon={<ScienceIcon />} iconPosition="start" />
          <Tab label="الكيمياء" icon={<ScienceIcon />} iconPosition="start" />
          <Tab label="الفيزياء" icon={<PhysicsIcon />} iconPosition="start" />
          <Tab label="علوم متكاملة" icon={<BiotechIcon />} iconPosition="start" />
        </Tabs>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
            <CircularProgress size={60} thickness={4} />
          </Box>
        ) : (
          <>
            <TabPanel value={tabValue} index={0}>
              {grades.map((grade) => (
                <GradeSection
                  key={grade.id}
                  grade={grade}
                  expanded={expandedGrade === grade.id}
                  onChange={handleGradeChange(grade.id)}
                  subjects={grade.subjects}
                  filterType={getFilterType()}
                />
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {grades.map((grade) => (
                <GradeSection
                  key={grade.id}
                  grade={grade}
                  expanded={expandedGrade === grade.id}
                  onChange={handleGradeChange(grade.id)}
                  subjects={grade.subjects}
                  filterType={getFilterType()}
                />
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              {grades.map((grade) => (
                <GradeSection
                  key={grade.id}
                  grade={grade}
                  expanded={expandedGrade === grade.id}
                  onChange={handleGradeChange(grade.id)}
                  subjects={grade.subjects}
                  filterType={getFilterType()}
                />
              ))}
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              {grades.map((grade) => (
                <GradeSection
                  key={grade.id}
                  grade={grade}
                  expanded={expandedGrade === grade.id}
                  onChange={handleGradeChange(grade.id)}
                  subjects={grade.subjects}
                  filterType={getFilterType()}
                />
              ))}
            </TabPanel>
          </>
        )}
      </Paper>

      {/* نافذة حوار لعرض تفاصيل المادة مع نموذج ثلاثي الأبعاد */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        TransitionComponent={Zoom}
        TransitionProps={{ timeout: 500 }}
        PaperProps={{
          sx: {
            borderRadius: 2,
            overflow: 'hidden',
          }
        }}
      >
        {selectedSubject && (
          <>
            <DialogTitle sx={{ bgcolor: theme.palette.primary.main, color: 'white' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {selectedSubject.title === 'الكيمياء' && <ScienceIcon sx={{ mr: 1 }} />}
                  {selectedSubject.title === 'الفيزياء' && <PhysicsIcon sx={{ mr: 1 }} />}
                  {selectedSubject.title === 'علوم متكاملة' && <BiotechIcon sx={{ mr: 1 }} />}
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {selectedSubject.title}
                  </Typography>
                </Box>
                <IconButton onClick={handleCloseDialog} size="large" sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    وصف المادة
                  </Typography>
                  <Typography paragraph sx={{ lineHeight: 1.8 }}>
                    {selectedSubject.description}
                  </Typography>
                  
                  <Typography variant="h6" gutterBottom sx={{ mt: 3, fontWeight: 'bold', color: theme.palette.primary.main }}>
                    المواضيع الرئيسية
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                    {selectedSubject.topics.map((topic, index) => (
                      <Chip 
                        key={index} 
                        label={topic} 
                        color="primary" 
                        variant="outlined" 
                        sx={{ fontWeight: 'medium' }}
                      />
                    ))}
                  </Box>
                  
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={4}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 2, 
                          textAlign: 'center',
                          bgcolor: theme.palette.primary.light,
                          color: 'white',
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {selectedSubject.chapters}
                        </Typography>
                        <Typography variant="body2">الفصول</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 2, 
                          textAlign: 'center',
                          bgcolor: theme.palette.secondary.light,
                          color: 'white',
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {selectedSubject.exercises}
                        </Typography>
                        <Typography variant="body2">تمارين</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper 
                        elevation={2} 
                        sx={{ 
                          p: 2, 
                          textAlign: 'center',
                          bgcolor: theme.palette.error.light,
                          color: 'white',
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {selectedSubject.videos}
                        </Typography>
                        <Typography variant="body2">فيديوهات</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                  
                  <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                    <Chip 
                      label={`المستوى: ${selectedSubject.level}`} 
                      color={
                        selectedSubject.level === 'متوسط' ? 'primary' : 
                        selectedSubject.level === 'متقدم' ? 'secondary' : 'error'
                      } 
                      sx={{ fontWeight: 'bold' }}
                    />
                    <Chip 
                      label={`المدة: ${selectedSubject.duration}`} 
                      variant="outlined" 
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
                    نموذج ثلاثي الأبعاد
                  </Typography>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      height: 300, 
                      width: '100%', 
                      bgcolor: '#f5f5f5', 
                      borderRadius: 1, 
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <Canvas camera={{ position: [0, 0, 5] }}>
                      <ambientLight intensity={0.5} />
                      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                      <PresentationControls
                        global
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 3, Math.PI / 3]}
                        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
                        config={{ mass: 2, tension: 500 }}
                        snap={{ mass: 4, tension: 1500 }}
                      >
                        <Model3D modelPath={selectedSubject.model3d} />
                      </PresentationControls>
                      <Environment preset="city" />
                    </Canvas>
                  </Paper>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                    يمكنك تدوير النموذج باستخدام الماوس
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions sx={{ p: 2, bgcolor: 'background.paper' }}>
              <Button 
                onClick={handleCloseDialog} 
                variant="outlined"
                sx={{ fontWeight: 'bold' }}
              >
                إغلاق
              </Button>
              <Button 
                component={RouterLink} 
                to={`/subjects/${selectedSubject.id}`} 
                variant="contained" 
                color="primary"
                sx={{ 
                  fontWeight: 'bold',
                  px: 3,
                }}
              >
                ابدأ التعلم
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}

export default Subjects; 