const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const session = require('express-session');


app.set('view engine', 'ejs');
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(validator());
app.use(session({ secret:"abcd", resave: false, saveUninitialized:false}));

mongoose.connect(config.database, { useNewUrlParser: true});
var db = mongoose.connection;


db.once('open', function() {console.log('Connected to MongoDB');});
db.on('error', function(err) { console.log(err);});




var indexController	  = require('./controllers/index-controller');
var loginController	  = require('./controllers/login-controller');
var homeController	  = require('./controllers/home-controller');
var users = require('./controllers/users-contoller.js');

/*======================
	- GETS
======================*/
app.get("/", indexController);
app.get("/login", loginController);
app.get("/home", homeController);
app.get("/logout", function (req, res){
	if (req.session.user)
		req.session.destroy(function (err){
			if (err) throw err;
			res.redirect("/login");
		})
})

/*======================
	- POSTS
======================*/
app.post('/register', users.register);
app.post("/login", users.login);



app.listen(7500, function(){ console.log("runing on port 8080");});
