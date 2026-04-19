import express from 'express';
import { prisma } from '../../server.js';

const router = express.Router();

// Admin Authentication Middleware
const checkAdmin = async (req, res, next) => {
  const email = req.headers['x-user-email'];
  if (!email) return res.status(401).json({ error: 'Unauthorized: Missing email header' });
  
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// --- DASHBOARD OVERVIEW ---
router.get('/stats', checkAdmin, async (req, res) => {
  try {
    const totalUsers = await prisma.user.count({ where: { isDeleted: false } });
    const totalCourses = await prisma.course.count({ where: { isDeleted: false } });
    const totalEnrollments = await prisma.enrollment.count();
    const activeProjects = await prisma.aIProject.count({ where: { isDeleted: false } });
    
    const courses = await prisma.course.findMany({
      include: { _count: { select: { enrollments: true } } },
      take: 5,
      orderBy: { enrollments: { _count: 'desc' }}
    });

    res.json({
      totalUsers,
      totalCourses,
      totalEnrollments,
      revenue: totalEnrollments * 199, // Scalable mock logic
      activeProjects,
      topCourses: courses.map(c => ({ name: c.title, students: c._count.enrollments }))
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// --- USER MANAGEMENT ---
router.get('/users', checkAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch(e) { res.status(500).json({error: 'Server error'}) }
});

router.put('/users/:id/role', checkAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role }
    });
    res.json(user);
  } catch(e) { res.status(500).json({error: 'Server error'}) }
});

router.delete('/users/:id', checkAdmin, async (req, res) => {
  try {
    await prisma.user.update({
      where: { id: req.params.id },
      data: { isDeleted: true }
    });
    res.json({ success: true });
  } catch(e) { res.status(500).json({error: 'Server error'}) }
});

// --- COURSE MANAGEMENT ---
router.get('/courses', checkAdmin, async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { isDeleted: false },
      include: { instructor: true, category: true, _count: { select: { enrollments: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(courses);
  } catch(e) { res.status(500).json({error: 'Server error'}) }
});

router.post('/courses', checkAdmin, async (req, res) => {
  try {
    const { title, description, price, categoryId, instructorId } = req.body;
    // Basic slug generator
    const slug = title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
    
    // Assign to current admin if instructorId is missing
    const assignedInstructorId = instructorId || req.user.id;

    const course = await prisma.course.create({
      data: { title, description, price: parseFloat(price), instructorId: assignedInstructorId, categoryId, slug, published: true }
    });
    res.json(course);
  } catch(e) { 
    console.error(e);
    res.status(500).json({error: 'Error creating course', details: e.message}) 
  }
});

router.get('/courses/:id/lessons', checkAdmin, async (req, res) => {
  try {
    const lessons = await prisma.lesson.findMany({ where: { courseId: req.params.id, isDeleted: false }, orderBy: { order: 'asc' } });
    res.json(lessons);
  } catch(e) { res.status(500).json({error: 'Error'}) }
});

router.post('/courses/:id/lessons', checkAdmin, async (req, res) => {
  try {
    const { title, videoUrl, duration, content } = req.body;
    const existingLessons = await prisma.lesson.count({ where: { courseId: req.params.id } });
    const lesson = await prisma.lesson.create({
      data: { courseId: req.params.id, title, videoUrl, duration: parseInt(duration||0), content, order: existingLessons + 1 }
    });
    res.json(lesson);
  } catch(e) { res.status(500).json({error: 'Error'}) }
});

router.delete('/lessons/:id', checkAdmin, async (req, res) => {
  try {
    await prisma.lesson.update({ where: { id: req.params.id }, data: { isDeleted: true } });
    res.json({ success: true });
  } catch(e) { res.status(500).json({error: 'Error'}) }
});

// --- AI PROJECT MANAGEMENT ---
router.get('/projects', checkAdmin, async (req, res) => {
  try {
    const projects = await prisma.aIProject.findMany({
      where: { isDeleted: false },
      include: { createdBy: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(projects);
  } catch(e) { res.status(500).json({error: 'Server error'}) }
});

router.post('/projects', checkAdmin, async (req, res) => {
  try {
    const { title, description, difficulty, aiPrompt } = req.body;
    const project = await prisma.aIProject.create({
      data: { title, description, difficulty, aiPrompt, createdById: req.user.id }
    });
    res.json(project);
  } catch(e) { res.status(500).json({error: 'Server error'}) }
});

export default router;
