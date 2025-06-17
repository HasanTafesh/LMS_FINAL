import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './styles/global.css';
import { useAuth } from './contexts/AuthContext';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Auth Components
import ProtectedRoute from './pages/auth/ProtectedRoute.jsx';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Profile from './pages/Profile';
import CourseDetail from './pages/courses/CourseDetail';
import CourseCatalog from './pages/courses/CourseCatalog';
import CreateCourse from './pages/courses/CreateCourse';
import EditCourse from './pages/courses/EditCourse';
import CourseContentManager from './pages/courses/CourseContentManager';
import CourseContent from './pages/courses/CourseContent';
import LearningDashboard from './pages/dashboard/LearningDashboard';
import InstructorDashboard from './pages/dashboard/InstructorDashboard';

// Dashboard Redirect Component
const DashboardRedirect = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" />;
  
  switch (user.role) {
    case 'student':
      return <Navigate to="/dashboard/learning" />;
    case 'instructor':
      return <Navigate to="/dashboard/instructor" />;
    default:
      return <Navigate to="/" />;
  }
};

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <main className="flex-grow-1">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<CourseCatalog />} />
            <Route path="/courses/:id" element={<CourseDetail />} />

            {/* Dashboard Redirect */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRedirect />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Student Routes */}
            <Route
              path="/dashboard/learning"
              element={
                <ProtectedRoute roles={['student']}>
                  <LearningDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:id/learn"
              element={
                <ProtectedRoute roles={['student']}>
                  <CourseContent />
                </ProtectedRoute>
              }
            />

            {/* Instructor Routes */}
            <Route
              path="/dashboard/instructor"
              element={
                <ProtectedRoute roles={['instructor']}>
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:courseId/content"
              element={
                <ProtectedRoute roles={['instructor']}>
                  <CourseContentManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/create"
              element={
                <ProtectedRoute roles={['instructor']}>
                  <CreateCourse />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courses/:id/edit"
              element={
                <ProtectedRoute roles={['instructor']}>
                  <EditCourse />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Zoom}
          icon={false}
        />
      </div>
    </Router>
  );
}

export default App; 