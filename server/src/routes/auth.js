const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OTP = require('../models/OTP');
const Log = require('../models/Log');
const sendOTP = require('../utils/sendOTP');

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create user
        const newUser = new User({ username, email, password_hash });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login (Step 1)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const ip = req.ip;
    const device = req.headers['user-agent'];

    try {
        const user = await User.findOne({ username });
        if (!user) {
            await Log.create({ username, ip_address: ip, device, status: 'failure' });
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const validPass = await bcrypt.compare(password, user.password_hash);
        if (!validPass) {
            await Log.create({ user_id: user._id, username, ip_address: ip, device, status: 'failure' });
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60000); // 5 mins

        // Save OTP (upsert)
        await OTP.findOneAndUpdate(
            { user_id: user._id },
            { otp_code: otpCode, expires_at: expiresAt },
            { upsert: true, new: true }
        );

        // Send OTP
        const sent = await sendOTP(user.email, otpCode);
        if (!sent) return res.status(500).json({ message: 'Failed to send OTP' });

        res.json({ message: 'OTP sent to email', userId: user._id }); // In real app, don't send userId if not needed, or use temp token
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Verify OTP (Step 2)
router.post('/verify-otp', async (req, res) => {
    const { userId, otp } = req.body;
    const ip = req.ip;
    const device = req.headers['user-agent'];

    try {
        const otpRecord = await OTP.findOne({ user_id: userId });
        if (!otpRecord) return res.status(400).json({ message: 'OTP not found or expired' });

        if (otpRecord.expires_at < Date.now()) {
            return res.status(400).json({ message: 'OTP expired' });
        }

        if (otpRecord.otp_code !== otp) {
            await Log.create({ user_id: userId, ip_address: ip, device, status: 'failure' });
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // OTP Valid
        const user = await User.findById(userId);
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Log success
        await Log.create({ user_id: user._id, username: user.username, ip_address: ip, device, status: 'success' });

        // Clear OTP
        await OTP.deleteOne({ user_id: userId });

        res.json({ token, user: { username: user.username, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Resend OTP
router.post('/resend-otp', async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(400).json({ message: 'User not found' });

        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60000);

        await OTP.findOneAndUpdate(
            { user_id: user._id },
            { otp_code: otpCode, expires_at: expiresAt },
            { upsert: true, new: true }
        );

        await sendOTP(user.email, otpCode);
        res.json({ message: 'OTP resent' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
