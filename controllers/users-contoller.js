let Users = require('../models/user');
let Register = Users.Register;
let Login = 	Users.Login;

module.exports.register = function(req,res)
{
	// var User = Users.Register;
	var registerUser = new Register({
		 firstname: req.body.firstname,
		 lastname: 	req.body.lastname,
		 username: 	req.body.username,
		 email: 		req.body.email,
		 password: 	req.body.password,
		 gender: 	req.body.gender
	});
	registerUser.save(function(err) { if (err) throw err; console.log("Success");});
	res.render("home");
}


module.exports.login = function (req, res){
	var userObj = {
		username: req.body.username,
		password: req.body.password
	};

	Register.findOne(userObj, function(err, user){
		if (err) throw err;

		if (user == null)
			console.log("Not user found");
		else
		{
			req.session.user = user;
			res.json(req.session.user);
		}
	});

}
