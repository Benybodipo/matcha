module.exports = function(req, res)
{
	var content = {
		title: "Matcha | Welcome",
		css: ["home"],
		js: ["slider"],
		layout: 'index'
	};
	res.render('index', content);
}
