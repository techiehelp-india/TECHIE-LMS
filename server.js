import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import authRoutes from './server/routes/auth.js';
import adminRoutes from './server/routes/admin.js';
import studentRoutes from './server/routes/student.js';
import publicRoutes from './server/routes/public.js';

dotenv.config();

const app = express();
export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/public', publicRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Techie LMS Backend is running!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend Server running on port http://localhost:${PORT}`);
});
