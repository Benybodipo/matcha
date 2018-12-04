module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["home"],
		js: ["slider"]
	};
	res.render('index', content);
}
