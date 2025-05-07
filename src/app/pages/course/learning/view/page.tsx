import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Fragment } from 'react';

const lessonData = {
  title: 'JSX là gì? Tại sao cần JSX?',
  updatedAt: 'Cập nhật tháng 11 năm 2022',
  duration: '15:59',
  chapters: [
    {
      title: '4. JSX, Components, Props',
      lessons: [
        {
          id: 22,
          title: 'JSX là gì? Tại sao cần JSX?',
          duration: '15:59',
          completed: true,
          active: true,
        },
        { id: 23, title: 'Ôn tập về JSX #1', duration: '00:40', completed: false },
        { id: 24, title: 'JSX render Arrays | JSX FAQ', duration: '13:36', locked: true },
        { id: 25, title: 'Ôn tập JSX #2', duration: '00:13', locked: true },
        { id: 26, title: 'React element types', duration: '14:13', locked: true },
        { id: 27, title: 'Tại sao phải chia component?', duration: '00:09', locked: true },
        { id: 28, title: 'Props là gì? Dùng props khi nào?', duration: '25:42', locked: true },
        { id: 29, title: 'Ôn tập Props', duration: '00:23', locked: true },
        { id: 30, title: 'DOM events?', duration: '13:58', locked: true },
      ],
    },
  ],
};

export const LessonPage = () => {
  return (
    <Box sx={{ mb: 5 }}>
      {/* Video section (fake preview with play icon) */}
      <Box
        position="relative"
        height={{ xs: 300, md: 500 }}
        bgcolor="#1e1e2f"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <PlayCircleOutlineIcon sx={{ fontSize: 80, color: '#fff' }} />
      </Box>

      {/* Lesson title and updated date */}
      <Box p={3}>
        <Typography variant="h5" fontWeight={600}>
          {lessonData.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1} mb={3}>
          {lessonData.updatedAt}
        </Typography>

        {/* Lesson list (normally right sidebar) */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600} mb={1}>
            Nội dung khóa học
          </Typography>
          {lessonData.chapters.map((chapter, chapterIdx) => (
            <Box key={chapterIdx} mb={2}>
              <Typography fontWeight={600}>{chapter.title}</Typography>
              <Typography variant="caption" color="text.secondary">
                {chapter.lessons.length} bài học
              </Typography>
              <List dense>
                {chapter.lessons.map((lesson) => (
                  <Fragment key={lesson.id}>
                    <ListItem
                      sx={{
                        bgcolor: lesson.active ? '#ffe0e0' : 'transparent',
                        borderRadius: 1,
                        pl: 1.5,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            fontWeight={lesson.active ? 600 : 400}
                            color={lesson.locked ? 'text.disabled' : 'text.primary'}
                          >
                            {lesson.id}. {lesson.title}
                          </Typography>
                        }
                        secondary={lesson.duration}
                      />
                      {lesson.completed && !lesson.locked && (
                        <Chip size="small" label="✓" color="success" />
                      )}
                      {lesson.locked && (
                        <Chip size="small" label="Khóa" color="default" variant="outlined" />
                      )}
                    </ListItem>
                    <Divider component="li" />
                  </Fragment>
                ))}
              </List>
            </Box>
          ))}
        </Box>

        {/* Controls: Previous / Next / Q&A */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 2,
            backgroundColor: 'background.paper',
            borderTop: 1,
            borderColor: 'divider',
            zIndex: 1000,
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid>
              <Button
                variant="outlined"
                sx={{
                  transition: 'all 0.2s ease-in-out', // smooth transition
                  '&:hover': {
                    transform: 'translateX(-4px)',
                  },
                }}
              >
                &lt; Bài trước
              </Button>
            </Grid>
            <Grid>
              <Button
                variant="contained"
                sx={{
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateX(4px)',
                  },
                }}
              >
                Bài tiếp theo &gt;
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
