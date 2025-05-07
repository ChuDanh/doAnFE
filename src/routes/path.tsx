import { Route, Routes } from 'react-router-dom';
import Home from '../app/pages/home/Home.tsx';
import { MyCourses } from '../app/pages/my-courses/my-courses.tsx';
import { CourseDetail } from '../app/pages/course/detail/page.tsx';
import { LessonPage } from '../app/pages/course/learning/view/page.tsx';
import { DataContext } from '../context/DataContext.tsx';
import { useEffect, useState } from 'react';

export default function Paths() {
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const fetchData = localStorage.getItem('data');
    setUserData(fetchData || '');
  }, []);

  return (
    <DataContext.Provider value={{ data: userData, setData: setUserData }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/course/learning" element={<LessonPage />} />
      </Routes>
    </DataContext.Provider>
  );
}
