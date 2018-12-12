const nodemailer = require('nodemailer');
const Likns = require('../models/links.model');
var mail = require("../config/nodemailer");

module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["chat"],
		js: ["search"]
	};

	res.render("home", content);
}
