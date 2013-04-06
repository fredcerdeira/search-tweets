$(document).ready(function() {

	$('#get-tweets').click(function(e){
		e.preventDefault();

		var inputVal = $('#search').val(),
			searchTerm = {
				q: inputVal
			};

		search(searchTerm);
	
	});


});



function search(searchTerm) {
	
	$.ajax({
		url: 'https://search.twitter.com/search.json?' + $.param(searchTerm) + '&rpp=5',
		dataType: 'jsonp',
		success: function(data) {

			for (item in data['results']) {
			 	$('.js-tweets').html(
			    	'<li>' + data['results'][item]['text'] + '</li>'
			    );
			}
		},
		error: function(textStatus){
				$('.js-tweets').html(
		    	'<li>cant loading tweets right now.</li>'
		    );
		}          
	});
}