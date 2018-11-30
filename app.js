var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static("public"));

var index = require('./controllers/index-controller');
// 	 profile = require('./controllers/home-controller'),
// 	 profile = require('./controllers/profile-controller'),
// 	 inbox = require('./controllers/inbox-controller'),
// 	 user	= require('./controllers/user-controller');

app.get('/', function(req, res){
	var content = {
		title: "Matcha | Welcome",
		css: ["home"],
		js: ["slider"]
	};
	res.render('index', content);
})





app.listen(8080, function(){ console.log("runing on port 8080");});
