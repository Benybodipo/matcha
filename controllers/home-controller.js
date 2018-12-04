module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["home"],
		js: ["slider"]
	};
	// if(req.session.user)
	// {
	// 	// res.render('home', content);
	// 	res.json(req.body);
	// }
	// else
		res.json(req.body)
}
