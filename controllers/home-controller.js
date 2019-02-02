const nodemailer = require('nodemailer');
const Likns		 = require('../models/links.model');
const mail 		 = require("../config/nodemailer");
const Users 	  = require('../models/users.model');
const Preferences = require('../models/preferences.model');

module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["chat"],
		js: ["search"]
	};

	Users.find({}, function(err, users){
		if (err) throw err;

		content.users = users;
		res.render("home", content);
	});

}
