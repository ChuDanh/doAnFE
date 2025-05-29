import useSWR from 'swr';
import { TCourseList } from '../types.ts';

export const useGetCourseList = (keyword?: string) => {
  const query = keyword ? `?keyword=${encodeURIComponent(keyword)}` : '';
  return useSWR<TCourseList>(`http://localhost:3001/v1/course${query}`, async (url: any) => {
    const res = await fetch(url);
    return res.json();
  });
};
