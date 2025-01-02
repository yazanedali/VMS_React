const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // استيراد مكتبة UUID

// تعريف المخطط (Schema)
const userSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 }, // إنشاء UUID ديناميكي افتراضيًا
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // تعيين الدور كـ 'user' افتراضيًا
});

// إنشاء النموذج (Model)
const User = mongoose.model('User', userSchema);

// تصدير النموذج لاستخدامه في أماكن أخرى
module.exports = User;
