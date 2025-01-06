const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fromUsername: { type: String, required: true },
    toUsername: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, // تاريخ الإرسال
});

module.exports = mongoose.model('Message', messageSchema);
