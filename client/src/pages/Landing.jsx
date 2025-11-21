import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#1e293b]/50">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div className="p-8 overflow-y-auto custom-scrollbar text-slate-300 leading-relaxed">
                    {children}
                </div>
                <div className="p-6 border-t border-slate-800 bg-[#1e293b]/30 flex justify-end">
                    <button onClick={onClose} className="px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors border border-slate-700">
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const Landing = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [activeModal, setActiveModal] = useState(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const openModal = (modalName) => (e) => {
        e.preventDefault();
        setActiveModal(modalName);
    };

    const closeModal = () => setActiveModal(null);

    return (
        <div className="min-h-screen bg-[#020617] text-white overflow-x-hidden font-sans selection:bg-cyan-500/30">

            <AnimatePresence>
                {activeModal === 'privacy' && (
                    <Modal isOpen={true} onClose={closeModal} title="Privacy Policy">
                        <div className="space-y-6">
                            <p>Last updated: November 21, 2025</p>
                            <p>At SecureAuth, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>

                            <h4 className="text-lg font-bold text-white mt-6 mb-2">1. Information We Collect</h4>
                            <p>We collect information that you provide directly to us, such as when you create an account, update your profile, or contact customer support. This may include your name, email address, and any other information you choose to provide.</p>

                            <h4 className="text-lg font-bold text-white mt-6 mb-2">2. How We Use Your Information</h4>
                            <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, to send you related information, including confirmations and invoices, and to communicate with you about promotions, rewards, and events.</p>

                            <h4 className="text-lg font-bold text-white mt-6 mb-2">3. Data Security</h4>
                            <p>We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the Internet or method of electronic storage is 100% secure.</p>
                        </div>
                    </Modal>
                )}

                {activeModal === 'terms' && (
                    <Modal isOpen={true} onClose={closeModal} title="Terms of Service">
                        <div className="space-y-6">
                            <p>Please read these Terms of Service ("Terms") carefully before using the SecureAuth platform operated by SecureAuth Inc.</p>

                            <h4 className="text-lg font-bold text-white mt-6 mb-2">1. Acceptance of Terms</h4>
                            <p>By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>

                            <h4 className="text-lg font-bold text-white mt-6 mb-2">2. Accounts</h4>
                            <p>When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.</p>

                            <h4 className="text-lg font-bold text-white mt-6 mb-2">3. Intellectual Property</h4>
                            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of SecureAuth Inc. and its licensors.</p>
                        </div>
                    </Modal>
                )}

                {activeModal === 'contact' && (
                    <Modal isOpen={true} onClose={closeModal} title="Contact Support">
                        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">First Name</label>
                                    <input type="text" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400">Last Name</label>
                                    <input type="text" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Email Address</label>
                                <input type="email" className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400">Message</label>
                                <textarea className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors h-32 resize-none" placeholder="How can we help you?"></textarea>
                            </div>
                            <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-cyan-500/20">
                                Send Message
                            </button>
                        </form>
                    </Modal>
                )}
            </AnimatePresence>

            {/* Dynamic Background Cursor Follower */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-20 transition-opacity duration-500"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.15), transparent 80%)`
                }}
            />

            {/* Fixed Full-Width Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-md border-b border-slate-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">Secure<span className="text-cyan-400">Auth</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-slate-300 hover:text-white transition-colors font-medium px-4 py-2">
                            Sign In
                        </Link>
                        <Link to="/register" className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-lg font-bold transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

                <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            System Operational
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
                            The New Standard in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Digital Security
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-lg mb-10 leading-relaxed">
                            Advanced identity management with military-grade encryption.
                            Protect your digital assets with the next generation of security.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-bold text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1 text-center">
                                Start Free Trial
                            </Link>
                            <Link to="/login" className="px-8 py-4 bg-[#1e293b]/50 border border-slate-700 rounded-xl font-bold text-lg hover:bg-[#1e293b] transition-all text-center">
                                Live Demo
                            </Link>
                        </div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative flex justify-center items-center"
                    >
                        <div className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]">
                            {/* Rotating Rings */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border border-slate-700/50 rounded-full"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-12 border border-slate-700/30 rounded-full border-dashed"
                            />
                            <motion.div
                                animate={{ rotate: 180 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-24 border border-cyan-900/30 rounded-full"
                            />

                            {/* Central Shield */}
                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full"></div>
                                    <svg className="w-48 h-48 text-cyan-500 relative z-10 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        <path d="M12 2L4 5v5c0 6 8 10 8 10s8-4 8-10V5l-8-3z" fill="currentColor" fillOpacity="0.1" stroke="none" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* Floating Cards */}
                            <motion.div
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-0 right-0 bg-[#1e293b]/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    <span className="text-xs font-mono text-emerald-400">Encryption: AES-256</span>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                                className="absolute bottom-10 left-0 bg-[#1e293b]/90 backdrop-blur-md p-4 rounded-xl border border-slate-700 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                                    <span className="text-xs font-mono text-blue-400">Status: Protected</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-[#0f172a]/30 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Enterprise Security</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">Built for modern applications that demand the highest level of protection.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-[#1e293b]/40 p-8 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all group">
                            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Zero Knowledge</h3>
                            <p className="text-slate-400 leading-relaxed">Your data is encrypted before it leaves your device. We can't see your passwords, and neither can hackers.</p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-[#1e293b]/40 p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all group">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Multi-Factor Auth</h3>
                            <p className="text-slate-400 leading-relaxed">Add an extra layer of security with our built-in OTP verification system. Simple, fast, and secure.</p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-[#1e293b]/40 p-8 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all group">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Real-time Monitoring</h3>
                            <p className="text-slate-400 leading-relaxed">Monitor login attempts and suspicious activities in real-time with our advanced admin dashboard.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-slate-800 bg-[#020617]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <span className="font-bold text-white text-lg">SecureAuth</span>
                        <p className="text-sm mt-1 text-slate-500">© 2025 SecureAuth Inc.</p>
                    </div>
                    <div className="flex gap-6 text-sm font-medium text-slate-400">
                        <button onClick={openModal('privacy')} className="hover:text-cyan-400 transition-colors">Privacy</button>
                        <button onClick={openModal('terms')} className="hover:text-cyan-400 transition-colors">Terms</button>
                        <button onClick={openModal('contact')} className="hover:text-cyan-400 transition-colors">Contact</button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
