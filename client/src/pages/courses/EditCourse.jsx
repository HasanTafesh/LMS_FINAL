import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { toast } from 'react-toastify';

const EditCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    thumbnail: '',
    requirements: [],
    objectives: []
  });

  const fetchCourseDetails = useCallback(async () => {
    try {
      const response = await axios.get(`/api/courses/${id}`);
      // Ensure arrays are initialized
      const courseData = {
        ...response.data,
        requirements: response.data.requirements || [],
        objectives: response.data.objectives || []
      };
      setCourse(courseData);
    } catch (error) {
      toast.error('Failed to fetch course details');
      navigate('/dashboard/instructor');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    if (id) {
      fetchCourseDetails();
    } else {
      setLoading(false);
      toast.error('Course ID is missing');
      navigate('/dashboard/instructor');
    }
  }, [id, fetchCourseDetails, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/courses/${id}`, course);
      toast.success('Course updated successfully');
      navigate('/dashboard/instructor');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update course');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (e, field) => {
    const values = e.target.value.split('\n').filter(item => item.trim());
    setCourse(prev => ({
      ...prev,
      [field]: values
    }));
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
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h1 className="h3 mb-4">Edit Course</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Course Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={course.title || ''}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="4"
                    value={course.description || ''}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control"
                    id="category"
                    name="category"
                    value={course.category || ''}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="price" className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={course.price || ''}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="requirements" className="form-label">Requirements (one per line)</label>
                  <textarea
                    className="form-control"
                    id="requirements"
                    rows="4"
                    value={Array.isArray(course.requirements) ? course.requirements.join('\n') : ''}
                    onChange={(e) => handleArrayChange(e, 'requirements')}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="objectives" className="form-label">Learning Objectives (one per line)</label>
                  <textarea
                    className="form-control"
                    id="objectives"
                    rows="4"
                    value={Array.isArray(course.objectives) ? course.objectives.join('\n') : ''}
                    onChange={(e) => handleArrayChange(e, 'objectives')}
                  />
                </div>

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Update Course
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/dashboard/instructor')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourse; 