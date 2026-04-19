import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { BookOpen, Trophy, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { currentUser } = useAuth();
  const [data, setData] = useState({ enrollments: [], progressTotal: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/student/dashboard', { headers: { 'x-user-email': currentUser.email } })
      .then(res => setData(res.data)).catch(console.error);
  }, [currentUser]);

  const quotes = [
    "Aaj kitna padha? Ya sirf login karke jaoge? 😏",
    "Don’t just watch courses… complete them 😤",
    "Progress itna slow kyun hai bhai? 👀",
    "Welcome back, future billionaire 😎",
    "Coding is 10% writing and 90% crying 😭",
    "Stay focused! That Tesla isn't going to buy itself 🚗💨"
  ];
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="glass-card p-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-xl">
         <h1 className="text-4xl font-black mb-2 text-primary tracking-tight">Hey {currentUser.email.split('@')[0]}! 👋</h1>
         <p className="text-xl font-medium text-foreground">{quote}</p>
      </div>

      <div>
         <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Trophy className="w-6 h-6 text-yellow-500" /> Your Enrolled Journey</h2>
         {data.enrollments.length === 0 ? (
            <div className="glass-card p-12 text-center rounded-3xl border border-dashed flex flex-col items-center">
               <BookOpen className="w-16 h-16 text-muted-foreground mb-4 opacity-50" />
               <h3 className="text-xl font-bold mb-2">You aren't enrolled in anything yet!</h3>
               <p className="text-muted-foreground mb-6">Stop slacking off. Go enroll in a course.</p>
               <button onClick={() => navigate('/')} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95">Explore Courses</button>
            </div>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {data.enrollments.map((en) => {
                 const course = en.course;
                 // Mock progress logic for MVP
                 const progressPct = data.progressTotal > 0 ? 100 : 0; 
                 
                 return (
                   <div key={en.id} className="glass-card rounded-2xl border shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group cursor-pointer flex flex-col" onClick={() => navigate(`/student/course/${course.id}`)}>
                      <div className="aspect-video relative bg-muted overflow-hidden">
                         {course.thumbnail ? <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="w-full h-full bg-gradient-to-r from-purple-500 to-indigo-500"></div>}
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle className="w-12 h-12 text-white" />
                         </div>
                      </div>
                      <div className="p-5 flex-1 flex flex-col">
                        <span className="text-xs font-bold text-primary mb-2">Instructor: {course.instructor?.name || 'Admin'}</span>
                        <h3 className="font-bold text-lg leading-tight mb-2 flex-1">{course.title}</h3>
                        <div className="mt-auto">
                           <div className="flex justify-between text-xs font-bold mb-2">
                             <span>Progress</span>
                             <span className="text-primary">{progressPct}%</span>
                           </div>
                           <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                              <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progressPct}%` }}></div>
                           </div>
                        </div>
                      </div>
                   </div>
                 )
               })}
            </div>
         )}
      </div>
    </div>
  );
}
