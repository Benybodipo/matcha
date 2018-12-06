module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["home"],
		js: ["slider"]
	};

	if(req.session.user)
	{
		// res.json(req.session);
		res.render("home", content);
	}
	else
		res.json({message: "Not logged in"})
}
