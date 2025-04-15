import { useEffect, useState } from 'react';
import { useData } from '../../context/DataContext.tsx';

type UserProps = {
  full_name: string;
  username: string;
  email: string;
  phone_number: string;
  address: string;
  total_courses: string;
  total_prices: string;
};

export default function Home() {
  const { data, count } = useData();

  const [formattedData, setFormattedData] = useState<UserProps>();

  useEffect(() => {
    if (data) {
      setFormattedData(JSON.parse(data));
    }
  }, [data]);

  return (
    <div>
      <h1>{formattedData?.full_name || 1}</h1>
      <p>Welcome to the Home page</p>
      <p>Current count: {count}</p>
    </div>
  );
}
