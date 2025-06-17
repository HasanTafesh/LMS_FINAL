import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../config/axios';
import { toast } from 'react-toastify';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesResponse, studentsResponse] = await Promise.all([
        axios.get('/api/courses/instructor'),
        axios.get('/api/courses/students/instructor')
      ]);
      setCourses(coursesResponse.data);
      setStudents(studentsResponse.data);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Instructor Dashboard</h1>
        <Link to="/courses/create" className="btn btn-primary">
          Create New Course
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Courses</h5>
              <h2 className="display-4 mb-0">{courses.length}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Students</h5>
              <h2 className="display-4 mb-0">{students.length}</h2>
            </div>
          </div>
        </div>
      </div>

      {/* My Courses */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-4">My Courses</h2>
              {courses.length === 0 ? (
                <div className="text-center py-4">
                  <p className="mb-3">You haven&apos;t created any courses yet.</p>
                  <Link to="/courses/create" className="btn btn-primary">
                    Create Your First Course
                  </Link>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Course</th>
                        <th>Students</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courses.map((course) => (
                        <tr key={course.id}>
                          <td>
                            <div>
                              <h6 className="mb-0">{course.title}</h6>
                              <small className="text-muted">
                                {course.category}
                              </small>
                            </div>
                          </td>
                          <td>{course.students}</td>
                          <td className="text-end">
                            <div className="btn-group">
                              <Link
                                to={`/courses/${course.id}/edit`}
                                className="btn btn-sm btn-outline-primary"
                              >
                                <i className="bi bi-pencil me-1"></i>
                                Edit
                              </Link>
                              <Link
                                to={`/courses/${course.id}/content`}
                                className="btn btn-sm btn-outline-success"
                              >
                                <i className="bi bi-gear me-1"></i>
                                Content
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard; 