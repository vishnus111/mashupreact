const mongoose = require('mongoose');
const shortid = require('shortid');

const UrlSchema = new mongoose.Schema({
    url: { type: String, required: true },
    shortUrl: { type: String, required: true, default: shortid.generate },
    title: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Url', UrlSchema);
