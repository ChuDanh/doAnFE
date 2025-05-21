import { createContext, useContext } from 'react';

type UserProps = {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  role: string;
  total_courses: string;
  total_prices: string;
};

interface DataContextType {
  data: UserProps;
  mutate: () => Promise<void>;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
