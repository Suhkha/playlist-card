	//Event delegate
	$(document).on("click", ".card__track--play", function(){
		var itemPlay = $(".card__track--play");
		var currentItemPlay = $(this);

		itemPlay.find(".fa-play").removeClass('fa-pause');
		itemPlay.next(".card__track--timeline").removeClass('card__track--active');

		currentItemPlay.find(".fa-play").toggleClass('fa-pause');
		currentItemPlay.next(".card__track--timeline").toggleClass('card__track--active');

		var pre = currentItemPlay.attr("src");
		var audio = new Audio([pre]);
		var  a = audio.paused;

		var t = audio.play();
		console.log(a);


	});



	//Spotify
	var spotifyApi = new SpotifyWebApi();
	spotifyApi.getAlbumTracks('1vANZV20H5B4Fk6yf7Ot9a', function(err, data) {
		if (err){
			console.error(err);
		}else{
			console.log(data);
			var source = $("#track-template").html();
			var template = Handlebars.compile(source);

			for (var i = 0; i < data['items'].length; i++)	{
				var timeSong = data['items'][i]['duration_ms'];
				var nameSong = data['items'][i]['name'];
				var preview = data['items'][i]['preview_url'];
				
			//MS to Min -- custom helper
			Handlebars.registerHelper('timeSong', function(timeSong) {
				
				var m = Math.floor(timeSong / 60000);
				var s = ((timeSong % 60000) / 1000).toFixed(0);
				var finalTimeSong = m + ":" + (s < 10 ? '0' : '') + s;
				return finalTimeSong;
			});

			Handlebars.registerHelper('nameSong', function(nameSong) {
				var finalNameSong = nameSong.replace(" - Remastered", "");
				return finalNameSong;
			});
		}
		$('.card__playlist').append(template(data));
	}
});

