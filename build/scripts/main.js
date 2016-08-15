var cardTrackPlay,cardTrackPause,cardTrackActive,audio,play,endItem,activeItem,idItemPause,pause;


function playSong(){
	play = audioTag[0].play();
	cardTrackPlay.hide();
	cardTrackPause.show();
	cardTrackActive.addClass('card__track--active');
}

	function endSong (){
		pause = audioTag[0].pause();
		cardTrackPause.hide();
		cardTrackPlay.show();
		activeItem.removeClass('card__track--active');
	}


	$(document).on("click", ".card__track--play", function(){
		cardTrackPlay = $(this); 
		cardTrackPause = $(this).next(); 

		cardTrackActive = cardTrackPause.next(); 
		audioTag = $(this).prev();
		audioSrc = audioTag[0];
		audioId = audioTag.attr("id");

		
		playSong();
	
		audioSrc.onended = function() {
    	endSong();
		};
	});

	$(document).on("click", ".card__track--pause", function(){
		cardTrackPause = $(this);
		cardTrackPlay = $(this).prev();

		activeItem = cardTrackPause.next();
		audioTag = cardTrackPlay.prev();

		endSong();
	});


	//Spotify
	var spotifyApi = new SpotifyWebApi();
	spotifyApi.getAlbumTracks('1vANZV20H5B4Fk6yf7Ot9a', function(err, data) {
		if (err){
			console.error(err);
		}else{
			var source = $("#track-template").html();
			var template = Handlebars.compile(source);

			for (var i = 0; i < data['items'].length; i++)	{
				var timeSong = data['items'][i]['duration_ms'];
				var nameSong = data['items'][i]['name'];
				var preview = data['items'][i]['preview_url'];
				var track_number = data['items'][i]['track_number'];
			
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

