$(document).ready(function(){
	
	//Read & show data from json
	function displayTracksBeatles(urlJson, source, addTo){
		$.getJSON(urlJson, function(data){
			var source = $("#track-template").html();
			var template = Handlebars.compile(source)(data);
			$(addTo).append(template);
		});
	}
	
	displayTracksBeatles('../scripts/playlist.json', '#track-template', ".card");

	//Event delegate
	$(document).on("click", ".card__track--play", function(){
		var itemPlay = $(".card__track--play");
		var currentItemPlay = $(this);

		itemPlay.find(".fa-play").removeClass('fa-pause');
		itemPlay.next(".card__track--timeline").removeClass('card__track--active');

		currentItemPlay.find(".fa-play").toggleClass('fa-pause');
		currentItemPlay.next(".card__track--timeline").toggleClass('card__track--active');
	});

	$('.card__playlist').scrollbox({
	  linear: true,
	  delay: 0,
	  speed: 60,
	  autoPlay: false,
	  onMouseOverPause: false
	});

	$('#flow_data').mouseover (function () {
		console.log('si');
	  $('.card__playlist').trigger('forwardHover');
		}).mouseout(function() {
		  $('.card__playlist').trigger('pauseHover');
	});

});