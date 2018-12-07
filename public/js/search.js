$( function()
{

   $( "#master" ).slider({
	 value: 60,
	 orientation: "horizontal",
	 range: "min",
	 animate: true
  });

  $( "#slider-range" ).slider({
	 range: true,
	 min: 0,
	 max: 300,
	 values: [ 75, 300 ],
	 slide: function( event, ui ) {
	   $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
	 }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
	 " - $" + $( "#slider-range" ).slider( "values", 1 ) );


});
