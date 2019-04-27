const Messages	= require('../models/messages.model');
const Chats		= require('../models/chats.model');
const Users 	= require('../models/users.model');
const Likes 	= require('../models/likes.model');
const mongoose 	= require('mongoose');

module.exports.page = function(req, res)
{
	if (req.query.getAllMessages == "true")
	{
		/*============================================
			- GET ALL MESSAGES SENT TO ME
		============================================*/
		var orStatement = [{receiver: req.user._id}, {sender: req.user._id}];

		Messages.find({$or: orStatement}, function(err, chats){
			if (err) throw err;

			var ids = [];
			var usr = [];

			for (var i = 0; i < chats.length; i++)
			{
				var sender = chats[i].sender;
				var receiver = chats[i].receiver;

				if (sender.toString() == req.user._id.toString() && ids.indexOf(receiver.toString()) == -1)
				{
					ids.push(receiver.toString());
					usr.push([receiver.toString(), chats[i].timestamp.toJSON()]);
				}
				else if(receiver.toString() == req.user._id.toString() && ids.indexOf(sender.toString()) == -1)
				{
					ids.push(sender.toString());
					usr.push([sender.toString(), chats[i].timestamp.toJSON()]);
				}
			}

			Users.find({_id: 0, _id: ids}, {_id: 1, images: 1, username: 1},  function(err, users){
				if (err) throw err;

				res.json({msj: usr, users: users});
			});

		}).sort({timestamp: -1});

	}
	else
	{
		var content = {
			title: "Matcha | My Inbox",
			css: ["chat", "inbox"],
			js: ["chat"],
			isInbox: true
		};

		var orStatement = [{userId1: req.user._id, match: 1}, {userId2: req.user._id, match: 1}];
		Likes.find({$or: orStatement}, {_id: 0, userId1: 1, userId2: 1}, function(err, matches){
			if (err)  throw err;

			if (matches)
			{
				var ids = [];
				for (var i = 0; i < matches.length; i++)
				{
					if (matches[i].userId1 != req.user._id.toString() && ids.indexOf(matches[i].userId1) < 0)
						ids.push(matches[i].userId1);
					else if (matches[i].userId2 != req.user._id.toString() && ids.indexOf(matches[i].userId2) < 0)
						ids.push(matches[i].userId2);

				}
				Users.find({_id: 0, _id: ids}, {_id: 1, images: 1, username: 1},  function(err, users){
					if (err) throw err;

					content.users = users;
					res.render("inbox", content);
				});
			}


		})
	}
}

/*============================================
	- GET ALL MESSAGES FROM SPECIFIC CHAT
============================================*/

module.exports.getMessages = function(req, res)
{
	var receiver = req.params.receiver;
	var orStatement = [{sender: receiver, receiver: req.user._id}, {sender: req.user._id, receiver: receiver}];

	Messages.find({$or: orStatement}, function(err, messages){
		if (err) throw err;
		res.json(messages);
	}).sort({timestamp: 1});
}

/*============================
	- SEND MESSAGE
============================*/
module.exports.chat = function(req, res)
{
	const message = req.body.message,
		  receiver = req.body.receiverId;
	var orStatement = [{sender: receiver, receiver: req.user._id}, {sender: req.user._id, receiver: receiver}];


	Chats.findOne({$or: orStatement}, function(err, chat){
		if (err) throw err;

		var newMessage = new Messages({
			message: message,
			sender: req.user._id,
			receiver: mongoose.Types.ObjectId(receiver)
		});

		var newChat  = new Chats({
			sender: req.user._id,
			receiver: mongoose.Types.ObjectId(receiver)
		});

		if (chat)
		{
			Chats.updateOne({$or: orStatement}, {timestamp: new Date()}, function(err, result){
				if (err) throw err;

				newMessage.save(function(err){
					if (err) throw err;
					console.log("update chats collection");
					res.json({"message": "Updated chat and new message sent"});
				})
			});
		}
		else
		{
			newChat.save(function(err){
				if (err) throw err;
				newMessage.save(function(err){
					if (err) throw err;
					console.log("new chats collection");
					res.json({"message": "new chat and message sent"});
				});
			});

		}
	})






}
