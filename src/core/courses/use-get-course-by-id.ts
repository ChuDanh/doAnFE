import useSWR from 'swr';
import { TCourse } from '../types.ts';

export const useGetCourseById = ({ _id }: { _id?: string }) => {
  return useSWR<TCourse>(`http://localhost:3001/v1/course/${_id}`, async (url: any) => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('Failed to fetch course');
    }
    return res.json();
  });
};
