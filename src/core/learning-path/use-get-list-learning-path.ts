import useSWR from 'swr';
import { TLearningPath } from './types.ts';

export const useGetListLearningPath = () => {
  return useSWR<TLearningPath[]>('http://localhost:3001/v1/learning_path', async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch learning paths');
    }
    return response.json();
  });
};
