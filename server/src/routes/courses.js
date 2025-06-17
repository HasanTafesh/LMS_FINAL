const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const CourseProgress = require('../models/CourseProgress');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine upload directory based on file type
    const uploadDir = file.fieldname === 'thumbnail' 
      ? 'uploads/courses'
      : 'uploads/content';
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

// Get all published courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate('instructor', 'firstName lastName profilePicture');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get enrolled courses for the current user
router.get('/enrolled', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'enrolledCourses',
        select: 'title thumbnail description'
      });

    res.json(user.enrolledCourses.map(course => ({
      id: course._id,
      title: course.title,
      thumbnail: course.thumbnail,
      description: course.description,
      lastAccessed: user.lastLogin || new Date()
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get instructor's courses
router.get('/instructor', auth, async (req, res) => {
  try {
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const courses = await Course.find({ instructor: req.user._id })
      .populate('enrolledStudents', 'firstName lastName')
      .select('title thumbnail category status enrolledStudents');

    res.json(courses.map(course => ({
      id: course._id,
      title: course.title,
      thumbnail: course.thumbnail,
      category: course.category,
      status: course.status,
      students: course.enrolledStudents.length
    })));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get instructor's students
router.get('/students/instructor', auth, async (req, res) => {
  try {
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const courses = await Course.find({ instructor: req.user._id })
      .populate('enrolledStudents', 'firstName lastName email profilePicture');

    const students = new Set();
    courses.forEach(course => course.enrolledStudents.forEach(student => students.add(student)));
    res.json(Array.from(students));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single course
router.get('/:id', async (req, res) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    const course = await Course.findById(req.params.id)
      .populate('instructor', 'firstName lastName profilePicture bio');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid course ID format' });
    }
    res.status(500).json({ message: error.message });
  }
});

// Create a new course
router.post('/', [auth, upload.single('thumbnail')], async (req, res) => {
  try {
    if (req.user.role !== 'instructor') {
      return res.status(403).json({ message: 'Only instructors can create courses' });
    }

    const course = await Course.create({
      ...req.body,
      instructor: req.user._id,
      thumbnail: req.file?.path
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a course
router.put('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    Object.assign(course, req.body);
    await course.save();
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a course
router.delete('/:id', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.remove();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Enroll in a course
router.post('/:id/enroll', auth, async (req, res) => {
  try {
    if (req.user.role === 'instructor') {
      return res.status(403).json({ message: 'Instructors cannot enroll in courses' });
    }

    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    // Update both course and user in parallel
    await Promise.all([
      Course.findByIdAndUpdate(course._id, { $push: { enrolledStudents: req.user._id } }),
      User.findByIdAndUpdate(req.user._id, { $push: { enrolledCourses: course._id } })
    ]);

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get enrollment status for a course
router.get('/:id/enrollment', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({ enrolled: course.enrolledStudents.includes(req.user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add content to a module
router.post('/:courseId/modules/:moduleId/content', auth, async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, description, content } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add content to this course' });
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    module.content = {
      title,
      description,
      content,
      createdAt: new Date()
    };

    await course.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a module to a course
router.post('/:courseId/modules', auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, description, content } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add modules to this course' });
    }

    const newModule = {
      title,
      description: description || '',
      lessons: []
    };

    if (content) {
      newModule.content = {
        content,
        createdAt: new Date()
      };
    }

    course.modules.push(newModule);
    await course.save();
    
    // Return the newly created module
    const createdModule = course.modules[course.modules.length - 1];
    res.status(201).json(createdModule);
  } catch (error) {
    console.error('Error creating module:', error);
    res.status(500).json({ message: error.message || 'Failed to create module' });
  }
});

// Update a module
router.put('/:courseId/modules/:moduleId', auth, async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    const { title, description, content } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    module.title = title;
    module.description = description;
    if (content) {
      module.content = {
        content,
        createdAt: module.content?.createdAt || new Date()
      };
    }

    await course.save();
    res.json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a module
router.delete('/:courseId/modules/:moduleId', auth, async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete modules from this course' });
    }

    course.modules.pull(moduleId);
    await course.save();
    res.json({ message: 'Module deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upload course content file
router.post('/content/upload', [auth, upload.single('file')], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    res.json({
      message: 'File uploaded successfully',
      fileUrl: `/uploads/content/${req.file.filename}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get course progress
router.get('/:courseId/progress', auth, async (req, res) => {
  try {
    const { courseId } = req.params;
    
    // Check if user is enrolled in the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.enrolledStudents.includes(req.user._id)) {
      return res.status(403).json({ message: 'You are not enrolled in this course' });
    }

    // Find or create progress document
    let progress = await CourseProgress.findOne({
      user: req.user._id,
      course: courseId
    });

    if (!progress) {
      progress = await CourseProgress.create({
        user: req.user._id,
        course: courseId,
        completedModules: []
      });
    }

    res.json({
      completedModules: progress.completedModules,
      lastAccessed: progress.lastAccessed
    });
  } catch (error) {
    console.error('Error fetching course progress:', error);
    res.status(500).json({ message: error.message });
  }
});

// Mark module as completed
router.post('/:courseId/modules/:moduleId/complete', auth, async (req, res) => {
  try {
    const { courseId, moduleId } = req.params;
    
    // Check if user is enrolled in the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (!course.enrolledStudents.includes(req.user._id)) {
      return res.status(403).json({ message: 'You are not enrolled in this course' });
    }

    // Check if module exists
    const module = course.modules.id(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    // Find or create progress document
    let progress = await CourseProgress.findOne({
      user: req.user._id,
      course: courseId
    });

    if (!progress) {
      progress = await CourseProgress.create({
        user: req.user._id,
        course: courseId,
        completedModules: [moduleId]
      });
    } else {
      // Add module to completed modules if not already completed
      if (!progress.completedModules.includes(moduleId)) {
        progress.completedModules.push(moduleId);
        await progress.save();
      }
    }

    res.json({
      message: 'Module marked as completed',
      completedModules: progress.completedModules
    });
  } catch (error) {
    console.error('Error marking module as completed:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 