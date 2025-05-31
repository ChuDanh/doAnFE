import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../app/pages/home/Home.tsx';
import { MyCourses } from '../app/pages/my-courses/my-courses.tsx';
import { CourseDetail } from '../app/pages/course/detail/page.tsx';
import { LessonPage } from '../app/pages/course/learning/view/page.tsx';
import { LearningPath } from '../app/pages/learning-path/view/page.tsx';
import { LearningPathDetail } from '../app/pages/learning-path/detail/page.tsx';
import { CartPage } from '../app/pages/cart/page.tsx';
import { ManageCoursesList } from '../app/pages/manage/courses/list/page.tsx';
import { DetailEditCourse } from '../app/pages/manage/courses/detail-edit/detail-edit-course.tsx';
import { AddCourse } from '../app/pages/manage/courses/new/add-course.tsx';
import { SearchResult } from '../app/pages/course/search-result/search_result.tsx';
import { LearningPathPage } from '../app/pages/manage/learning-path/list/page.tsx';
import { AddLearningPathPage } from '../app/pages/manage/learning-path/new/page.tsx';
import { MyProfilePage } from '../app/pages/my-profile/page.tsx';

export default function Paths() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/courses" replace />} />

      {/*courses list*/}
      <Route path="/courses" element={<Home />} />
      <Route path="/course/:id" element={<CourseDetail />} />
      <Route path="/course/learning/:id" element={<LessonPage />} />
      <Route path="/course/search" element={<SearchResult />} />

      {/*learning path*/}
      <Route path="/learning-path" element={<LearningPath />} />
      <Route path="/learning-path/:id" element={<LearningPathDetail />} />

      {/*  my course*/}
      <Route path="/my-courses" element={<MyCourses />} />

      {/*  cart*/}
      <Route path="/cart" element={<CartPage />} />

      {/* manage courses  */}
      <Route path="/manage/courses/list" element={<ManageCoursesList />} />
      <Route path="/manage/courses/edit/:id" element={<DetailEditCourse state="edit" />} />
      <Route path="/manage/courses/detail/:id" element={<DetailEditCourse state="detail" />} />
      <Route path="/manage/courses/add" element={<AddCourse />} />

      {/*  manage learning path*/}
      <Route path="/manage/learning-path/list" element={<LearningPathPage />} />
      <Route path="/manage/learning-path/add" element={<AddLearningPathPage />} />

      {/*  my profile*/}
      <Route path="/my-profile" element={<MyProfilePage />} />
    </Routes>
  );
}
