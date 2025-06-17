import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import { toast } from 'react-toastify';

const CourseCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error(error.response?.data?.message || 'Failed to fetch courses');
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
      <h1 className="mb-4">Available Courses</h1>
      {courses.length === 0 ? (
        <div className="text-center py-5">
          <h3>No courses available</h3>
          <p className="text-muted">There are no published courses at the moment.</p>
        </div>
      ) : (
        <div className="row g-4">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <div className="card h-100">
                {course.thumbnail && (
                  <img
                    src={course.thumbnail}
                    className="card-img-top"
                    alt={course.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text text-muted">
                    {course.description?.substring(0, 100)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary">{course.category}</span>
                    <span className="badge bg-secondary">{course.level}</span>
                  </div>
                </div>
                <div className="card-footer bg-white border-top-0">
                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-primary w-100"
                  >
                    View Course
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCatalog; 