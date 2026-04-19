import express from 'express';
import { prisma } from '../../server.js';

const router = express.Router();

const checkUser = async (req, res, next) => {
  const email = req.headers['x-user-email'];
  if (!email) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(403).json({ error: 'Forbidden' });
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Discover available courses
router.get('/courses', checkUser, async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true, isDeleted: false },
      include: { instructor: true, _count: { select: { enrollments: true } } }
    });
    // Check which ones user is enrolled in
    const enrollments = await prisma.enrollment.findMany({ where: { userId: req.user.id } });
    const enrolledMap = new Set(enrollments.map(e => e.courseId));
    
    res.json(courses.map(c => ({
      ...c,
      isEnrolled: enrolledMap.has(c.id)
    })));
  } catch(e) { res.status(500).json({error: 'Server error'}) }
});

// Enroll in a Course
router.post('/enroll', checkUser, async (req, res) => {
  const { courseId } = req.body;
  try {
    const enroll = await prisma.enrollment.create({
      data: { userId: req.user.id, courseId }
    });
    
    // Auto-create a mock lesson if this course has none (for demo MVP player purposes)
    const lessons = await prisma.lesson.findMany({ where: { courseId } });
    if(lessons.length === 0) {
       await prisma.lesson.create({
         data: { courseId, title: 'Introduction Masterclass', order: 1, duration: 60 }
       })
    }
    
    res.json(enroll);
  } catch(e) { 
     if(e.code === 'P2002') return res.status(400).json({ error: 'Already Enrolled' });
     res.status(500).json({error: 'Server error'}) 
  }
});

// Dashboard Progress
router.get('/dashboard', checkUser, async (req, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user.id },
      include: {
        course: {
           include: { instructor: true }
        }
      }
    });

    const progresses = await prisma.progress.findMany({
      where: { userId: req.user.id }
    });
    
    const progressMap = new Set(progresses.map(p => p.lessonId));

    res.json({ enrollments, progressTotal: progresses.length });
  } catch(e) { res.status(500).json({error: 'Server error'}) }
});

// Course Player Info
router.get('/player/:courseId', checkUser, async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { lessons: true }
    });
    
    const progresses = await prisma.progress.findMany({
       where: { userId: req.user.id, lesson: { courseId } }
    });
    const completedLessonIds = progresses.map(p => p.lessonId);

    res.json({ course, completedLessonIds });
  } catch(e) { res.status(500).json({error: 'Server error'}) }
});

// Mark lesson completed
router.post('/progress', checkUser, async (req, res) => {
  const { lessonId } = req.body;
  try {
    const prog = await prisma.progress.create({
       data: { userId: req.user.id, lessonId, completed: true, completedAt: new Date() }
    });
    res.json({ success: true, prog });
  } catch(e) { 
    if(e.code === 'P2002') return res.json({ success: true, message: 'Already marked complete' });
    res.status(500).json({error: 'Server error'}) 
  }
});

export default router;
