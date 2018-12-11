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

	// var transporter = nodemailer.createTransport(mail.credentials);
	// transporter.sendMail(mail.options("benybodipo@gmail.com", "ACCOUNT ACTIVATION", "Follow the link"), function (err, info){
	// 	if (err) throw err;
	// 	console.log("Message successfully sent!!");
	// });

	// var sendLink = new Likns({_id: req.user._id, link:"http://localhost:7500/login/?userid=12345&type=1", type:1});
	// sendLink.save(function(err) {
	// 	if (err)
	// 		console.log(err);
	// 	else
	// 		console.log("Created");
	// });
	// console.log(req.user._id);
	res.render("home", content);
}
