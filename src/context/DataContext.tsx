import { createContext, useContext } from 'react';
import { TUserProfile } from '../core/types.ts';
import { KeyedMutator } from 'swr';

interface DataContextType {
  data: TUserProfile | undefined; // Allow undefined for compatibility
  mutate: KeyedMutator<TUserProfile>; // Use the correct type for mutate
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
