import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

export default function AdminRoute({ children }) {
  const { currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (currentUser) {
      axios.post('http://localhost:5000/api/auth/sync', {
        email: currentUser.email,
        name: currentUser.displayName,
        image: currentUser.photoURL
      }).then(res => {
        if (res.data.user.role === 'ADMIN') {
           setIsAdmin(true);
        } else {
           setIsAdmin(false);
           setErrorMsg("Nice try 😏 but you're not the admin");
        }
      }).catch(err => {
        console.error(err);
        setIsAdmin(false);
      });
    } else {
      setIsAdmin(false);
    }
  }, [currentUser]);

  if (isAdmin === null) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
           <Loader2 className="w-12 h-12 animate-spin text-primary" />
           <p className="text-muted-foreground font-medium animate-pulse">Checking credentials...</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
           <div className="text-6xl mb-4">⛔</div>
           <h2 className="text-2xl md:text-3xl font-extrabold text-red-500 tracking-tight">{errorMsg}</h2>
           <a href="/" className="mt-6 bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105">Return to Safety</a>
        </div>
    );
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}
