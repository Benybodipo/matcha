let Users = require('../models/users.model');

module.exports.register = function(req,res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["home"],
		js: ["slider"],
		errors: null,
		success: null
	};
	req.check("firstname", "First name too short").notEmpty().isLength({min: 3});
	req.check("lastname", "Last name too short").notEmpty().isLength({min: 3});
	req.check("username", "Username too short").notEmpty().isLength({min: 3});
	req.check("email", "Invalid e-mail").isEmail().normalizeEmail();
	req.check("password").isLength({min: 6});
	req.check("password2", "Password don't match").isLength({min: 6}).equals(req.body.password);

	var errors = req.validationErrors();

	if (errors)
	{
		content.errors = errors;
		console.log(content.errors);
		res.render("index", content);
	}
	else
	{
		var registerUser = new Users({
			 firstname: req.body.firstname,
			 lastname: 	req.body.lastname,
			 username: 	req.body.username,
			 email: 		req.body.email,
			 password: 	req.body.password,
			 gender: 	req.body.gender
		});

		registerUser.save(function(err) {
			if (err)
				console.log(err);
			else
			{
				content.success = "You have successfully register!";
				res.render("index", content)
			}

		});
		// res.render("index", )
	}

}


module.exports.login = function (req, res){
	var userObj = {
		username: req.body.username,
		password: req.body.password
	};

	Users.findOne(userObj, function(err, user)
	{
		if (err) throw err;

		if (user == null)
			console.log("Not user found");
		else
		{
			req.session.user = {
				userId: user._id,
				username: user.username
			};
			res.json(req.session);
		}
	});
}
