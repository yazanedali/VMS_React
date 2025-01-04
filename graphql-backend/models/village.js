const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // استيراد مكتبة UUID

// تعريف المخطط (Schema)
const villageSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 }, // إنشاء UUID ديناميكي افتراضيًا
    villageName: { type: String, required: true },
    regionDistrict: { type: String, required: true },
    landArea: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    urlmage: { type: String, required: false },
    tags: { type: String, required: true },
    populationGrowthRate: { type: String, default: "" },
  genderRatios: { type: String, default: "" },
  ageDistribution: { type: String, default: "" },
  populationSize: { type: String, default: "" },

    
   });

// إنشاء النموذج (Model)
const Village = mongoose.model('Village', villageSchema);

// تصدير النموذج لاستخدامه في أماكن أخرى
module.exports = Village;
