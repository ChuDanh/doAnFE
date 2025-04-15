import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [userData, setUserData] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = localStorage.getItem('data');
    setUserData(fetchData || '');
  }, []);

  return (
    <DataContext.Provider value={{ data: userData, setData: setUserData, count, setCount }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </DataContext.Provider>
  );
}
