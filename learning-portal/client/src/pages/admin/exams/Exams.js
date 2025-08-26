import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Table, message } from 'antd';

import PageTitle from '../../../components/PageTitle';
import { showLoading, hideLoading } from '../../../redux/loaderSlice';
import { getAllExams, destroyExam } from '../../../api/exams';

const Exams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exams, setExams] = useState([]);

  const columns = [
    {
      title: 'Exam',
      dataIndex: 'name',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Total Questions',
      dataIndex: 'totalMarks',
    },
    {
      title: 'Passing Marks',
      dataIndex: 'passingMarks',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (text, record) => (
        <div className='flex gap-1 items-center'>
          <i
            className='ri-edit-box-line pointer table-action'
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)}
          ></i>
          <i
            className='ri-delete-bin-line pointer table-action-delete'
            onClick={() => deleteExam(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  const getExamsData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllExams();
      dispatch(hideLoading());
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const deleteExam = async (examId) => {
    try {
      dispatch(showLoading());
      const response = await destroyExam({ examId });
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    getExamsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className='flex justify-between items-center pt-2'>
        <PageTitle title='Exams' />
        <button
          className='primary-outlined-btn flex items-center pointer mr-2'
          onClick={() => navigate('/admin/exams/add')}
        >
          <i className='ri-add-line'></i>
          Add Exam
        </button>
      </div>
      <div className='divider-title'></div>

      <Table
        columns={columns}
        dataSource={exams}
        pagination={{
          defaultPageSize: 6,
        }}
        className='table-px-2'
      />
    </div>
  );
};

export default Exams;
