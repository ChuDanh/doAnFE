import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextareaAutosize,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { FieldTitle } from '../../../../../shared/components/field-title/field-title.tsx';
import { ChangeEvent, useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Iconify from '../../../../../shared/components/iconify';
import { TChapter, TCourse } from '../../../../../core/types.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { ExitDialog } from '../../../../../shared/components/dialog/exit/exit-dialog.tsx';
import { useGetCourseById } from '../../../../../core/courses/use-get-course-by-id.ts';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { ImageUploader } from '../../../../../shared/components/upload-image/upload-image.tsx';

type Props = {
  state: 'edit' | 'detail';
};
export const DetailEditCourse = ({ state }: Props) => {
  const router = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();

  const { data } = useGetCourseById({ _id: id || undefined });

  const methods = useForm<TCourse>({
    defaultValues: {
      name: data?.name || '',
      level: data?.level,
      description: data?.description || '',
      knowledge: data?.knowledge || [],
      chapters:
        data?.chapters?.map((chapter) => ({
          id: chapter._id,
          name: chapter.name,
          lessons:
            chapter.lessons?.map((lesson) => ({
              id: lesson._id,
              name: lesson.name,
              videoUrl: lesson.videoUrl,
            })) || [],
        })) || [],
      image_course: data?.image_course || '',
    },
  });

  const [knowledgeFields, setKnowledgeFields] = useState<string[]>(['']);
  const [chapters, setChapters] = useState<TChapter[]>([]);
  const [loading, setLoading] = useState(false);

  const [exitCourse, setExitCourse] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    setValue,
    getValues,
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const formatData = () => {
      return {
        ...data,
        knowledge: data.knowledge.filter((item) => item.trim() !== ''), // Loại bỏ các trường rỗng
        chapters: data.chapters.map((chapter) => ({
          ...chapter,
          lessons: chapter.lessons.map((lesson) => ({
            ...lesson,
            videoUrl: lesson.videoUrl || undefined, // Đảm bảo videoUrl là undefined nếu không có
          })),
        })),
      };
    };

    try {
      await fetch(`http://localhost:3001/v1/course/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(formatData()),
      });
      enqueueSnackbar('Cập nhật khóa học thành công!', { variant: 'success' });
      router(`/manage/courses/list`);
    } catch (err: any) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  });

  const handleAddField = () => {
    setKnowledgeFields([...knowledgeFields, '']);
  };

  const handleRemoveField = (index: number) => {
    const newFields = knowledgeFields.filter((_, i) => i !== index);
    setKnowledgeFields(newFields);
  };

  const handleAddChapter = () => {
    setChapters([
      ...chapters,
      {
        _id: `chapter-${Date.now()}`,
        name: '',
        lessons: [],
      },
    ]);
  };

  const handleAddLesson = (chapterId: string) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter._id === chapterId) {
          return {
            ...chapter,
            lessons: [
              ...chapter.lessons,
              {
                _id: `lesson-${Date.now()}`,
                name: '',
              },
            ],
          };
        }
        return chapter;
      })
    );
  };

  const handleChapterNameChange = (chapterId: string, name: string) => {
    setChapters(
      chapters.map((chapter, index) => {
        if (chapter._id === chapterId) {
          setValue(`chapters.${index}.name`, name);
          return { ...chapter, name };
        }
        return chapter;
      })
    );
  };

  const handleLessonNameChange = (chapterId: string, lessonId: string, name: string) => {
    setChapters(
      chapters.map((chapter, chapterIndex) => {
        if (chapter._id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson, lessonIndex) => {
              if (lesson._id === lessonId) {
                setValue(`chapters.${chapterIndex}.lessons.${lessonIndex}.name`, name);
                return { ...lesson, name };
              }
              return lesson;
            }),
          };
        }
        return chapter;
      })
    );
  };

  const handleVideoUpload = async (
    chapterId: string,
    lessonId: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      const videoPreview = URL.createObjectURL(file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'preset1');

      setLoading(true);
      try {
        const response = await fetch('https://api.cloudinary.com/v1_1/dczxvkvei/video/upload', {
          method: 'POST',
          body: formData,
        });

        const responseData = await response.json();
        const urlVideo = responseData.url;

        setChapters(
          chapters.map((chapter) => {
            if (chapter._id === chapterId) {
              return {
                ...chapter,
                lessons: chapter.lessons.map((lesson) => {
                  if (lesson._id === lessonId) {
                    setValue(
                      `chapters.${chapters.indexOf(chapter)}.lessons.${chapter.lessons.indexOf(lesson)}.videoUrl`,
                      urlVideo
                    );
                    return { ...lesson, videoUrl: urlVideo, videoPreview };
                  }
                  return lesson;
                }),
              };
            }
            return chapter;
          })
        );
      } catch (err: any) {
        enqueueSnackbar(err.message, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteVideo = (chapterId: string, lessonId: string) => {
    setChapters(
      chapters.map((chapter, chapterIndex) => {
        if (chapter._id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.map((lesson, lessonIndex) => {
              if (lesson._id === lessonId) {
                // Xóa videoUrl trong form và state
                setValue(`chapters.${chapterIndex}.lessons.${lessonIndex}.videoUrl`, undefined);
                return { ...lesson, videoUrl: undefined, videoPreview: undefined };
              }
              return lesson;
            }),
          };
        }
        return chapter;
      })
    );
  };

  const handleDeleteChapter = (chapterId: string) => {
    setChapters(chapters.filter((chapter) => chapter._id !== chapterId));
  };

  const handleDeleteLesson = (chapterId: string, lessonId: string) => {
    setChapters(
      chapters.map((chapter) => {
        if (chapter._id === chapterId) {
          return {
            ...chapter,
            lessons: chapter.lessons.filter((lesson) => lesson._id !== lessonId),
          };
        }
        return chapter;
      })
    );
  };

  const handleExitCourse = () => {
    if (isDirty) {
      return setExitCourse(true);
    }
    return router(`/manage/courses/list`);
  };

  useEffect(
    () => {
      if (data) {
        const formatChapters =
          data.chapters?.map((chapter) => ({
            ...chapter,
            lessons:
              chapter.lessons?.map((lesson) => ({
                ...lesson,
                videoPreview: lesson.videoUrl || undefined, // Use videoUrl directly
              })) || [],
          })) || [];

        methods.reset({
          name: data.name || '',
          level: data.level || 'basic',
          description: data.description || '',
          knowledge: data.knowledge || [],
          chapters: formatChapters,
          image_course: data.image_course || '',
          price: data.price || 0,
        });

        // Cập nhật lại các state phụ thuộc (nếu cần)
        setKnowledgeFields(data.knowledge?.length ? data.knowledge : ['']);
        setChapters(formatChapters);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <Box p={4}>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center" mb={5}>
        {state === 'edit' ? 'Chỉnh sửa khóa học' : 'Chi tiết khóa học'}
      </Typography>

      <FormProvider {...methods}>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid size={9}>
              <FieldTitle title="Tên khóa học" required fontSize={18} />
              <TextField
                variant="outlined"
                {...register('name', { required: true })}
                fullWidth
                size="small"
                error={!!errors.name}
                placeholder={'Nhập tên khóa học'}
                // helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={3}>
              <FieldTitle title="Trình độ" required fontSize={18} />
              <Controller
                name="level"
                control={methods.control}
                defaultValue="basic"
                render={({ field }) => (
                  <Select {...field} fullWidth size="small" variant="outlined">
                    <MenuItem value="basic">Cơ bản</MenuItem>
                    <MenuItem value="advanced">Nâng cao</MenuItem>
                  </Select>
                )}
              />
            </Grid>

            <Grid size={12}>
              <FieldTitle title="Mô tả khóa học" fontSize={18} />
              <TextareaAutosize
                {...register('description')}
                style={{
                  minWidth: '100%',
                  maxWidth: '100%',
                  fontFamily: 'Arial, sans-serif, Roboto',
                  fontSize: 16,
                }}
                minRows={8}
                placeholder={'Nhập mô tả khóa học...'}
              />
            </Grid>

            <Grid size={12}>
              <FieldTitle title="Kiến thức học được" fontSize={18} />
              {knowledgeFields.map((_, index) => (
                <Box key={index} display="flex" alignItems="center" mb={1}>
                  <TextField
                    variant="outlined"
                    {...register(`knowledge.${index}`)}
                    fullWidth
                    size="small"
                    placeholder="Nhập kiến thức..."
                  />
                  {knowledgeFields.length > 0 && state === 'edit' && (
                    <Button color="error" onClick={() => handleRemoveField(index)} sx={{ ml: 1 }}>
                      <DeleteIcon />
                    </Button>
                  )}
                </Box>
              ))}
              {state === 'edit' && (
                <Button
                  variant="text"
                  color="warning"
                  onClick={handleAddField}
                  sx={{ mt: 1, mb: 3 }}
                  startIcon={<Iconify icon={'typcn:plus'} />}
                >
                  Thêm kiến thức mới
                </Button>
              )}
            </Grid>

            <Grid size={12}>
              <FieldTitle title="Nội dung khóa học" fontSize={18} />
              {chapters.map((chapter, index) => (
                <Box
                  key={chapter._id}
                  sx={{
                    mb: 5,
                    pl: 2,
                    borderLeft: index !== chapters.length - 1 ? '1px dashed #B5B5B5' : 'none',
                  }}
                >
                  <Box display="flex" alignItems="center" mb={2} gap={2}>
                    <FieldTitle
                      title="Tên Chương"
                      fontSize={16}
                      sx={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
                      required
                    />
                    <TextField
                      variant="outlined"
                      value={chapter.name}
                      onChange={(e) => handleChapterNameChange(chapter._id, e.target.value)}
                      size="small"
                      placeholder="Nhập tên chương..."
                      fullWidth
                    />
                    {state === 'edit' && (
                      <Button
                        color="error"
                        onClick={() => handleDeleteChapter(chapter._id)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon />
                      </Button>
                    )}
                  </Box>

                  {chapter.lessons.map((lesson) => (
                    <Box key={lesson._id} sx={{ ml: 4, mb: 2 }}>
                      <Box display="flex" alignItems="center" mb={1} gap={2}>
                        <FieldTitle
                          title="Tên bài học"
                          fontSize={16}
                          sx={{ minWidth: 'fit-content', whiteSpace: 'nowrap' }}
                          required
                        />
                        <TextField
                          variant="outlined"
                          value={lesson.name}
                          onChange={(e) =>
                            handleLessonNameChange(chapter._id, lesson._id, e.target.value)
                          }
                          size="small"
                          placeholder="Nhập tên bài học..."
                          fullWidth
                        />

                        {state === 'edit' && (
                          <Button
                            color="error"
                            onClick={() => handleDeleteLesson(chapter._id, lesson._id)}
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon />
                          </Button>
                        )}
                      </Box>

                      <Box sx={{ ml: 2 }}>
                        {!lesson.videoPreview || !lesson.videoUrl ? (
                          <>
                            <input
                              type="file"
                              accept="video/*"
                              onChange={(e) => handleVideoUpload(chapter._id, lesson._id, e)}
                              style={{ display: 'none' }}
                              id={`video-upload-${lesson._id}`}
                            />
                            <label htmlFor={`video-upload-${lesson._id}`}>
                              <LoadingButton
                                variant="outlined"
                                color="info"
                                component="span"
                                startIcon={<Iconify icon="mdi:upload" />}
                                loading={loading}
                              >
                                Upload Video
                              </LoadingButton>
                            </label>
                          </>
                        ) : (
                          <Box>
                            {state === 'edit' && (
                              <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleDeleteVideo(chapter._id, lesson._id)}
                                startIcon={<DeleteIcon />}
                              >
                                Xóa Video
                              </Button>
                            )}
                            <Box mt={2}>
                              <video
                                width="100%"
                                controls
                                controlsList="noplaybackrate nofullscreen nodownload"
                                disablePictureInPicture
                              >
                                <source src={lesson.videoPreview} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </Box>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  ))}

                  {state === 'edit' && (
                    <Button
                      variant="text"
                      color="warning"
                      onClick={() => handleAddLesson(chapter._id)}
                      startIcon={<Iconify icon="mdi:plus" />}
                      sx={{ ml: 4, mt: 1 }}
                    >
                      Thêm bài học
                    </Button>
                  )}
                </Box>
              ))}

              {state === 'edit' && (
                <Button
                  variant="outlined"
                  color="warning"
                  onClick={handleAddChapter}
                  startIcon={<Iconify icon="mdi:plus" />}
                  sx={{ mt: 2, mb: 3 }}
                >
                  Thêm Chương
                </Button>
              )}
            </Grid>

            <Grid size={12}>
              <Box display="flex" alignItems="top" gap={1}>
                <FieldTitle title="Giá khóa học" fontSize={18} />
                <Tooltip title="Nếu không nhập giá, khóa học sẽ được coi là miễn phí." arrow>
                  <Iconify
                    icon="mdi:information-outline"
                    style={{ cursor: 'pointer' }}
                    color="text.disabled"
                  />
                </Tooltip>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <TextField
                  {...register('price')}
                  variant="outlined"
                  fullWidth
                  size="small"
                  placeholder="Nhập giá khóa học"
                  value={
                    methods.watch('price')
                      ? new Intl.NumberFormat('vi-VN').format(methods.watch('price'))
                      : data?.price
                  }
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
                    methods.setValue('price', rawValue ? Number(rawValue) : 0); // Store as a number
                  }}
                />
              </Box>
            </Grid>

            <Grid size={12}>
              <ImageUploader
                setValue={setValue}
                getValues={getValues}
                imageUrl={getValues('image_course')}
                state={state}
              />
            </Grid>

            {state === 'edit' && (
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                alignItems="center"
                sx={{ width: '100%' }}
              >
                <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
                  Lưu
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={handleExitCourse}
                >
                  Hủy
                </Button>
              </Stack>
            )}
          </Grid>
        </form>
      </FormProvider>

      {exitCourse && (
        <ExitDialog
          open={exitCourse}
          onClose={() => setExitCourse(false)}
          onExit={() => router(`/manage/courses/list`)}
        />
      )}
    </Box>
  );
};
