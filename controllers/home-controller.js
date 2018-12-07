module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["chat"],
		js: ["search"]
	};

	res.render("home", content);
}
