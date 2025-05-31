import useSWR from 'swr';
import { TLearningPath } from './types.ts';

export const useGetLearningPathById = ({ _id }: { _id: string }) => {
  return useSWR<TLearningPath>(
    `http://localhost:3001/v1/learning_path/${_id}`,
    async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch learning path');
      }
      return response.json();
    }
  );
};
