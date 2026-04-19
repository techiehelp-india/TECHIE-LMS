import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Cpu, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { to: "/admin", icon: <LayoutDashboard className="w-5 h-5"/>, label: "Dashboard", exact: true },
    { to: "/admin/users", icon: <Users className="w-5 h-5"/>, label: "Users" },
    { to: "/admin/courses", icon: <BookOpen className="w-5 h-5"/>, label: "Courses" },
    { to: "/admin/projects", icon: <Cpu className="w-5 h-5"/>, label: "AI Projects" },
  ];

  return (
    <div className="flex h-screen bg-muted/30 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass-card border-r flex flex-col justify-between p-4 shadow-2xl relative z-20 shrink-0 hidden md:flex">
         <div>
           <div className="flex items-center gap-2 mb-8 px-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400">Techie Admin</span>
           </div>

           <nav className="space-y-2">
             {navLinks.map((link) => (
               <NavLink 
                  key={link.to} 
                  to={link.to}
                  end={link.exact}
                  className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
               >
                 {link.icon}
                 {link.label}
               </NavLink>
             ))}
           </nav>
         </div>

         <div className="space-y-2">
            <button onClick={() => navigate('/')} className="flex items-center gap-3 w-full px-4 py-3 text-muted-foreground hover:bg-muted hover:text-foreground rounded-xl transition-all font-medium text-left">
              <Settings className="w-5 h-5"/> Back to Site
            </button>
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-medium text-left">
              <LogOut className="w-5 h-5"/> Sign Out
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
         {/* Top Header */}
         <header className="h-16 glass border-b flex items-center justify-between px-6 shrink-0 relative z-10 w-full">
           <h1 className="text-xl font-bold">Admin Portal</h1>
           <div className="flex items-center gap-4">
             <div className="text-sm text-right hidden sm:block">
               <p className="font-medium text-foreground leading-none mb-1">{currentUser?.email?.split('@')[0]}</p>
               <p className="text-xs text-primary font-bold">Super Admin</p>
             </div>
             <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                {currentUser?.email?.[0].toUpperCase() || 'A'}
             </div>
           </div>
         </header>

         {/* Scrollable Content Area */}
         <div className="flex-1 overflow-y-auto p-6 relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>
            <div className="max-w-6xl mx-auto">
               <Outlet />
            </div>
         </div>
      </main>
    </div>
  );
}
