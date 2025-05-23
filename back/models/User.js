const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    hash: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);