const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');


const imgesSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4 },
    urlmage: { type: String, required: true },
    description: { type: String, required: true },
});

module.exports = mongoose.model('image', imgesSchema);
