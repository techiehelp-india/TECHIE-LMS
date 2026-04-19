import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, BookOpen, User, LogOut } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

const links = ['Home', 'Features', 'Courses', 'Pricing', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  const { theme, setTheme } = useTheme();
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-lg shadow-primary/20">
                <BookOpen className="w-5 h-5 2xl:w-6 2xl:h-6" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400">Techie LMS</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {links.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-muted transition-colors text-foreground/70 hover:text-foreground"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              {currentUser ? (
                <div className="relative group cursor-pointer">
                  <div className="flex items-center gap-2 bg-background/50 hover:bg-muted p-1 pr-3 rounded-full border transition-colors">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {currentUser.email[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-medium mr-1 max-w-[100px] truncate">{currentUser.email.split('@')[0]}</span>
                  </div>
                  <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="glass-card rounded-xl p-2 min-w-[200px] flex flex-col shadow-xl border">
                      <div className="p-3 text-xs text-muted-foreground border-b border-border mb-2 truncate">
                        {currentUser.email}
                      </div>
                      <button className="flex items-center gap-2 w-full p-2 hover:bg-muted text-sm font-medium rounded-lg text-left">
                        <User className="w-4 h-4" /> Profile
                      </button>
                      <button onClick={logout} className="flex items-center gap-2 w-full p-2 hover:bg-red-500/10 text-red-500 text-sm font-medium rounded-lg text-left transition-colors mt-1">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button onClick={() => setAuthModalOpen(true)} className="bg-foreground text-background dark:bg-primary dark:text-primary-foreground hover:opacity-90 px-5 py-2.5 rounded-full font-medium transition-all transform hover:scale-105 active:scale-95 shadow-lg">
                  Sign In
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center gap-4">
               {currentUser && (
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {currentUser.email[0].toUpperCase()}
                  </div>
               )}
               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-foreground">
                 {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <AnimatePresence>
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden glass border-t border-border mt-3 px-4 py-6 flex flex-col space-y-4 shadow-xl overflow-hidden"
            >
              {links.map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-lg font-medium text-foreground/80 hover:text-primary p-2">
                  {link}
                </a>
              ))}
              <div className="flex items-center justify-between p-2 pt-4 border-t border-border">
                <span className="font-medium">Theme</span>
                <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-muted">
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
              <div className="pt-4 px-2">
                 {currentUser ? (
                   <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full bg-red-500/10 text-red-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                     <LogOut className="w-5 h-5" /> Sign Out
                   </button>
                 ) : (
                   <button onClick={() => { setAuthModalOpen(true); setMobileMenuOpen(false); }} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold">
                     Sign In
                   </button>
                 )}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </nav>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
