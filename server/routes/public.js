import express from 'express';
import { prisma } from '../../server.js';

const router = express.Router();

router.get('/courses', async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { published: true, isDeleted: false },
      include: {
         instructor: { select: { name: true, profileImage: true } },
         _count: { select: { lessons: true, enrollments: true } }
      },
      orderBy: { enrollments: { _count: 'desc' } },
      take: 6
    });
    res.json(courses);
  } catch(e) {
    res.status(500).json({error: 'Server error'}) 
  }
});

export default router;
