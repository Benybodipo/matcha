module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Login",
		css: ["home", "login"],
		js: ["slider"]
	};
	res.render('login', content);
}
