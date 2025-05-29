export type TLesson = {
  id: string;
  name: string;
  videoUrl?: string;
  videoPreview?: string;
  loading?: boolean;
  duration?: number;
};

export type TChapter = {
  id: string;
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
  };
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
