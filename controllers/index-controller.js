module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["home"],
		js: ["slider"],
		success: req.session.success,
		errors: req.session.errors
	};
	res.render('index', content);
}
