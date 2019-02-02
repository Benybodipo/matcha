$(function(){

	getNotifications();
	
	function getAge(birthday)
	{
		console.log();
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs);
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}

	$(".bell").click(function(e){
		e.preventDefault();
		$(".bell  ul").toggleClass("visible");
	});

	setInterval(getNotifications, 1000)

	function getNotifications(){
		$.ajax({
			url: "/notifications",
			method: "GET",
			dataType: "json",
			success: function(data)
			{
				if(data.length)
				{
					$("#notificationsCount").text(data.length)
					$.each(data, function(key, value){
						$(".bell ul").append('<li> <a href="'+value.link+'">'+value.message+'</a></li>')
					});
				}
			},
			error: function(err)
			{
				console.log(err);
			}
		})
	};

})
