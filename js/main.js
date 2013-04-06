$(document).ready(function() {

	$('#get-tweets').click(function(e){
		e.preventDefault();

		//remove results
		$('.results').remove();

		var inputVal = $('#search').val(),
			searchTerm = {
				q: inputVal
			};

		search(searchTerm);
	
	});


});



function search(searchTerm) {
	
	$('.loading').show();
	
	$.ajax({
		url: 'https://search.twitter.com/search.json?' + $.param(searchTerm) + '&rpp=5',
		dataType: 'jsonp',
		success: function(data) {

			$('.wrapper').append('<ul class="results js-tweets"></ul>');

			for (item in data['results']) {
			 	$('.js-tweets').append(
			    	'<li>' + data['results'][item]['text'] + '</li>'
			    );
			}

			$('.loading').hide();
		}        
	});
}