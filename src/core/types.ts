export type TLesson = {
  _id: string;
  name: string;
  videoUrl?: string;
  videoPreview?: string;
  loading?: boolean;
  duration?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type TChapter = {
  _id: string;
  name: string;
  lessons: TLesson[];
};

export type TCourse = {
  _id: string;
  name: string;
  level: string;
  description: string;
  knowledge: string[];
  chapters: TChapter[];
  price: number;
  image_course: string;
  author: {
    _id: string;
    full_name: string;
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type TCourseList = {
  free_courses: TCourse[];
  pro_courses: TCourse[];
};

export enum ELevel {
  BASIC = 'basic',
  ADVANCED = 'advanced',
}

export type TUserProfile = {
  full_name: string;
  username: string;
  email: string;
  dob: string;
  phone_number: string;
  role: string;
  address: string;
  avatar: string;
  total_courses: string;
  total_prices: string;
};

export type TLearningProgress = {
  lesson: string;
  progress: number;
  _id: string;
};

export type TLearningCourse = {
  _id: string;
  course: TCourse;
  user: TUserProfile;
  is_paid: boolean;
  isLearning: boolean;
  process: number;
  lesson_progress: TLearningProgress[];
  createdAt: string;
  updatedAt: string;
};
