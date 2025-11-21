import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';

const DashboardAdmin = () => {
    const [users, setUsers] = useState([]);
    const [logs, setLogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [usersRes, logsRes] = await Promise.all([
                    api.get('/admin/users'),
                    api.get('/admin/logs')
                ]);
                setUsers(usersRes.data);
                setLogs(logsRes.data);
            } catch (err) {
                navigate('/login');
            }
        };
        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">
            {/* Tech Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <nav className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 p-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">
                            Admin<span className="text-red-500">Console</span>
                        </h1>
                        <span className="px-2 py-0.5 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20 font-mono uppercase tracking-wider">
                            Root Access
                        </span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-slate-800/50 text-slate-300 px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors border border-slate-700 text-sm font-medium flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        Sign Out
                    </button>
                </div>
            </nav>

            <main className="p-8 max-w-7xl mx-auto space-y-8 relative z-10">
                {/* Users Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1e293b]/40 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-700/50 flex justify-between items-center bg-slate-900/30">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            User Database
                        </h2>
                        <span className="text-slate-400 text-sm font-mono bg-slate-800 px-2 py-1 rounded border border-slate-700">{users.length} RECORDS</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="p-4">Username</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {users.map(user => (
                                    <tr key={user._id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="p-4 font-medium text-white">{user.username}</td>
                                        <td className="p-4 text-slate-400 font-mono text-sm">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded text-xs font-medium border ${user.role === 'admin'
                                                    ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                                    : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                }`}>
                                                {user.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 text-sm font-mono">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.section>

                {/* Logs Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#1e293b]/40 backdrop-blur-md rounded-xl border border-slate-700/50 overflow-hidden"
                >
                    <div className="p-6 border-b border-slate-700/50 bg-slate-900/30">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                            System Logs
                        </h2>
                    </div>
                    <div className="overflow-x-auto max-h-[500px]">
                        <table className="w-full text-left">
                            <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider font-semibold sticky top-0 backdrop-blur-md z-10">
                                <tr>
                                    <th className="p-4">Timestamp</th>
                                    <th className="p-4">User</th>
                                    <th className="p-4">IP Origin</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {logs.map(log => (
                                    <tr key={log._id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="p-4 text-slate-500 text-sm font-mono">
                                            {new Date(log.timestamp).toLocaleString()}
                                        </td>
                                        <td className="p-4 font-medium text-white">{log.username || 'Unknown'}</td>
                                        <td className="p-4 text-slate-400 font-mono text-sm">{log.ip_address}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded text-xs font-medium border ${log.status === 'success'
                                                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                                                }`}>
                                                {log.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.section>
            </main>
        </div>
    );
};

export default DashboardAdmin;
