var express = require('express'),
	app = express();

var index = require('controllers/index-controller'),
	 profile = require('controllers/home-controller'),
	 profile = require('controllers/profile-controller'),
	 inbox = require('controllers/inbox-controller'),
	 user	= require('controllers/user-controller');


app.listen(3000, function(){ console.log("runing on port 8000");});
