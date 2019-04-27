const Likes 	= require('../models/likes.model');
const mongoose 	= require('mongoose');
const Notifications = require('../models/notifications.model');

module.exports.getLikes = function(req, res){

	Likes.find({userId1: req.user._id}, function(err, likes){
		if (err) throw err;
		res.send(likes);
	});
}

module.exports.like = function(req, res){

	// Profile owner id
	var id 			= req.body.userId;
	var orStatement = [{userId1: id, userId2: req.user._id}, {userId2: id, userId1: req.user._id}];

	Likes.findOne({$or: orStatement}, function(err, likes){
		if (err) throw err;

		if (likes)
		{
			if ((likes.userId1.toString() == req.user._id.toString()))
			{
				if (likes.match ==  0)
				{
					Likes.updateOne({userId1: req.user._id, userId2: id}, {$set: {match: 1}}, function(err, success){
						if (err) throw err;

						var message = req.user.username + " is a new Match";
						newNotification(id, req.user._id, 3, message, "www.google.com");

						res.send({return: 1});
					});
				}
				else
				{
					Likes.deleteOne({userId1: id, userId2: req.user._id, match: 1}, function(err, result){
						if (err) throw err;
						Notifications.deleteOne({userId: id, userId2: req.user._id, type: 2}, function(err, result){
							if (err) throw err;
							res.send({return: 0});
						});
					});
				}
			}
			else
			{
				if (likes.match == 0)
				{
					Likes.deleteOne({userId1: id, userId2: req.user._id}, function(err, result){
						if (err) throw err;
						Notifications.deleteOne({userId: id, userId2: req.user._id, type: 2}, function(err, result){
							if (err) throw err;
							res.send({return: 0});
						});
					});
				}
				else
				{
					Likes.updateOne({userId1: id, userId2: req.user._id}, {$set: {match: 0}}, function(err, result){
						if (err) throw err;

						Notifications.deleteOne({userId: id, userId2: req.user._id, type: 3}, function(err, result){
							if (err) throw err;
							res.send({return: 0});
						});

					});
				}

			}

		}
		else
		{
			var like = new Likes({userId1: id, userId2: req.user._id});

			like.save(function(err){
				if (err) throw err;

				var message = req.user.username + " liked your profile";
				newNotification(id, req.user._id, 2, message, "www.google.com");
				res.send({return: 1});
			});
		}
	});

}

function newNotification(userId, userId2, type,  message, link)
{
	var newNotification = new Notifications({
		userId: mongoose.Types.ObjectId(userId),
		userId2: userId2,
		type: type,
		message: message,
		link: link
	});

	newNotification.save(function(err){
		if (err) throw err;
		console.log("New Notification");
	})
}
