import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, message } from 'antd';

import { loginUser } from '../../../api/users';
import { showLoading, hideLoading } from '../../../redux/loaderSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await loginUser(values);
      dispatch(hideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.data);
        navigate('/');
        window.location.reload(false);
      } else {
        message.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen w-screen bg-primary'>
      <div className='card w-400 p-3 bg-light radius-10'>
        <div className='flex flex-col'>
          <h1 className='text-2xl'>Start Learning</h1>
          <div className='divider'></div>
          <Form layout='vertical' className='mt-1' onFinish={onFinish}>
            <Form.Item name='email' label='Email'>
              <input type='text' />
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <input type='password' />
            </Form.Item>
            <button
              type='submit'
              className='primary-contained-btn mt-2 w-100 pointer'
            >
              LOGIN
            </button>
            <div className='mt-2 mb-m15 text-center'>
              <Link to='/register' className='text-color-primary'>
                Not a member yet? Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
