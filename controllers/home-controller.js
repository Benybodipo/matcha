const nodemailer = require('nodemailer');
const Likns		 = require('../models/links.model');
const mail 		 = require("../config/nodemailer");
const Users 	  = require('../models/users.model');
const Preferences = require('../models/preferences.model');

module.exports = function(req, res)
{
	var page = req.url.split("/").filter(function(item) { return item !== "";})[0];
	var searchParams = req.query;

	var content = {
		title: "Matcha | Welcome",
		css: ["chat"],
		js: ["search"],
		isHome: (page == "home") ? true : false
	};

	console.log(searchParams);
	


	Users.find({}, function(err, users){
		if (err) throw err;

		content.users = users;
		res.render("home", content);
	});

}
