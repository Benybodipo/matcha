const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/database');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const session = require('express-session');
const path = require('path');
const hbs = require('express-handlebars');



app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname,'views/layouts/')}));
app.set('view engine', 'hbs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(validator());
app.use(session({ secret:"abcd", resave: false, saveUninitialized:false}));

mongoose.connect(config.database, { useNewUrlParser: true});
var db = mongoose.connection;


db.once('open', function() {console.log('Connected to MongoDB');});
db.on('error', function(err) { console.log(err);});




var indexController	  = require('./controllers/index-controller'),
	 loginController	  = require('./controllers/login-controller'),
	 homeController	  = require('./controllers/home-controller'),
	 userController	  = require('./controllers/user-controller'),
	 profileController  = require('./controllers/profile-controller'),
	 inboxController    = require('./controllers/inbox-controller');

var users = require('./controllers/users.contoller.js');

/*======================
	- GETS
======================*/
app.get("/", indexController);
app.get("/login", loginController);
app.get("/user", userController);
app.get("/home", homeController);
app.get("/profile", profileController);
app.get("/inbox", inboxController);
app.get("/logout", function (req, res){ });

/*======================
	- POSTS
======================*/
app.post('/register', users.register);
app.post("/login", users.login);



app.listen(7500, function(){ console.log("runing on port 8080");});
