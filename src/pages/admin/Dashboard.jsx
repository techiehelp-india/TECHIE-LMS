import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Users, BookOpen, GraduationCap, DollarSign, BrainCircuit, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/admin/stats', {
      headers: { 'x-user-email': currentUser.email }
    }).then(res => setStats(res.data)).catch(console.error);
  }, [currentUser]);

  if (!stats) return <div className="animate-pulse h-[50vh] flex flex-col items-center justify-center text-muted-foreground font-medium">Gathering Intelligence...</div>;

  const mockGrowthData = [
    { name: 'Jan', users: 400 },
    { name: 'Feb', users: 800 },
    { name: 'Mar', users: 1200 },
    { name: 'Apr', users: 1000 + stats.totalUsers },
  ];

  return (
    <div className="space-y-6">
      <div className="mb-6">
         <h2 className="text-3xl font-bold">Overview</h2>
         <p className="text-muted-foreground font-medium mt-1">Control everything from here like a boss 😎</p>
      </div>
      
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <StatCard icon={<Users />} title="Total Users" value={stats.totalUsers} trend="+12%" />
         <StatCard icon={<BookOpen />} title="Active Courses" value={stats.totalCourses} trend="+5%" />
         <StatCard icon={<GraduationCap />} title="Enrollments" value={stats.totalEnrollments} trend="+22%" />
         <StatCard icon={<BrainCircuit />} title="AI Projects" value={stats.activeProjects} trend="+8%" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
         <div className="glass-card rounded-2xl p-6 border shadow-sm h-[400px]">
            <h3 className="font-bold mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-primary" /> User Growth</h3>
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart data={mockGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', background: 'rgba(15,23,42,0.9)', border: 'none', color: '#fff' }}/>
                <Area type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
         </div>

         <div className="glass-card rounded-2xl p-6 border shadow-sm h-[400px]">
            <h3 className="font-bold mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-purple-500" /> Top Enrolled Courses</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={stats.topCourses}>
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity={1}/>
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(150,150,150,0.1)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tickFormatter={(str) => str.length > 10 ? str.slice(0,10)+'...' : str} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', background: 'rgba(15,23,42,0.9)', border: 'none', color: '#fff' }}/>
                <Bar dataKey="students" fill="url(#colorBar)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
         </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }) {
  return (
    <div className="glass-card p-6 rounded-2xl border flex items-center gap-4 transition-all hover:scale-[1.02] hover:shadow-xl hover:border-primary/30">
       <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
          <div className="relative z-10">{icon}</div>
       </div>
       <div>
         <p className="text-muted-foreground text-sm font-medium">{title}</p>
         <div className="flex items-end gap-3 mt-1">
           <h4 className="text-3xl font-extrabold leading-none">{value}</h4>
           <span className="text-green-600 bg-green-500/10 text-xs px-2 py-1 rounded-full font-bold mb-1 leading-none">{trend}</span>
         </div>
       </div>
    </div>
  );
}
