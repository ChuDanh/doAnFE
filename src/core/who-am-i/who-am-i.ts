import useSWR from 'swr';
import { TUserProfile } from '../types.ts';

export const WhoAmI = () => {
  return useSWR<TUserProfile>('http://localhost:3001/v1/users/profile', async (url: string) => {
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
