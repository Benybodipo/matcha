const Users 		= require('../models/users.model');
const Visits 		= require('../models/visits.model');
const Notifications = require('../models/notifications.model');
const mongoose 		= require('mongoose');

module.exports = function(req, res)
{
	var content = {
		title: "Matcha | User Profile",
		css: ["profile","user"],
		js: ["slider"]
	};
	var id = req.params.id;

	Users.findOne({_id: id}, function(err, user){
		if (err) throw err;

		content.user = user;
		res.render('user', content);
	});

	Visits.findOne({userId: id, visitorId: req.user._id.toString()}, function(err, visitors){
		if (err) throw err;

		if (!visitors)
		{
			var addNewVisitor = new Visits({userId: id, visitorId: req.user._id.toString()});
			addNewVisitor.save(function(err){
				if (err) throw err;

				var link 	= req.protocol +  "://" + req.get('host') + "/user/" + req.user._id.toString();
				var message = req.user.username + " visited your profile";

				var newNotification = new Notifications({
					userId: mongoose.Types.ObjectId(id),
					message: message,
					link: link
				});

				newNotification.save(function(err){
					if (err) throw err;
					console.log("New Notification");
				})

			});
		}

	});


}
