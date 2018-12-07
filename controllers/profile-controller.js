module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Profile",
		css: ["profile"],
		js: ["profile"]
	};

	res.render("profile", content);
}
