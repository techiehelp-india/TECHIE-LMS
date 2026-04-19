import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Courses from './components/Courses';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import CTA from './components/CTA';
import Footer from './components/Footer';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UsersManagement from './pages/admin/UsersManagement';
import CourseManagement from './pages/admin/CourseManagement';
import AIProjectManagement from './pages/admin/AIProjectManagement';
import AdminRoute from './components/AdminRoute';

// Student Pages
import StudentLayout from './pages/student/StudentLayout';
import StudentDashboard from './pages/student/StudentDashboard';
import CoursePlayer from './pages/student/CoursePlayer';

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Courses />
        <HowItWorks />
        <DashboardPreview />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="projects" element={<AIProjectManagement />} />
        </Route>

        {/* Student Routes */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
          <Route path="course/:id" element={<CoursePlayer />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
