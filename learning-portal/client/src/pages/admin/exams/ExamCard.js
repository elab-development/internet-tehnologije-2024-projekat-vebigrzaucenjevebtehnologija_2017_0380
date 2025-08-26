import { useNavigate } from 'react-router-dom';
import { Col } from 'antd';

import images from '../../../assets/images';

const ExamCard = ({ exam }) => {
  const navigate = useNavigate();

  const returnImage = () => {
    switch (exam.category) {
      case 'html':
        return images.html;
      case 'css':
        return images.css;
      case 'js':
        return images.js;
      case 'node':
        return images.node;
      case 'python':
        return images.python;
      case 'php':
        return images.php;
      case 'react':
        return images.react;
      default:
        return images.js;
    }
  };

  const image = returnImage();

  return (
    <Col span={6}>
      <div
        className='exam-card flex flex-col gap-1 p-2 bg-white pointer radius-10'
        onClick={() => {
          navigate(`/user/write-exam/${exam._id}`);
        }}
      >
        <div className='flex justify-between'>
          <span className='text-2xl'>{exam.name}</span>
          <img
            className='exam-category-icon'
            src={image}
            alt={exam.category + exam.name}
          />
        </div>

        <div className='divider'></div>
        <span className='text-md'>Category: {exam.category}</span>
        <span className='text-md'>Questions: {exam.totalMarks}</span>
        <span className='text-md'>Passing marks: {exam.passingMarks}</span>
        <span className='text-md'>Duration: {exam.duration} seconds</span>
      </div>
    </Col>
  );
};

export default ExamCard;
