const Users 		= require('../models/users.model');
const Links 		= require('../models/links.model');
const bcrypt 		= require('bcryptjs');
const passport 	= require('passport');
const nodemailer 	= require('nodemailer');
var mail 			= require("../config/nodemailer");
const TokenGenerator = require('uuid-token-generator');
require('../config/passport')(passport);

module.exports.register = function(req, res) {
	var content = {
		title: "Matcha | Welcome",
		css: ["home"],
		js: ["slider"],
		errors: null,
		success: null
	};
	req.check("firstname", "First name too short").notEmpty().isLength({ min: 3 });
	req.check("lastname", "Last name too short").notEmpty().isLength({min: 3});
	req.check("username", "Username too short").notEmpty().isLength({ min: 3 });
	req.check("email", "Invalid e-mail").isEmail().normalizeEmail();
	req.check("password").isLength({ min: 6 });
	req.check("password2", "Password don't match").isLength({ min: 6}).equals(req.body.password);

	var errors = req.validationErrors();

	if (errors)
	{
		content.errors = errors;
		console.log(content.errors);
		res.render("index", content);
	}
	else
	{
		var obj = {
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			gender: req.body.gender
		}

		Users.find({ $or: [{username: req.body.username}, {email: req.body.email}]}, function(err, user) {
			if (err) throw err;
			if (user.length > 0)
			{
				user = user[0];

				if (user.email && user.email == obj.email)
					errors = "Email Address already in use";
				else if (user.username && user.username == obj.username)
					errors = "Username already in use";
				res.json(errors);
			}
			else
			{
				bcrypt.genSalt(10, function(err, salt)
				{
					bcrypt.hash(obj.password, salt, function(err, hash)
					{
						obj.password = hash;
						var token = new TokenGenerator(256, TokenGenerator.BASE62);
						var registerUser = new Users(obj);
						var linkObj = {
							userid: registerUser._id,
							token: token.generate(),
							type:1
						};
						var newLink = new Links(linkObj);
						registerUser.save(function(err)
						{
							if (err)
								console.log(err);
							else
							{
								newLink.save(function(err)
								{
									if (err)
										console.log(err);
									else
									{
										var transporter = nodemailer.createTransport(mail.credentials);
										var email = {
											to: "benybodipo@gmail.com",
											sbj: "ACCOUNT ACTIVATION",
											msj: "Follow the link <a href='http://localhost:7500/login/"+obj.username+"/"+linkObj.userid+"/"+linkObj.token+"/"+linkObj.type+"'>CLICK</a>"
										};

										transporter.sendMail(mail.options(email.to, email.sbj, email.msj), function (err, info)
										{
											if (err) throw err;
											res.redirect('/login');
										});
									};
								});
							}
						});
					});
				});
			}
		});

	}
}

module.exports.delete = function(req, res) {


}
