import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const CourseContentManager = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingModule, setEditingModule] = useState(null);
  const [showModuleForm, setShowModuleForm] = useState(false);

  const fetchCourseData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/courses/${courseId}`);
      setCourse(response.data);
      if (response.data.modules && Array.isArray(response.data.modules)) {
        setModules(response.data.modules);
      } else {
        setModules([]);
      }
    } catch (error) {
      toast.error('Failed to fetch course data');
      navigate('/dashboard/instructor');
    } finally {
      setLoading(false);
    }
  }, [courseId, navigate]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const handleModuleDragEnd = async (result) => {
    if (!result.destination) return;

    const items = Array.from(modules);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setModules(items);

    try {
      await axios.put(`/api/courses/${courseId}/modules/reorder`, {
        moduleIds: items.map((module) => module._id || module.id)
      });
      toast.success('Module order updated');
    } catch (error) {
      toast.error('Failed to update module order');
      fetchCourseData(); // Revert on error
    }
  };

  const handleModuleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const moduleData = {
      title: formData.get('title')?.trim(),
      description: formData.get('description')?.trim() || '',
      content: formData.get('content')?.trim() || ''
    };

    if (!moduleData.title) {
      toast.error('Module title is required');
      return;
    }

    try {
      if (editingModule) {
        const response = await axios.put(
          `/api/courses/${courseId}/modules/${editingModule._id || editingModule.id}`,
          moduleData
        );
        if (response.data) {
          setModules(prevModules => 
            prevModules.map(module => 
              module._id === response.data._id || module.id === response.data._id 
                ? response.data 
                : module
            )
          );
          toast.success('Module updated successfully');
          setShowModuleForm(false);
          setEditingModule(null);
        }
      } else {
        const response = await axios.post(
          `/api/courses/${courseId}/modules`,
          moduleData
        );
        if (response.data) {
          setModules(prevModules => [...prevModules, response.data]);
          toast.success('Module created successfully');
          setShowModuleForm(false);
          setEditingModule(null);
        }
      }
    } catch (error) {
      console.error('Error saving module:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save module';
      toast.error(errorMessage);
    }
  };

  const handleDeleteModule = async (moduleId) => {
    if (!window.confirm('Are you sure you want to delete this module?')) return;

    try {
      await axios.delete(`/api/courses/${courseId}/modules/${moduleId}`);
      toast.success('Module deleted successfully');
      fetchCourseData();
    } catch (error) {
      toast.error('Failed to delete module');
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
    <div className="container py-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h1 className="h2 mb-2">Course Content Manager</h1>
          <p className="text-muted mb-0">{course?.title}</p>
        </div>
        <div className="col-md-4 text-md-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingModule(null);
              setShowModuleForm(true);
            }}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Add Module
          </button>
        </div>
      </div>

      {/* Module Form Modal */}
      {showModuleForm && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-light">
                <h5 className="modal-title">
                  {editingModule ? 'Edit Module' : 'Add Module'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => {
                    setShowModuleForm(false);
                    setEditingModule(null);
                  }}
                ></button>
              </div>
              <form onSubmit={handleModuleSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label fw-medium">Module Title</label>
                    <input
                      type="text"
                      className="form-control"
                      name="title"
                      defaultValue={editingModule?.title}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-medium">Description</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="3"
                      defaultValue={editingModule?.description}
                    ></textarea>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModuleForm(false);
                      setEditingModule(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingModule ? 'Update Module' : 'Add Module'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Module List */}
      <DragDropContext onDragEnd={handleModuleDragEnd}>
        <Droppable droppableId="modules">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list-group"
            >
              {modules.map((module, index) => (
                <Draggable
                  key={module._id || module.id}
                  draggableId={module._id || module.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="list-group-item list-group-item-action"
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h5 className="mb-1">{module.title}</h5>
                          <p className="text-muted mb-0">{module.description}</p>
                        </div>
                        <div>
                          <button
                            className="btn btn-sm btn-outline-primary me-2"
                            onClick={() => {
                              setEditingModule(module);
                              setShowModuleForm(true);
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteModule(module._id || module.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default CourseContentManager; 