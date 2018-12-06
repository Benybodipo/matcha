const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var messagesSchema = new mongoose.Schema({

    userId1:
	 {
        type: Schema.ObjectId,
        required: true
    },
    userId2:
	 {
        type: Schema.ObjectId,
        required: true
    },
    timestamp:
	 {
        type: Date,
		  default: Date.now
    }

});

module.exports = mongoose.model('Messages', messagesSchema);
