import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Autocomplete,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Fade,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ onSearch, subjects }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const grades = ['الصف الأول الثانوي', 'الصف الثاني الثانوي', 'الصف الثالث الثانوي'];
  const levels = ['متوسط', 'متقدم', 'متخصص'];
  const subjectTypes = ['الكيمياء', 'الفيزياء', 'علوم متكاملة'];

  const handleSearch = () => {
    const filters = {
      query: searchQuery,
      grade: selectedGrade,
      level: selectedLevel,
      subject: selectedSubject,
    };
    onSearch(filters);
  };

  const handleClear = () => {
    setSearchQuery('');
    setSelectedGrade('');
    setSelectedLevel('');
    setSelectedSubject('');
    onSearch({});
  };

  return (
    <Fade in={true} timeout={800}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                البحث في المواد الدراسية
              </Typography>
              <IconButton 
                onClick={() => setShowFilters(!showFilters)}
                color={showFilters ? 'primary' : 'default'}
              >
                <FilterListIcon />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="ابحث عن مادة دراسية..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClear} size="small">
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
          </Grid>

          {showFilters && (
            <Fade in={showFilters}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>الصف الدراسي</InputLabel>
                      <Select
                        value={selectedGrade}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                        label="الصف الدراسي"
                      >
                        <MenuItem value="">الكل</MenuItem>
                        {grades.map((grade) => (
                          <MenuItem key={grade} value={grade}>
                            {grade}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>المستوى</InputLabel>
                      <Select
                        value={selectedLevel}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        label="المستوى"
                      >
                        <MenuItem value="">الكل</MenuItem>
                        {levels.map((level) => (
                          <MenuItem key={level} value={level}>
                            {level}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>نوع المادة</InputLabel>
                      <Select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        label="نوع المادة"
                      >
                        <MenuItem value="">الكل</MenuItem>
                        {subjectTypes.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Fade>
          )}

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {selectedGrade && (
                <Chip 
                  label={`الصف: ${selectedGrade}`} 
                  onDelete={() => setSelectedGrade('')}
                  color="primary"
                />
              )}
              {selectedLevel && (
                <Chip 
                  label={`المستوى: ${selectedLevel}`} 
                  onDelete={() => setSelectedLevel('')}
                  color="secondary"
                />
              )}
              {selectedSubject && (
                <Chip 
                  label={`المادة: ${selectedSubject}`} 
                  onDelete={() => setSelectedSubject('')}
                  color="error"
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
};

export default SearchBar; 