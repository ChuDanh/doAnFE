import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { DataContext } from '../context/DataContext';
import Home from './pages/home/Home.tsx';
import Dashboard from './pages/dashboard/Dashboard.tsx';
import { MyCourses } from './pages/my-courses/my-courses.tsx';
import { CourseDetail } from './pages/course/detail/page.tsx';

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
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
      </Routes>
    </DataContext.Provider>
  );
}
