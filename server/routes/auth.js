import express from 'express';
import { prisma } from '../../server.js';

const router = express.Router();

// Synchronize Firebase Auth with PostgreSQL DB
router.post('/sync', async (req, res) => {
  try {
    const { email, name, image } = req.body;
    
    if (!email) return res.status(400).json({ error: 'Email required' });

    let user = await prisma.user.findUnique({ where: { email } });
    
    // Strict Admin Override Role check
    let determinedRole = 'STUDENT';
    if (email === 'support@techiehelp.in') {
      determinedRole = 'ADMIN';
    }

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || email.split('@')[0],
          profileImage: image,
          role: determinedRole,
        }
      });
    } else if (user.role !== determinedRole && email === 'support@techiehelp.in') {
      // Force admin role if they somehow lost it
      user = await prisma.user.update({
        where: { email },
        data: { role: 'ADMIN' }
      });
    }

    res.json({ user });
  } catch (error) {
    console.error('Auth sync error:', error);
    res.status(500).json({ error: 'Server error syncing user state' });
  }
});

export default router;
