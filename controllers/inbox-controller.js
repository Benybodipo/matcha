module.exports = function(req, res)
{
	var content = {
		title: "Matcha | My Inbox",
		css: ["chat"],
		js: ["profile"],
		isInbox: true
	};

	res.render("inbox", content);
}
