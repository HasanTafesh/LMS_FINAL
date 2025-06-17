import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import { FaBook, FaGraduationCap } from 'react-icons/fa';

const LearningDashboard = () => {
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const styles = {
    hoverShadow: {
      transition: 'all 0.3s ease',
    },
    hoverShadowHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important',
    },
    transitionAll: {
      transition: 'all 0.3s ease',
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/courses/enrolled');
      setEnrolledCourses(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <FaGraduationCap className="text-primary me-3" size={32} />
        <h1 className="mb-0">Learning Dashboard</h1>
      </div>

      {/* Stats Overview */}
      <div className="row mb-5">
        <div className="col-md-12">
          <div 
            className="card border-0 shadow-sm hover-shadow transition-all"
            style={styles.hoverShadow}
            onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.hoverShadowHover)}
            onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.hoverShadow)}
          >
            <div className="card-body p-4">
              <div className="d-flex align-items-center">
                <div className="bg-primary bg-opacity-10 p-3 rounded-circle me-3">
                  <FaBook className="text-primary" size={24} />
                </div>
                <div>
                  <h5 className="card-title text-muted mb-1">Enrolled Courses</h5>
                  <p className="display-4 mb-0 fw-bold">{enrolledCourses.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <h2 className="h4 mb-4 d-flex align-items-center">
            <FaBook className="text-primary me-2" />
            Your Courses
          </h2>
          {enrolledCourses.length === 0 ? (
            <div className="text-center py-5">
              <FaBook className="text-muted mb-3" size={48} />
              <p className="text-muted h5">You haven&apos;t enrolled in any courses yet.</p>
              <button 
                className="btn btn-primary mt-3"
                onClick={() => navigate('/courses')}
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="row g-4">
              {enrolledCourses.map((course) => (
                <div key={course.id} className="col-md-6 col-lg-4">
                  <div 
                    className="card h-100 border-0 shadow-sm hover-shadow transition-all"
                    style={styles.hoverShadow}
                    onMouseOver={(e) => Object.assign(e.currentTarget.style, styles.hoverShadowHover)}
                    onMouseOut={(e) => Object.assign(e.currentTarget.style, styles.hoverShadow)}
                  >
                    {course.thumbnail && (
                      <div className="position-relative">
                        <img
                          src={`http://localhost:5000/${course.thumbnail.replace(/\\/g, '/')}`}
                          className="card-img-top"
                          alt={course.title}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div className="card-body p-4">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text">{course.category}</p>
                      <p className="card-text">Instructor: {course.instructor}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <button
                          className="btn btn-primary"
                          onClick={() => navigate(`/courses/${course.id}/learn`)}
                        >
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard; 