module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["home"],
		js: ["slider"],
		layout: 'index'
	};

	if (req.isAuthenticated())
		res.redirect("/home");
	else
		res.render('index', content);
}
