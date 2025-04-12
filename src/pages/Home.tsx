import { useData } from '../context/DataContext';

export default function Home() {
  const { data, count } = useData();
  
  return (
    <div>
      <h1>{data}</h1>
      <p>Welcome to the Home page</p>
      <p>Current count: {count}</p>
    </div>
  );
}
