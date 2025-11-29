import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import PageTitle from '../components/PageTitle';

const OTPVerify = () => {
    const [otp, setOtp] = useState('');
    const [timeLeft, setTimeLeft] = useState(300);
    const navigate = useNavigate();
    const userId = localStorage.getItem('tempUserId');

    useEffect(() => {
        if (!userId) {
            toast.error('Session expired, please login again');
            navigate('/login');
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [userId, navigate]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/verify-otp', { userId, otp });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.removeItem('tempUserId');
            toast.success('Login successful!');

            if (res.data.user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid OTP');
        }
    };

    const handleResend = async () => {
        try {
            await api.post('/auth/resend-otp', { userId });
            setTimeLeft(300);
            toast.success('OTP resent successfully');
        } catch (err) {
            toast.error('Failed to resend OTP');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1120] px-4">
            <PageTitle title="Verify OTP" />
            <div className="w-full max-w-md bg-[#0f172a] rounded-2xl border border-slate-800 shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">Two-Factor Authentication</h2>
                    <p className="text-slate-400 mt-2 text-sm">Enter the 6-digit code sent to your email</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            maxLength="6"
                            className="w-full bg-[#1e293b] border border-slate-700 rounded-xl px-4 py-4 text-center text-3xl tracking-[0.5em] text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-mono"
                            placeholder="000000"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between bg-[#1e293b]/50 p-3 rounded-lg border border-slate-800/50">
                        <span className="text-slate-400 text-sm">Time Remaining</span>
                        <span className={`font-mono font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-cyan-400'}`}>
                            {formatTime(timeLeft)}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200 active:scale-[0.98]"
                    >
                        Verify Identity
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={handleResend}
                        disabled={timeLeft > 0}
                        className={`text-sm font-medium transition-colors ${timeLeft > 0
                            ? 'text-slate-600 cursor-not-allowed'
                            : 'text-cyan-400 hover:text-cyan-300'
                            }`}
                    >
                        Resend Verification Code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerify;
