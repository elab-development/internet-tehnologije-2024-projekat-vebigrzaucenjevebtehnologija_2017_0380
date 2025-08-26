import { useEffect, useState } from 'react';
import { Col, Form, Row, Table, Tabs, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PageTitle from '../../../components/PageTitle';
import AddEditQuestion from './AddEditQuestion';

import {
  addExam,
  editExam,
  getExamById,
  destroyQuestion,
} from '../../../api/exams';
import { showLoading, hideLoading } from '../../../redux/loaderSlice';

const AddEditExam = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [examData, setExamData] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const params = useParams();

  const onFinish = async (values) => {
    try {
      let response;
      dispatch(showLoading());

      if (params.id) {
        response = await editExam({ ...values, examId: params.id });
      } else {
        response = await addExam(values);
      }

      if (response.success) {
        message.success(response.message);
        navigate('/admin/exams');
      } else {
        message.error(response.message);
      }

      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const getExamDetails = async () => {
    try {
      dispatch(showLoading());
      const response = await getExamById({ examId: params.id });
      dispatch(hideLoading());
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      getExamDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const deleteQuestion = async (questionId) => {
    try {
      dispatch(showLoading());
      const response = await destroyQuestion({
        questionId,
        examId: params.id,
      });
      dispatch(hideLoading());

      if (response.success) {
        message.success('Question deleted successfully');
        getExamDetails();
      } else {
        message.error(response.message);
      }
    } catch (err) {
      message.error(err.message);
    }
  };

  const questionsColumns = [
    {
      title: 'Question',
      dataIndex: 'name',
    },
    {
      title: 'Options',
      dataIndex: 'options',
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div
              key={key}
              className={`${
                key === record.correctOption
                  ? 'text-color-success text-bold'
                  : 'text-color-danger'
              } `}
            >
              {key} : {record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      render: (text, record) => (
        <div className='flex gap-1 items-center'>
          <i
            className='ri-edit-box-line pointer table-action'
            onClick={() => {
              setSelectedQuestion(record);
              setShowQuestionModal(true);
            }}
          ></i>
          <i
            className='ri-delete-bin-line pointer table-action-delete'
            onClick={() => {
              deleteQuestion(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div className='pt-2'>
      <PageTitle title={`${params.id ? 'Edit' : 'Add'} Exam`} />
      <div className='divider-title'></div>
      {(examData || !params.id) && (
        <Form
          layout='vertical'
          className='p-2'
          onFinish={onFinish}
          initialValues={examData}
        >
          <Tabs defaultActiveKey='1'>
            <Tabs.TabPane tab='Exam Details' key='1'>
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label='Exam Name:' name='name'>
                    <input type='text' autocomplete />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Exam Duration:' name='duration'>
                    <input type='number' autocomplete />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Category:' name='category'>
                    <select>
                      <option value='other'>Select Category</option>
                      <option value='html'>HTML</option>
                      <option value='css'>CSS</option>
                      <option value='javascript'>JavaScript</option>
                      <option value='php'>PHP</option>
                      <option value='python'>Python</option>
                      <option value='node'>Node.js</option>
                      <option value='react'>React</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Total Questions:' name='totalMarks'>
                    <input type='number' autocomplete />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label='Passing Marks:' name='passingMarks'>
                    <input type='number' autocomplete />
                  </Form.Item>
                </Col>
              </Row>
              <div className='flex justify-end gap-2'>
                <button
                  className='primary-outlined-btn flex items-center pointer gap-1 mt-2'
                  type='button'
                  onClick={() => navigate('/admin/exams')}
                >
                  <span className='text-lg'>Cancel</span>
                </button>
                <button
                  className='primary-contained-btn flex items-center pointer gap-1 mt-2'
                  type='submit'
                >
                  <i className='ri-save-3-line text-lg'></i>
                  <span className='text-lg'>Save</span>
                </button>
              </div>
            </Tabs.TabPane>
            {params.id && (
              <Tabs.TabPane tab='Questions' key='2'>
                <div className='flex justify-end mb-1'>
                  <button
                    className='primary-outlined-icon-btn flex items-center pointer'
                    type='button'
                    onClick={() => setShowQuestionModal(true)}
                  >
                    <i className='ri-add-line text-xl'></i>
                    <span>ADD QUESTION</span>
                  </button>
                </div>
                <Table
                  columns={questionsColumns}
                  dataSource={examData?.questions || []}
                  pagination={{
                    defaultPageSize: 2,
                  }}
                  className='table-px-1'
                ></Table>
              </Tabs.TabPane>
            )}
          </Tabs>
        </Form>
      )}

      {showQuestionModal && (
        <AddEditQuestion
          showQuestionModal={showQuestionModal}
          setShowQuestionModal={setShowQuestionModal}
          examId={params.id}
          refreshData={getExamDetails}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
        />
      )}
    </div>
  );
};

export default AddEditExam;
