import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import axios from '../../config/axios';
import { toast } from 'react-toastify';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);

  const fetchCourseDetails = useCallback(async () => {
    if (!id) {
      toast.error('Invalid course ID');
      navigate('/courses');
      return;
    }

    try {
      // console.log('Fetching course details for:', id);
      const response = await axios.get(`/api/courses/${id}`);
      // console.log('Course details:', JSON.stringify(response.data, null, 2));
      
      if (!response.data) {
        throw new Error('Course not found');
      }
      
      setCourse(response.data);
      
      if (isAuthenticated && user?.role === 'student') {
        try {
          const enrollmentResponse = await axios.get(`/api/courses/${id}/enrollment`);
          setEnrolled(enrollmentResponse.data.enrolled);
        } catch (error) {
          // console.error('Error checking enrollment:', error);
          // Don't show error toast for enrollment check
        }
      }
    } catch (error) {
      // console.error('Error fetching course:', error);
      const errorMessage = error.response?.status === 400 
        ? 'Invalid course ID. Please select a course from the catalog.'
        : error.response?.data?.message || 'Failed to fetch course details';
      toast.error(errorMessage);
      navigate('/courses');
    } finally {
      setLoading(false);
    }
  }, [id, isAuthenticated, user?.role, navigate]);

  useEffect(() => {
    fetchCourseDetails();
  }, [fetchCourseDetails]);

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/courses/${id}` } });
      return;
    }

    if (user?.role === 'instructor') {
      toast.error('Instructors cannot enroll in courses');
      return;
    }

    try {
      await axios.post(`/api/courses/${id}/enroll`);
      setEnrolled(true);
      toast.success('Successfully enrolled in the course!');
      navigate(`/courses/${id}/learn`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to enroll in course');
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

  if (!course) {
    return (
      <div className="container py-5 text-center">
        <h3>Course not found</h3>
        <p className="text-muted">The course you&apos;re looking for doesn&apos;t exist.</p>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/courses')}>
          Back to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row mb-4 align-items-start">
        <div className="col-lg-8">
          <h1 className="mb-3">{course.title}</h1>
          <p className="lead">{course.description}</p>

          {/* What You'll Learn */}
          {course.learningObjectives?.length > 0 && (
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="h4 mb-4">What you&apos;ll learn</h2>
                <div className="row">
                  {course.learningObjectives.map((objective, index) => (
                    <div key={index} className="col-md-6 mb-3">
                      <div className="d-flex">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <span>{objective}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Course Content */}
          {course.modules?.length > 0 && (
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="h4 mb-4">Course content</h2>
                <div className="course-modules">
                  {course.modules.map((module, index) => (
                    <div key={index} className="module-item mb-4">
                      <h3 className="h5 mb-3">{module.title}</h3>
                      <div className="module-content">
                        <ul className="list-unstyled">
                          {module.lessons?.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="mb-2">
                              <div className="d-flex justify-content-between align-items-center">
                                <div>
                                  <i className="bi bi-play-circle me-2"></i>
                                  {lesson.title}
                                </div>
                                <span className="text-muted">
                                  {lesson.duration || 0} min
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Requirements */}
          {course.requirements?.length > 0 && (
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <h2 className="h4 mb-4">Requirements</h2>
                <ul className="list-unstyled">
                  {course.requirements.map((requirement, index) => (
                    <li key={index} className="mb-2">
                      <i className="bi bi-dot me-2"></i>
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Instructor */}
          {course.instructor && (
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h2 className="h4 mb-4">Instructor</h2>
                <div className="d-flex align-items-center mb-3">
                  {course.instructor.profilePicture && (
                    <img
                      src={course.instructor.profilePicture}
                      alt={`${course.instructor.firstName} ${course.instructor.lastName}`}
                      className="rounded-circle me-3"
                      style={{ width: '64px', height: '64px' }}
                    />
                  )}
                  <div>
                    <h3 className="h5 mb-1">
                      {course.instructor.firstName} {course.instructor.lastName}
                    </h3>
                    <p className="text-muted mb-0">
                      {course.instructor.bio || 'Course Instructor'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-course-card">
            {course.thumbnail && (
              <img
                src={`http://localhost:5000/${course.thumbnail.replace(/\\/g, '/')}`}
                className="card-img-top"
                alt={course.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
            )}
            <div className="card-body">
              {enrolled ? (
                <button
                  className="btn btn-success w-100"
                  onClick={() => navigate(`/courses/${id}/learn`)}
                >
                  Continue Learning
                </button>
              ) : user?.role === 'instructor' ? (
                <div className="alert alert-info mb-0">
                  <i className="bi bi-info-circle me-2"></i>
                  As an instructor, you cannot enroll in courses.
                </div>
              ) : (
                <button
                  className="btn btn-primary w-100"
                  onClick={handleEnroll}
                >
                  Enroll Now
                </button>
              )}
              <div className="mt-3">
                <h4 className="h6 mb-3">This course includes:</h4>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <i className="bi bi-infinity me-2"></i>
                    Full lifetime access
                  </li>
                  <li>
                    <i className="bi bi-phone me-2"></i>
                    Access on mobile and TV
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail; 