const nodemailer = require('nodemailer');
const Likns		 = require('../models/links.model');
var mail 		 = require("../config/nodemailer");
const Users 	 = require('../models/users.model');

module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["chat"],
		js: ["search"]
	};

	Users.find({_id: {$ne: req.user._id}}, function(err, users){
		if (err) throw err;
		content.users = users;
		res.render("home", content);
		console.log(content);
	});

}
