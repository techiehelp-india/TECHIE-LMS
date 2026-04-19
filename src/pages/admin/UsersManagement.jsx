import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { Search, MoreVertical, Shield, Trash2, Edit } from 'lucide-react';

export default function UsersManagement() {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/admin/users', { headers: { 'x-user-email': currentUser.email } })
      .then(res => setUsers(res.data)).catch(console.error);
  };

  const deleteUser = async (id) => {
    if(!confirm("Are you sure you want to logically delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, { headers: { 'x-user-email': currentUser.email } });
      fetchUsers();
    } catch(e) { console.error(e) }
  };

  const changeRole = async (id, newRole) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${id}/role`, { role: newRole }, { headers: { 'x-user-email': currentUser.email } });
      fetchUsers();
    } catch(e) { console.error(e) }
  };

  const filtered = users.filter(u => u.email.toLowerCase().includes(search.toLowerCase()) || u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-3xl font-bold">User Management</h2>
         <div className="relative">
           <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
           <input 
             type="text" 
             placeholder="Search users..." 
             className="pl-10 pr-4 py-2 bg-card border rounded-full outline-none focus:ring-2 focus:ring-primary w-64 text-sm"
             value={search}
             onChange={e => setSearch(e.target.value)}
           />
         </div>
      </div>

      <div className="glass-card rounded-2xl border shadow-sm overflow-hidden">
         <table className="w-full text-left border-collapse">
            <thead>
               <tr className="border-b bg-muted/50">
                  <th className="p-4 font-semibold text-sm">Name/Email</th>
                  <th className="p-4 font-semibold text-sm">Role</th>
                  <th className="p-4 font-semibold text-sm">Joined</th>
                  <th className="p-4 font-semibold text-sm text-right">Actions</th>
               </tr>
            </thead>
            <tbody>
               {filtered.map(user => (
                 <tr key={user.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold relative overflow-hidden">
                             {user.profileImage ? <img src={user.profileImage} className="w-full h-full object-cover" /> : user.name[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                          </div>
                       </div>
                    </td>
                    <td className="p-4">
                       <select 
                         value={user.role} 
                         onChange={(e) => changeRole(user.id, e.target.value)}
                         className={`text-xs font-bold px-3 py-1 rounded-full outline-none border cursor-pointer appearance-none text-center ${
                           user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400' :
                           user.role === 'INSTRUCTOR' ? 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400' :
                           'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400'
                         }`}
                       >
                         <option value="STUDENT">STUDENT</option>
                         <option value="INSTRUCTOR">INSTRUCTOR</option>
                         <option value="ADMIN">ADMIN</option>
                       </select>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                       {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                       <div className="flex items-center justify-end gap-2">
                         <button onClick={() => deleteUser(user.id)} className="p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors" title="Delete User">
                           <Trash2 className="w-4 h-4" />
                         </button>
                       </div>
                    </td>
                 </tr>
               ))}
               
               {filtered.length === 0 && (
                 <tr>
                   <td colSpan="4" className="p-8 text-center text-muted-foreground">No users found.</td>
                 </tr>
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
