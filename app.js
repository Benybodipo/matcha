const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cookieSession = require('cookie-session');
const session = require('express-session');
const MongoSotre = require('connect-mongo')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const path = require('path');
const hbs = require('express-handlebars');
const nodemailer = require('nodemailer');



app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: path.join(__dirname, 'views/layouts/')
}));
app.set('view engine', 'hbs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(validator());
app.use(session({
	secret: "abcd",
	resave: false,
	saveUninitialized: false,
	store: new MongoSotre({ mongooseConnection: mongoose.connection}),
	// cookie: {maxAge: 180 * 60 * 1000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});



mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true});
var db = mongoose.connection;
db.once('open', function() {
	console.log('Connected to MongoDB');
});
db.on('error', function(err) {
	console.log(err);
});




var indexController = require('./controllers/index-controller'),
	loginController = require('./controllers/login-controller'),
	homeController = require('./controllers/home-controller'),
	userController = require('./controllers/user-controller'),
	profileController = require('./controllers/profile-controller'),
	inboxController = require('./controllers/inbox-controller');

var users = require('./controllers/users.contoller.js');

/*======================
	- GETS
======================*/
app.get("/", indexController);
app.get("/login", loginController);
app.get("/login/:username/:id/:token/:type", loginController);
app.get("/user/:id", authenticationMiddleware(), userController);
app.get("/home", authenticationMiddleware(), homeController);
app.get("/profile", authenticationMiddleware(), profileController);
app.get("/inbox", authenticationMiddleware(), inboxController);
app.get("/logout", authenticationMiddleware(), function(req, res){
	req.logout();
	req.session.destroy();
	res.redirect("/");
});

/*======================
	- POSTS
======================*/
app.post('/register', users.register);
app.post("/login", passport.authenticate('local', {
	successRedirect: '/home',
	failureRedirect: '/login'
}));
app.post('/profile', users.profile);


function authenticationMiddleware()
{
	return (req, res, next) => {
	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
}

app.listen(7500, function() {
	console.log("runing on port 7500");
});
