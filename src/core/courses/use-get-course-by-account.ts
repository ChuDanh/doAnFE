import useSWR from 'swr';
import { TCourse } from '../types.ts';

export const useGetCourseByAccount = () => {
  return useSWR<TCourse[]>('http://localhost:3001/v1/course/by-account', async (url: any) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return null;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  });
};
