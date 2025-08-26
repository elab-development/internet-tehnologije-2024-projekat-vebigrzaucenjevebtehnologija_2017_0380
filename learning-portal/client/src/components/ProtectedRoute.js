import { useEffect, useState } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getUserInfo } from '../api/users';
import { setUser } from '../redux/usersSlice';
import { showLoading, hideLoading } from '../redux/loaderSlice';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMenu = [
    {
      title: 'Home',
      paths: ['/', '/user/write-exam'],
      icon: <i className='ri-home-line text-color-light'></i>,
      onClick: () => navigate('/'),
    },
    {
      title: 'Attempts',
      paths: ['/user/reports'],
      icon: <i className='ri-file-list-2-line text-color-light'></i>,
      onClick: () => navigate('/user/reports'),
    },
    {
      title: 'Logout',
      paths: ['/logout'],
      icon: <i className='ri-logout-box-line text-color-light'></i>,
      onClick: () => {
        localStorage.removeItem('token');
        navigate('/login');
      },
    },
  ];
  const adminMenu = [
    {
      title: 'Home',
      paths: ['/', '/user/write-exam'],
      icon: <i className='ri-home-line text-color-light'></i>,
      onClick: () => navigate('/'),
    },
    {
      title: 'Exams',
      paths: ['/admin/exams', '/admin/exams/add'],
      icon: <i className='ri-a-b text-color-light'></i>,
      onClick: () => navigate('/admin/exams'),
    },
    {
      title: 'Reports',
      paths: ['/admin/reports'],
      icon: <i className='ri-file-list-2-line text-color-light'></i>,
      onClick: () => navigate('/admin/reports'),
    },
    {
      title: 'Logout',
      paths: ['/logout'],
      icon: <i className='ri-logout-box-line text-color-light'></i>,
      onClick: () => {
        localStorage.removeItem('token');
        navigate('/login');
      },
    },
  ];

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await getUserInfo();
      dispatch(hideLoading());
      if (response.success) {
        dispatch(setUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (err) {
      navigate('/login');
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getUserData();
    } else {
      navigate('/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeRoute = window.location.pathname;

  const getIsActive = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes('/admin/exams/edit') &&
        paths.includes('/admin/exams')
      ) {
        return true;
      }
      if (
        activeRoute.includes('/user/write-exam') &&
        paths.includes('/user/write-exam')
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className='layout'>
      <div className='flex'>
        <div className='sidebar'>
          <div className='menu'>
            {menu.map((item, index) => {
              return (
                <div
                  className={`menu-item ${
                    getIsActive(item.paths) && 'active-menu-item'
                  }`}
                  key={index + item.title}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {collapsed && (
                    <span className='text-color-light'>{item.title}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className='body'>
          <div className='body-header flex justify-between items-center'>
            {collapsed ? (
              <i
                className='ri-close-line text-color-light text-2xl pointer'
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              ></i>
            ) : (
              <i
                className='ri-menu-2-line text-color-light text-2xl pointer'
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
              ></i>
            )}
            <span className='text-4xl text-color-light'>LEARNING PORTAL</span>
            <div className='flex gap-1 items-center pr-1'>
              <span className='text-xl text-color-light'>{user?.name}</span>
              <i className='ri-account-circle-line text-2xl text-color-light'></i>
            </div>
          </div>
          <div className='body-content-out'>
            <div className='body-content'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
