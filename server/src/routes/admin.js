const router = require('express').Router();
const User = require('../models/User');
const Log = require('../models/Log');
const { verifyAdmin } = require('../middleware/authMiddleware');

router.get('/users', verifyAdmin, async (req, res) => {
    try {
        const users = await User.find({}, '-password_hash');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/logs', verifyAdmin, async (req, res) => {
    try {
        const logs = await Log.find().sort({ timestamp: -1 }).limit(100);
        res.json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
