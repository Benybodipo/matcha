var express = require('express');
var controller = express();

let User = require('../models/user');
controller.post('/', (req, res)=> {

	var firstname = req.body.firstname,
	 	 lastname  = req.body.lastname,
	 	 username  = req.body.username,
	 	 email     = req.body.email,
	 	 password  = req.body.password,
	 	 password2 = req.body.password2;

	var newUser = new User({
							 firstname: firstname,
							 lastname: lastname,
							 username: username,
							 email: email,
							 password: password
						});
	newUser.save(function(err) {
       console.log("Callback");
            if (err) {
             console.log("error");
            throw err;
   		}
	})
	res.json(req.body);
	// res.render('home');
})

module.exports = controller;
