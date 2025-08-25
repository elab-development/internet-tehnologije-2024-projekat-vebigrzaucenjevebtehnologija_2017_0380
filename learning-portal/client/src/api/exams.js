const { default: axiosInstance } = require('.');

// Get Exams
export const getAllExams = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/exams/get-all-exams',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// Get Exam
export const getExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/exams/get-exam-by-id',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// Add Exam
export const addExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/exams/add',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// Edit Exam
export const editExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/exams/edit-exam-by-id',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// Delete Exam delete-exam-by-id
export const destroyExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/exams/delete-exam-by-id',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// Add Question to Exam
export const addQuestion = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/exams/add-question-to-exam',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// Edit Question
export const editQuestion = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/exams/edit-question-in-exam',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

// Delete Question
export const destroyQuestion = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/exams/delete-question-in-exam',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
