$( function() {

	var slider = $( "#master" );
   slider.slider({
	 min: 18,
	 value: $(".distance-km").attr("data-value"),
	 max: 1000,
	 range: true,
	 range: "min"
  });

  var preferences =
  {
	  gender: $("input[name=sex]:checked").val(),
	  distance: $(".distance-km span").text().split("km")[0],
	  visible: false,
	  interests: JSON.stringify(getInterests()),
	  ages: JSON.stringify([18, 40])
  };

	console.log(preferences.interests);
  slider.on("slide", function(e, ui)
  {
	  // var preferences =
	  // {
		//   gender: 2,
		//   distance: ui.value,
		//   visible: false,
		//   interests: ["music", "art", "sports"],
		//   ages: JSON.stringify([18, 42])
	  //
	  // };

	  var preferences =
	  {
		  gender: $("input[name=sex]:checked").val(),
		  distance: $(".distance-km span").text().split("km")[0],
		  visible: false,
		  interests: JSON.stringify(getInterests()),
		  ages: JSON.stringify([18, 40])
	  };
	  preferences.distance = ui.value;
	  $(".distance-km span").html(ui.value+"km");
	  $.ajax({
		  url: "/profile",
		  method: 'POST',
		  data: preferences,
		  success: function(res)
		  {
			  console.log(res);
		  }
	  });

  });


	function getInterests(e)
	{
		var interests = [];
		var inter = $("input[name=interest]");
		$.each(inter, function(key, val){
			if (val.checked)
				interests.push(val.value);
		})
		return interests;
	};

  $( "#slider-range" ).slider({
	 range: true,
	 min: 0,
	 max: 300,
	 values: [ 75, 300 ],
	 slide: function( event, ui ) {
	   $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	 }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );


	$("textarea").keyup(function(){
		var bio = $(this).val();

		$.ajax({
			url: "/profile",
			method: 'POST',
			data: {bio: bio},
			success: function(res)
			{
				console.log(res);
			}
		});
	});



} );
