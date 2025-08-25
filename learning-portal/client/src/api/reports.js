const { default: axiosInstance } = require('.');

export const addReport = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/reports/add-report',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getReports = async (filters) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/reports/get-all-reports',
      filters
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getUserReports = async () => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/reports/get-all-reports-by-user'
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
