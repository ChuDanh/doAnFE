import { useData } from '../context/DataContext';

export default function Dashboard() {
  const { data, count, setCount } = useData();
  
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard</p>
      <p>Current data: {data}</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
