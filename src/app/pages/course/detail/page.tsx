import { useParams } from 'react-router-dom';

export const CourseDetail = () => {
  const params = useParams();
  const { id } = params;
  console.log(id);
  return <h1>{id} abc</h1>;
};
