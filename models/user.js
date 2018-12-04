const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var registerSchema = new mongoose.Schema({

    firstname:
	 {
        type: String,
        required: true
    },
    lastname:
	 {
        type: String,
        required: true
    },
    username:
	 {
        type: String,
        required: true
    },
    email:
	 {
        type: String,
        required: true
    },
    password:
	 {
        type: String,
        required: true
    },
    gender:
	 {
        type: String,
		  required: true
    }

});

var loginSchema = new mongoose.Schema({

    username:
	 {
        type: String,
        required: true
    },
	 password:
	 {
        type: String,
        required: true
    }
});

var Register = mongoose.model('Register', registerSchema);
var Login	 = mongoose.model('Login', loginSchema);
// module.exports = Register;
module.exports = {
	Register: Register,
	Login: Login
};
