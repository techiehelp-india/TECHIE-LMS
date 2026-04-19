import React from 'react';
import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { BookOpen, GraduationCap, LayoutDashboard, LogOut, Code, Compass } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function StudentLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if(!currentUser) {
     return <Navigate to="/" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { to: "/student", icon: <LayoutDashboard className="w-5 h-5"/>, label: "My Learning", exact: true },
    { to: "/#courses", icon: <Compass className="w-5 h-5"/>, label: "Explore Courses" },
  ];

  return (
    <div className="flex h-screen bg-muted/20 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass-card border-r flex flex-col justify-between p-4 shadow-2xl relative z-20 shrink-0 hidden md:flex">
         <div>
           <div className="flex items-center gap-2 mb-8 px-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400">Techie Student</span>
           </div>

           <nav className="space-y-2">
             {navLinks.map((link) => (
               <NavLink 
                  key={link.to} 
                  to={link.to}
                  end={link.exact}
                  onClick={(e) => {
                     // Since Explore Courses is a hash link on the landing page
                     if(link.to.startsWith('/#')) {
                        e.preventDefault();
                        navigate('/');
                        setTimeout(() => window.location.hash = 'courses', 100);
                     }
                  }}
                  className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
               >
                 {link.icon}
                 {link.label}
               </NavLink>
             ))}
           </nav>
         </div>

         <div className="space-y-2">
            <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all font-medium text-left">
              <LogOut className="w-5 h-5"/> Sign Out
            </button>
         </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
         <header className="h-16 glass border-b flex items-center justify-between px-6 shrink-0 relative z-10 w-full">
           <h1 className="text-xl font-bold">Classroom Central</h1>
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg">
                {currentUser.email[0].toUpperCase()}
             </div>
           </div>
         </header>

         {/* Scrollable Content Area */}
         <div className="flex-1 overflow-y-auto p-4 md:p-8 relative">
            <div className="max-w-5xl mx-auto">
               <Outlet />
            </div>
         </div>
      </main>
    </div>
  );
}
