const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Can be null if login fails and user not found
    username: { type: String }, // Store username for failed attempts
    timestamp: { type: Date, default: Date.now },
    ip_address: { type: String },
    device: { type: String },
    status: { type: String, enum: ['success', 'failure'], required: true }
});

module.exports = mongoose.model('Log', logSchema);
