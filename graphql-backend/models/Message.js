const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); 

const messageSchema = new mongoose.Schema({
    fromUser: { type: String, required: true },
    toUser: { type: String, required: true },  
    message: { type: String, required: true }, 
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
