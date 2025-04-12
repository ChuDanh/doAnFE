import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = localStorage.getItem('data');
    setData(fetchData || '');
  }, []);

  return (
    <div>
      <h1>{data}</h1>
      <p>This is a simple React application.</p>
    </div>
  );
}
