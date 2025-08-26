import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, message } from 'antd';

import PageTitle from '../../../components/PageTitle';

import { getAllExams } from '../../../api/exams';
import { showLoading, hideLoading } from '../../../redux/loaderSlice';
import ExamCard from '../../admin/exams/ExamCard';

const Home = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);
  const [exams, setExams] = useState([]);

  const getExams = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllExams();
      if (response.success) {
        const filteredExams = response.data?.filter(
          (exam) => exam.questions.length === exam.totalMarks
        );
        setExams(filteredExams);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    getExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='pt-2'>
      <PageTitle
        title={`Welcome ${user?.name.split(' ')[0]}, evaluate your knowledge`}
      />
      <div className='divider-title'></div>
      <Row gutter={[16, 16]} className='px-2 w-90'>
        {exams.map((exam) => (
          <ExamCard exam={exam} />
        ))}
      </Row>
    </div>
  );
};

export default Home;
