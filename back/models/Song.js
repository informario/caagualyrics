const mongoose = require('mongoose');
const { Schema } = mongoose;

const SongSchema = new Schema({
    title: { type: String, required: true },
    lyrics: { type: String, required: true },
});

module.exports = mongoose.model('Song', SongSchema);