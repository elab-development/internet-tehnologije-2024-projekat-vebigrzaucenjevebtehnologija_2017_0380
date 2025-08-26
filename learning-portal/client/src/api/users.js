const { default: axiosInstance } = require('.');

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/users/register',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/users/login',
      payload
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post(
      'http://localhost:5000/api/users/get-user-info'
    );
    return response.data;
  } catch (err) {
    return err.response.data;
  }
};
