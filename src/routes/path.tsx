import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../app/pages/home/Home.tsx';
import { MyCourses } from '../app/pages/my-courses/my-courses.tsx';
import { CourseDetail } from '../app/pages/course/detail/page.tsx';
import { LessonPage } from '../app/pages/course/learning/view/page.tsx';
import { LearningPath } from '../app/pages/learning-path/view/page.tsx';
import { LearningPathDetail } from '../app/pages/learning-path/detail/page.tsx';
import { CartPage } from '../app/pages/cart/page.tsx';

export default function Paths() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/courses" replace />} />

      {/*courses list*/}
      <Route path="/courses" element={<Home />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path="/course/learning" element={<LessonPage />} />

      {/*learning path*/}
      <Route path="/learning-path" element={<LearningPath />} />
      <Route path="/learning-path/:id" element={<LearningPathDetail />} />

      {/*  my course*/}
      <Route path="/my-courses" element={<MyCourses />} />

      {/*  cart*/}
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}
