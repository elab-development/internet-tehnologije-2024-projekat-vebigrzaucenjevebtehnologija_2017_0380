import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Table, message } from 'antd';
import moment from 'moment';

import PageTitle from '../../../components/PageTitle';
import { hideLoading, showLoading } from '../../../redux/loaderSlice';
import { getUserReports } from '../../../api/reports';

const Reports = () => {
  const [reportsData, setReportsData] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Exam',
      dataIndex: 'examName',
      render: (text, record) => <>{record.exam.name}</>,
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

  const getData = async () => {
    try {
      dispatch(showLoading());

      const response = await getUserReports();
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
    getData();
  }, []);

  return (
    <div className='pt-2'>
      <PageTitle title='Your attempts' />
      <div className='divider-title'></div>
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

export default Reports;
