module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Login",
		css: ["home", "login"],
		js: ["slider"],
		layout: 'index'
	};

	if (req.isAuthenticated())
		res.redirect("/home");
	else
		res.render('login', content);
}
