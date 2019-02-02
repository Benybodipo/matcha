const Users 		= require('../models/users.model');
const Links 		= require('../models/links.model');
const Preferences = require('../models/preferences.model');

module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Login",
		css: ["home", "login"],
		js: ["slider"],
		layout: 'index',
		username: (req.params.username) ? req.params.username : ""
	};

	if (req.params.token)
	{
		Links.findOne({userid: req.params.id, token: req.params.token}, function (err, link){
			if (err) throw err;
			if (link)
			{
				Users.findOne({_id: req.params.id}, function(err, user) {
					if (err) throw err;
					if (user)
					{
						/*===============================
							- Change status to active
						===============================*/
						Users.update({_id: req.params.id}, {active: 1}, function(err, res){
							if (err) throw err;
							Links.remove({userid: req.params.id, token: req.params.token}, function(err, obj){
								if (err) throw err;
							});

							/*=================================
								- Create default preferences
							=================================*/
							var preferences = {
								gender: (user.gender == "male") ? 2 : 1,
								distance: 50,
								ages: [18, 50]
							};

							Users.update({_id: req.params.id}, {preferences: preferences}, function(err, res){
								if (err) throw err;
								console.log(res);
							});
						});

					}
				});
			}
		})
	}
	if (req.isAuthenticated())
		res.redirect("/home");
	else
		res.render('login', content);
}
