import { useNavigate, useParams } from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useGetCourseById } from '../../../../../core/courses/use-get-course-by-id.ts';
import { formatDuration } from '../../../../../shared/utils.ts';
import Iconify from '../../../../../shared/components/iconify';
import { TLesson } from '../../../../../core/types.ts';
import { useGetLearningCourseById } from '../../../../../core/learning-course/use-get-learning-course-by-id.ts';
import { LoadingButton } from '@mui/lab';

export const LessonPage = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const { data } = useGetCourseById({ _id: id || undefined });

  const { data: learningCourseData, mutate } = useGetLearningCourseById(id || '');

  const [currentLesson, setCurrentLesson] = useState<{
    videoUrl: string;
    name: string;
    updatedAt: string;
    _id: string;
  } | null>(null);

  const [isLastLesson, setIsLastLesson] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (data && data.chapters.length > 0) {
      const firstChapter = data.chapters[0];
      const firstLesson = firstChapter.lessons[0];

      navigate(`/course/learning/${id}?lesson_id=${firstLesson._id}`, { replace: true });

      setCurrentLesson({
        videoUrl: firstLesson.videoUrl || '',
        name: firstLesson.name,
        updatedAt: firstLesson.updatedAt || new Date().toISOString(),
        _id: firstLesson._id,
      });
      setIsLastLesson(false);
    }
  }, [data, id, navigate]);

  const updateLessonProgress = async (lessonId: string) => {
    try {
      const learningCourseId = learningCourseData?._id; // Assuming learningCourseData contains the course ID
      if (!learningCourseId) return;

      await fetch(`http://localhost:3001/v1/learning_course/update-progress/${learningCourseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({
          lesson_id: lessonId,
        }),
      });
    } catch (error) {
      console.error('Failed to update lesson progress:', error);
    }
  };

  const handleNextLesson = async () => {
    if (!data || !currentLesson) return;
    setIsLoading(true);
    await updateLessonProgress(currentLesson._id);
    await mutate();
    setIsLoading(false);

    let nextLesson = null;
    let nextChapterIndex = -1;

    for (let chapterIdx = 0; chapterIdx < data.chapters.length; chapterIdx++) {
      const chapter = data.chapters[chapterIdx];
      const lessonIdx = chapter.lessons.findIndex((lesson) => lesson._id === currentLesson._id);

      if (lessonIdx !== -1) {
        // Check if it's the last lesson in the chapter
        if (lessonIdx < chapter.lessons.length - 1) {
          nextLesson = chapter.lessons[lessonIdx + 1];
        } else if (chapterIdx < data.chapters.length - 1) {
          // Move to the first lesson of the next chapter
          nextChapterIndex = chapterIdx + 1;
          nextLesson = data.chapters[nextChapterIndex].lessons[0];
        } else {
          // Last lesson of the last chapter
          setIsLastLesson(true);
        }
        break;
      }
    }

    if (nextLesson) {
      navigate(`/course/learning/${id}?lesson_id=${nextLesson._id}`, { replace: true });
      setCurrentLesson({
        videoUrl: nextLesson.videoUrl || '',
        name: nextLesson.name,
        updatedAt: nextLesson.updatedAt || new Date().toISOString(),
        _id: nextLesson._id,
      });
      setIsLastLesson(
        nextLesson._id ===
          data.chapters[data.chapters.length - 1].lessons[
            data.chapters[data.chapters.length - 1].lessons.length - 1
          ]._id
      );
    }
  };

  const handleCompleteCourse = () => {
    // Logic for completing the course
    console.log('Course completed!');
  };

  const handlePreviousLesson = () => {
    if (!data || !currentLesson) return;

    let previousLesson = null;
    let previousChapterIndex = -1;

    for (let chapterIdx = 0; chapterIdx < data.chapters.length; chapterIdx++) {
      const chapter = data.chapters[chapterIdx];
      const lessonIdx = chapter.lessons.findIndex((lesson) => lesson._id === currentLesson._id);

      if (lessonIdx !== -1) {
        // Check if it's the first lesson in the chapter
        if (lessonIdx > 0) {
          previousLesson = chapter.lessons[lessonIdx - 1];
        } else if (chapterIdx > 0) {
          // Move to the last lesson of the previous chapter
          previousChapterIndex = chapterIdx - 1;
          previousLesson =
            data.chapters[previousChapterIndex].lessons[
              data.chapters[previousChapterIndex].lessons.length - 1
            ];
        }
        break;
      }
    }

    if (previousLesson) {
      navigate(`/course/learning/${id}?lesson_id=${previousLesson._id}`, { replace: true });
      setCurrentLesson({
        videoUrl: previousLesson.videoUrl || '',
        name: previousLesson.name,
        updatedAt: previousLesson.updatedAt || new Date().toISOString(),
        _id: previousLesson._id,
      });
      setIsLastLesson(false);
    }
  };

  const isFirstLesson = !!(
    data &&
    currentLesson &&
    data.chapters[0].lessons[0]._id === currentLesson._id // Compare with the first lesson's ID
  );

  const handleLessonSelection = (lesson: TLesson) => {
    navigate(`/course/learning/${id}?lesson_id=${lesson._id}`, {
      replace: true,
    });
    setCurrentLesson({
      videoUrl: lesson.videoUrl || '',
      name: lesson.name,
      updatedAt: lesson.updatedAt || new Date().toISOString(),
      _id: lesson._id,
    });

    if (!data) return;

    const lastLessonId =
      data.chapters[data.chapters.length - 1].lessons[
        data.chapters[data.chapters.length - 1].lessons.length - 1
      ]?._id;

    setIsLastLesson(lesson._id === lastLessonId);
  };

  const vidRef = useRef(null);

  // const handleOnClick = () => {
  //   if (vidRef && vidRef.current) {
  //     const currentTime = vidRef.current.currentTime;
  //     console.log('Current Time:', currentTime);
  //   } else {
  //     console.error('Video reference is not set or currentTime is not available.');
  //   }
  // };
  //
  // const handleSetTime = (time: number) => {
  //   if (vidRef.current) {
  //     vidRef.current.currentTime = time; // Set the video to the specified time
  //   }
  // };

  return (
    <>
      {data ? (
        <>
          <Box sx={{ mb: 5 }}>
            <Box
              position="relative"
              height={550}
              bgcolor="#1e1e2f"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <video
                key={currentLesson?.videoUrl}
                ref={vidRef}
                width="100%"
                height="100%"
                style={{ objectFit: 'contain' }}
                controls
                controlsList="noplaybackrate nodownload"
                disablePictureInPicture
              >
                {currentLesson?.videoUrl ? (
                  <source src={currentLesson.videoUrl} type="video/mp4" />
                ) : (
                  <p>Video không khả dụng.</p>
                )}
                Your browser does not support the video tag.
              </video>
            </Box>

            {/*<Button onClick={handleOnClick}>Get Current Time</Button>*/}

            {/*<button onClick={() => handleSetTime(30)}>Start at 30 seconds</button>*/}

            <Box p={3}>
              <Typography variant="h5" fontWeight={600}>
                {currentLesson?.name || ''}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1} mb={3}>
                {`Cập nhật ${new Intl.DateTimeFormat('vi-VN', {
                  month: 'long',
                  year: 'numeric',
                }).format(new Date(currentLesson ? currentLesson.updatedAt : new Date()))}`}
              </Typography>

              <Box>
                <Typography variant="subtitle1" fontWeight={600} mb={1}>
                  Nội dung khóa học
                </Typography>
                {data.chapters.map((chapter, chapterIdx) => (
                  <Accordion key={chapterIdx} sx={{ mb: 2 }} defaultExpanded>
                    <AccordionSummary
                      expandIcon={<Iconify icon="mdi:chevron-down" />}
                      sx={{ bgcolor: '#f5f5f5' }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography fontWeight={600}>
                          {`${chapterIdx + 1}. ${chapter.name}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                          {chapter.lessons.length} bài học
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List dense>
                        {chapter.lessons.map((lesson, index) => (
                          <Fragment key={index}>
                            <ListItem
                              sx={{
                                borderRadius: 1,
                                pl: 1.5,
                                bgcolor:
                                  lesson._id ===
                                  new URLSearchParams(window.location.search).get('lesson_id')
                                    ? '#fcded7'
                                    : 'transparent',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleLessonSelection(lesson)}
                            >
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="body2"
                                    fontWeight={
                                      lesson._id ===
                                      new URLSearchParams(window.location.search).get('lesson_id')
                                        ? 600
                                        : 400
                                    }
                                  >
                                    {chapterIdx + 1}.{index + 1}. {lesson.name}
                                  </Typography>
                                }
                                secondary={formatDuration(lesson.duration ?? 0)}
                              />
                            </ListItem>
                            <Divider component="li" />
                          </Fragment>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Box>
          </Box>

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
                  disabled={isFirstLesson}
                  sx={{
                    transition: 'all 0.2s ease-in-out', // smooth transition
                    '&:hover': {
                      transform: 'translateX(-4px)',
                    },
                  }}
                  onClick={handlePreviousLesson}
                >
                  &lt; Bài trước
                </Button>
              </Grid>
              <Grid>
                <LoadingButton
                  loading={isLoading}
                  variant="contained"
                  sx={{
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateX(4px)',
                    },
                  }}
                  onClick={isLastLesson ? handleCompleteCourse : handleNextLesson}
                >
                  {isLastLesson ? 'Hoàn thành khóa học' : 'Bài tiếp theo >'}
                </LoadingButton>
              </Grid>
              <Grid>
                <CircularProgressWithLabel value={learningCourseData?.process || undefined} />
              </Grid>
            </Grid>
          </Box>
        </>
      ) : (
        <Skeleton variant="rectangular" width="100%" height={550} />
      )}
    </>
  );
};

function CircularProgressWithLabel({ value }: { value?: number }) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" value={value ?? undefined} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="text.secondary">
          {`${Math.round(value ?? 0)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
