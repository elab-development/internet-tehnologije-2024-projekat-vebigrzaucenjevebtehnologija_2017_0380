import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, message } from 'antd';
import moment from 'moment';

import PageTitle from '../../../components/PageTitle';
import { hideLoading, showLoading } from '../../../redux/loaderSlice';
import { getReports } from '../../../api/reports';

const AdminReports = () => {
  const [reportsData, setReportsData] = useState([]);
  const [filters, setFilters] = useState({
    examName: '',
    userName: '',
  });

  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Exam',
      dataIndex: 'examName',
      render: (text, record) => <>{record.exam.name}</>,
    },
    {
      title: 'User',
      dataIndex: 'username',
      render: (text, record) => <>{record.user.name}</>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      render: (text, record) => (
        <>{moment(record.createdAt).format('DD.MM.YYYY. HH:mm')}</>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      render: (text, record) => (
        <>{`${record.result.correctAnswers.length}/${record.exam.totalMarks}`}</>
      ),
    },
    {
      title: 'Result',
      dataIndex: 'verdict',
      render: (text, record) => (
        <>
          {record.result.verdict === 'Pass' ? (
            <span className='text-color-success text-bold'>
              {record.result.verdict}
            </span>
          ) : (
            <span className='text-color-tertiary text-bold'>
              {record.result.verdict}
            </span>
          )}
        </>
      ),
    },
  ];

  const getData = async (tempFilters) => {
    try {
      dispatch(showLoading());

      const response = await getReports(tempFilters);
      if (response.success) {
        setReportsData(response.data);
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
    getData(filters);
  }, []);

  return (
    <div className='pt-2'>
      <PageTitle title='Reports' />
      <div className='divider-title'></div>
      <div className='flex pf-2 gap-1'>
        <input
          className='filter'
          type='text'
          placeholder='Exam'
          value={filters.examName}
          onChange={(e) => setFilters({ ...filters, examName: e.target.value })}
        />
        <input
          className='filter'
          type='text'
          placeholder='User'
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />

        <button
          className='primary-contained-btn'
          onClick={() => getData(filters)}
        >
          SEARCH
        </button>
        <button
          className='primary-outlined-icon-btn'
          onClick={() => {
            setFilters({
              examName: '',
              userName: '',
            });
            getData({
              examName: '',
              userName: '',
            });
          }}
        >
          <i className='ri-close-line text-2xl'></i>
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={reportsData}
        pagination={{
          defaultPageSize: 6,
        }}
        className='table-px-2'
      ></Table>
    </div>
  );
};

export default AdminReports;
