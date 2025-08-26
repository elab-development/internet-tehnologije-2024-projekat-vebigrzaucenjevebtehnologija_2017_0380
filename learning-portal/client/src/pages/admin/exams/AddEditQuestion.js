import { useDispatch } from 'react-redux';
import { Form, Modal, message } from 'antd';

import { addQuestion, editQuestion } from '../../../api/exams';
import { showLoading, hideLoading } from '../../../redux/loaderSlice';

const AddEditQuestion = ({
  showQuestionModal,
  setShowQuestionModal,
  examId,
  refreshData,
  selectedQuestion,
  setSelectedQuestion,
}) => {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };

      let response;
      if (selectedQuestion) {
        response = await editQuestion({
          ...requiredPayload,
          questionId: selectedQuestion._id,
        });
      } else {
        response = await addQuestion(requiredPayload);
      }

      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowQuestionModal(false);
      } else {
        message.error(response.message);
      }

      setSelectedQuestion(null);
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  return (
    <Modal
      title={selectedQuestion ? 'Edit Question' : 'Add Question'}
      visible={showQuestionModal}
      footer={false}
      onCancel={() => {
        setShowQuestionModal(false);
        setSelectedQuestion(null);
      }}
    >
      <div className='divider mb-1'></div>
      <Form
        onFinish={onFinish}
        layout='vertical'
        initialValues={{
          name: selectedQuestion?.name,
          A: selectedQuestion?.options?.A,
          B: selectedQuestion?.options?.B,
          C: selectedQuestion?.options?.C,
          D: selectedQuestion?.options?.D,
          correctOption: selectedQuestion?.correctOption,
        }}
      >
        <Form.Item name='name' label='Question:'>
          <input type='text' autocomplete />
        </Form.Item>
        <Form.Item name='correctOption' label='Correct answer:'>
          <input type='text' autocomplete />
        </Form.Item>
        <div className='flex justify-between'>
          <Form.Item name='A' label='Option A:'>
            <input type='text' autocomplete />
          </Form.Item>
          <Form.Item name='B' label='Option B:'>
            <input type='text' autocomplete />
          </Form.Item>
        </div>
        <div className='flex justify-between'>
          <Form.Item name='C' label='Option C:'>
            <input type='text' autocomplete />
          </Form.Item>
          <Form.Item name='D' label='Option D:'>
            <input type='text' autocomplete />
          </Form.Item>
        </div>

        <div className='flex justify-end gap-2 mt-2'>
          <button
            className='primary-outlined-modal-btn pointer'
            type='button'
            onClick={() => {
              setShowQuestionModal(false);
              setSelectedQuestion(null);
            }}
          >
            Cancel
          </button>
          <button className='primary-contained-modal-btn pointer' type='submit'>
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEditQuestion;
