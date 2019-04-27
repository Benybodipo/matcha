const express 			= require('express');
const app 				= express();
const passport 		= require('passport');
const LocalStrategy 	= require('passport-local').Strategy;
const Users 			= require('../models/users.model');
const bcrypt 			= require('bcryptjs');

module.exports = function() {
	passport.use(new LocalStrategy(function(username, password, done)
	{
			Users.findOne({username: username, active: 1}, function(err, user)
			{
				if (err) return done(err);
				if (!user) return done(null, false);

				bcrypt.compare(password, user.password, function(err, isMatch){
					if (err) throw err;
					if (isMatch)
					{
						Users.updateOne({_id: user._id}, {age: getAge(user.birthday)}, function(err, result){
							if (err) throw err;
							return done(null, user);
						})

					}
					else
						return done(null, false, { message: 'wrong password my broer'});
				});
			});
		}
	));
}

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	Users.findById(id, function(err, user) {
		done(err, user);
	});
});

function getAge(birthday)
{
	console.log();
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}
