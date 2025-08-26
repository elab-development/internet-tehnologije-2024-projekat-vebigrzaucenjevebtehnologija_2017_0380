import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './pages/common/login/Login';
import Register from './pages/common/register/Register';
import Home from './pages/common/home/Home';

import Exams from './pages/admin/exams/Exams';
import AddEditExam from './pages/admin/exams/AddEditExam';
import Exam from './pages/user/exam/Exam';
import Reports from './pages/user/attempts/Reports';
import AdminReports from './pages/admin/reports/Reports';

import ProtectedRoute from './components/ProtectedRoute';
import LoaderSpinner from './components/LoaderSpinner';

function App() {
  const { loading } = useSelector((state) => state.loader);

  return (
    <>
      {loading && <LoaderSpinner />}
      <BrowserRouter>
        <Routes>
          {/* Common Routes */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          {/* User Routes */}
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/write-exam/:id'
            element={
              <ProtectedRoute>
                <Exam />
              </ProtectedRoute>
            }
          />
          <Route
            path='/user/reports'
            element={
              <ProtectedRoute>
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path='/admin/exams'
            element={
              <ProtectedRoute>
                <Exams />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/exams/add'
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/exams/edit/:id'
            element={
              <ProtectedRoute>
                <AddEditExam />
              </ProtectedRoute>
            }
          />
          <Route
            path='/admin/reports'
            element={
              <ProtectedRoute>
                <AdminReports />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
