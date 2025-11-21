const router = require('express').Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/me', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id, '-password_hash');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
