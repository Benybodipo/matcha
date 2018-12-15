$( function() {

	var sizes = {
		width: 0,
		height: 0
	};

	var img = $("#demo").croppie({
		enableExif: true,
		viewport: {
			width: 300,
			height: 300,
			type: 'square'
		},
		boundary: {
			width: 400,
			height: 400
		}
	});

	$(".upload_img").on("change", function(e)
	{

		var obj = new FileReader();

		obj.onload = function(data)
		{
			img.croppie("bind", {
				url: data.target.result
			}).then(function(){
				console.log("Uploaded");
			});
		}
		obj.readAsDataURL(this.files[0]);
	});

	$("#crop-img").click(function(e){
		img.croppie("result", {
			type: 'canvas',
			size: 'viewport',
			format: "jpeg",
			quality: .5
		}).then(function(response){
			$.ajax({
	 		  url: "/profile",
	 		  method: 'POST',
	 		  data: {action:"update-info", positio: 0, img: response},
	 		  success: function(res)
	 		  {
	 			  console.log(res);
	 		  }
	 	  });
		});
	})


	/*========================
		- DISTANCE SLIDER
	========================*/
	var slider = $( "#master" );
	slider.slider({
		min: 18,
		value: $(".distance-km").attr("data-value"),
		max: 1000,
		range: true,
		range: "min"
	});
	slider.on("slide", function(e, ui)
	{
	  $(".distance-km span").html(ui.value+"km");
	  sendData();
	});


	/*========================
		- AGE RANGE SLIDER
	========================*/
	var range = $( "#slider-range" );
	range.slider({
		range: true,
		min: 18,
		max: 150,
		values: [$(".min").text(), $(".max").text()],
	});
	range.on("slide", function(e, ui){
		var min = ui.values[0];
		var max = ui.values[1];

		$(".min").text(min);
		$(".max").text(max);
		sendData();
	});

	$("input[name=sex]").change(sendData);
	$("input[name=interest]").change(sendData);

	/*========================
		- HELPER FUNCTIONS
	========================*/

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

	function sendData()
	{
		var preferences = {
	 	  gender: $("input[name=sex]:checked").val(),
	 	  distance: $(".distance-km span").text().split("km")[0],
	 	  visible: false,
	 	  interests: JSON.stringify(getInterests()),
	 	  ages: JSON.stringify([$(".min").text(), $(".max").text()]),
		  action: "update-preferences"
	   };
		$.ajax({
 		  url: "/profile",
 		  method: 'POST',
 		  data: preferences,
 		  success: function(res)
 		  {
 			  console.log(preferences);
 		  }
 	  });
	}


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
