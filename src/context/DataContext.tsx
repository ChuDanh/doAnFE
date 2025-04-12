import { createContext, useContext } from 'react';

interface DataContextType {
  data: string;
  setData: (data: string) => void;
  count: number;
  setCount: (count: number) => void;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
