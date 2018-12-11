const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var linksSchema = new mongoose.Schema({

    _id:
	 {
        type: Schema.ObjectId,
        required: true
    },
    link:
	 {
        type: String,
        required: true
    },
    type:
	 {
        type: Number,
		  min: 1,
		  max: 1,
        required: true
    },
    timestamp:
	 {
        type: Date,
		  default: Date.now
    }

});

module.exports = mongoose.model('Links', linksSchema);
