import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { motion } from 'framer-motion';

const DashboardUser = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/user/me');
                setUser(res.data);
            } catch (err) {
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    if (!user) return <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-slate-400">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0B1120] text-white relative overflow-hidden">
            {/* Tech Background */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <nav className="bg-[#0f172a]/80 backdrop-blur-xl border-b border-slate-800 p-4 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        </div>
                        <h1 className="text-xl font-bold text-white tracking-tight">
                            Secure<span className="text-blue-500">Auth</span>
                        </h1>
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

            <main className="p-8 max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="flex items-end justify-between border-b border-slate-800 pb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white tracking-tight">Dashboard</h2>
                            <p className="text-slate-400 mt-1">Welcome back, <span className="text-blue-400">{user.username}</span></p>
                        </div>
                        <div className="text-right hidden sm:block bg-slate-800/30 px-4 py-2 rounded-lg border border-slate-800">
                            <p className="text-xs text-slate-500 uppercase tracking-wider">System Date</p>
                            <p className="text-slate-300 font-mono text-sm">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Status Card */}
                        <div className="bg-[#1e293b]/40 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-xs rounded border border-emerald-500/20 font-mono">ACTIVE</span>
                            </div>
                            <h3 className="text-slate-400 text-sm font-medium mb-1">Account Status</h3>
                            <p className="text-2xl font-bold text-white tracking-tight">Verified</p>
                        </div>

                        {/* Role Card */}
                        <div className="bg-[#1e293b]/40 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                </div>
                            </div>
                            <h3 className="text-slate-400 text-sm font-medium mb-1">Access Level</h3>
                            <p className="text-2xl font-bold text-white capitalize tracking-tight">{user.role}</p>
                        </div>

                        {/* Security Card */}
                        <div className="bg-[#1e293b]/40 backdrop-blur-md p-6 rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                </div>
                            </div>
                            <h3 className="text-slate-400 text-sm font-medium mb-1">Security Status</h3>
                            <p className="text-2xl font-bold text-white tracking-tight">Protected</p>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="bg-[#1e293b]/30 backdrop-blur-md rounded-xl border border-slate-700/50 p-8">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .885-.356 1.777-.986 2.322C7.87 8.606 7.381 9 6 9v11c0 1.105 1.343 2 3 2 1.657 0 3-.895 3-2V9c0-1.105 1.343-2 3-2 1.657 0 3 .895 3 2v11c0 1.105-1.343 2-3 2-.66 0-1.217-.145-1.664-.381"></path></svg>
                            Identity Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    <span className="text-slate-200 font-mono">{user.email}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">User ID</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
                                    <span className="text-slate-200 font-mono text-sm">{user._id}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

export default DashboardUser;
