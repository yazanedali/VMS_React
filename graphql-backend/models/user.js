const mongoose = require('mongoose');

// تعريف المخطط (Schema)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true }
});

// إنشاء النموذج (Model)
const User = mongoose.model('User', userSchema);

// تصدير النموذج لاستخدامه في أماكن أخرى
module.exports = User;
