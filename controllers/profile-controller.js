const Preferences 		= require('../models/preferences.model');
module.exports = function(req, res)
{
	Preferences.findOne({_id: req.user._id}, function(err, preferences){
		var content = {
			title: "Matcha | Profile",
			css: ["profile"],
			js: ["profile"],
			user: req.user,
			preferences:preferences,
			profileImg: req.user.images[0]
		};
		content.sex = {
			men: (preferences.gender == 1) ? "checked" : "",
			women: (preferences.gender == 2) ? "checked" : "",
			both: (preferences.gender == 3) ? "checked" : ""
		}
		var interests = preferences.interests;
		content.interests = {
			movies: (interests.indexOf("movies") >= 0) ? "checked" : "",
			art: (interests.indexOf("art") >= 0) ? "checked" : "",
			food: (interests.indexOf("food") >= 0) ? "checked" : "",
			travel: (interests.indexOf("travel") >= 0) ? "checked" : "",
			sports: (interests.indexOf("sport") >= 0) ? "checked" : "",
			music: (interests.indexOf("music") >= 0) ? "checked" : "",
			hiking: (interests.indexOf("hiking") >= 0) ? "checked" : "",
			books: (interests.indexOf("books") >= 0) ? "checked" : ""
		}

		content.ages = {min: preferences.ages[0], max: preferences.ages[1]};

		content.user.bio = (req.user.bio) ? req.user.bio : "";
		res.render("profile", content);
	})

}
