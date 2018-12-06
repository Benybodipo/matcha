const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var preferencesSchema = new mongoose.Schema({

    _id: { type: Schema.ObjectId, required: true},
    gender: { type: [Number]},
    distance: { type: [Number]},
    visible: { type: Boolean, default: true},
    interests: { type: [String]},

});

module.exports = mongoose.model('Preferences', preferencesSchema);
