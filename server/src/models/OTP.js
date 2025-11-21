const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    otp_code: { type: String, required: true },
    expires_at: { type: Date, required: true }
});

module.exports = mongoose.model('OTP', otpSchema);
