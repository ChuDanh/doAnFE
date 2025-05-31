import useSWR from 'swr';
import { TLearningCourse } from '../types.ts';

export const useGetLearningCourseById = (courseId: string) => {
  return useSWR<TLearningCourse>(
    ` http://localhost:3001/v1/learning_course/${courseId}`,
    async (url: any) => {
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return res.json();
    }
  );
};
