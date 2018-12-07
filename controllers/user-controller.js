module.exports = function(req, res)
{
	var content = {
		title: "Matcha | User Profile",
		css: ["profile","user"],
		js: ["slider"]
	};
	res.render('user', content);
}
