const nodemailer = require('nodemailer');

const credentials = {
	service: 'Gmail',
	auth: {
		user: '',
		pass: ''
	},
	tls: {
		rejectUnauthorized: false
	},
	debug: true
};

var options = function options(to, subject, message)
{
	var mailOptions = {
		from: '"Matcha" <matcha@info.com>',
		to: to,
		subject: subject,
		html: message
	};
	return mailOptions;
}

function dendMail(options)
{
	console.log(options);
}

module.exports = {
	credentials: credentials,
	options: options
}
