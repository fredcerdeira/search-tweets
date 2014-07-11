$(document).ready(function() {

	$('#get-tweets').click(function(e){
		e.preventDefault();

		//remove results
		$('.results').remove();

		var inputVal = $('#search').val(),
			searchTerm = {
				q: inputVal
			};

		if (inputVal != "" ){
			search(searchTerm);
		} else {
			$('.status-msg').removeClass('hidden');
		}
	
	});

	showAbout();


});


function showAbout(){
	$('#show-content').click(function(e) {
		e.preventDefault();

		var elToShow = $('.about');


		if (elToShow.hasClass('hidden')){
			elToShow.removeClass('hidden');
			$(this).addClass('active');
		} else {
			elToShow.addClass('hidden');
			$(this).removeClass('active');
		} 
		
	})
}


function search(searchTerm) {
	
	$('.status-msg').addClass('hidden');
	$('.loading').show();
	

	$.ajax({
		url: 'https://search.twitter.com/search?' + $.param(searchTerm) + '&rpp=5',
		dataType: 'jsonp',
		success: function(data) {
			
			//console.dir (data);
			$('.loading').hide();

			if (data['results'].length == 0){ $('.status-msg').removeClass('hidden').html('No Tweets with that term!');};

			$('.wrapper').append('<ul class="results js-tweets"></ul>');

			for (item in data['results']) {

				var userPic  	= data['results'][item]['profile_image_url'].replace('_normal', '_bigger'),
					userText 	= data['results'][item]['text'],
					userId		= data['results'][item]['from_user'],
					tweetUrl 	= 'https://twitter.com/' + userId + '/status/' + data['results'][item]['id_str'];


			 	$('.js-tweets').append(
			    	'<li><a href="https://twitter.com/'+ userId +'"><img src="'+ userPic +'"></a><a href="'+ tweetUrl +'">'+ userText + '</a></li>'
			    );
			}

			
		}        
	});
}
