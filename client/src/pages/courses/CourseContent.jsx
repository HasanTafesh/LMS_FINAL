import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { toast } from 'react-toastify';

const CourseContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState([]);

  const fetchCourseContent = useCallback(async () => {
    try {
      const response = await axios.get(`/api/courses/${id}`);
      setCourse(response.data);
      
      // Set first module as selected by default
      if (response.data.modules && response.data.modules.length > 0) {
        setSelectedModule(response.data.modules[0]);
      }

      // Fetch completed modules
      const completedResponse = await axios.get(`/api/courses/${id}/progress`);
      setCompletedModules(completedResponse.data.completedModules || []);
    } catch (error) {
      toast.error('Failed to fetch course content');
      navigate('/dashboard/learning');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchCourseContent();
  }, [fetchCourseContent]);

  const handleModuleSelect = (module) => {
    setSelectedModule(module);
  };

  const handleMarkAsCompleted = async () => {
    try {
      await axios.post(`/api/courses/${id}/modules/${selectedModule._id}/complete`);
      setCompletedModules(prev => [...prev, selectedModule._id]);
      toast.success('Module marked as completed');
    } catch (error) {
      toast.error('Failed to mark module as completed');
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
        <button className="btn btn-primary mt-3" onClick={() => navigate('/dashboard/learning')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        {/* Course Content Sidebar */}
        <div className="col-md-3">
          <div className="card course-content-sidebar">
            <div className="card-body">
              <h5 className="card-title mb-4 text-gradient">{course.title}</h5>
              <div className="course-modules">
                {course.modules.map((module, index) => (
                  <div key={module._id} className="mb-3">
                    <div
                      className={`module-header p-3 rounded ${
                        selectedModule?._id === module._id ? 'bg-primary text-white' : 'bg-light'
                      }`}
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleModuleSelect(module)}
                    >
                      <h6 className="mb-0 d-flex align-items-center justify-content-between">
                        <span>
                          <i className="bi bi-book me-2"></i>
                          Module {index + 1}: {module.title}
                        </span>
                        {completedModules.includes(module._id) && (
                          <i className="bi bi-check-circle-fill text-success"></i>
                        )}
                      </h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-md-9">
          {selectedModule ? (
            <div className="card fade-in">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="card-title mb-0">{selectedModule.title}</h4>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate('/dashboard/learning')}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Dashboard
                  </button>
                </div>

                {/* Module Description */}
                {selectedModule.description && (
                  <div className="mb-4">
                    <p className="lead">{selectedModule.description}</p>
                  </div>
                )}

                {/* Module Content */}
                {selectedModule.content && (
                  <div className="card bg-light border-0 mb-4">
                    <div className="card-body">
                      <div className="content-text">
                        {selectedModule.content.content}
                      </div>
                    </div>
                  </div>
                )}

                {/* Mark as Completed Button */}
                {!completedModules.includes(selectedModule._id) && (
                  <div className="text-end">
                    <button
                      className="btn btn-success"
                      onClick={handleMarkAsCompleted}
                    >
                      <i className="bi bi-check-circle me-2"></i>
                      Mark as Completed
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card fade-in">
              <div className="card-body text-center py-5">
                <h4 className="card-title mb-4 text-gradient">Welcome to {course.title}</h4>
                <p className="lead mb-4">Select a module from the sidebar to begin your learning journey.</p>
                <div className="d-flex justify-content-center gap-3">
                  {course.modules.map((module, index) => (
                    <button
                      key={module._id}
                      className="btn btn-outline-primary hover-lift"
                      onClick={() => handleModuleSelect(module)}
                    >
                      <i className="bi bi-book me-2"></i>
                      Module {index + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseContent; 