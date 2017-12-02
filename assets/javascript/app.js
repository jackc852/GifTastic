// Define variables
var topics = ["The Transformers", 'Thundercats', 'He-Man and the Masters of the Universe', 'Teenage Mutant Ninja Turtles']
var limit = 10;
var topic = "";

// Function to call the Gify query and create the div to place the rating and images.
function displayTopicInfo() {
	$("#gif-view").empty();
	topic = $(this).attr('data-name');
	console.log($(this).attr('data-name'));
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=KKTyxFj49BWA4RsScMKsF373f87sLr54&limit="+ limit + "&fmt=JSON";

	$.ajax({
		url: queryURL, 
		method: 'GET'
	  })
	  .done(function(response) {

	  	console.log(queryURL);
	  	console.log(response);
	  	console.log(topic);
        
	  	var results = response.data;

	  	//For loop to go through results, retrieve and filter through rating data, and display rating
      	for(var i = 0; i < results.length; i++) {
			var topicDiv = $('<div>');
			var rating = results[i].rating;
			if (rating === "r" || rating === "pg-13") {
			} else {
			var pRating = $('<p id="rating">').text("Rating: " + rating);
			topicDiv.append(pRating);

			// Create element to hold image
			var image = $('<img>')
			image.attr('src', results[i].images.fixed_height_still.url);
			image.attr('data-still', results[i].images.fixed_height_still.url);
			image.attr('data-animate', results[i].images.fixed_height.url);
			image.attr('data-state', 'still');
			image.attr('data-name', topic);
			image.addClass('topicImage');

			console.log("------------------");
			console.log(results[i]);
			console.log(topic);
			console.log('Itterator: '+i);
			console.log("Data Still: " + results[i].images.fixed_height_still.url);
			console.log("Data Animate: " + results[i].images.fixed_height.url);

			// Append the image
			topicDiv.append(image);

			// Put the entire image above the previous images.
			$("#gif-view").prepend(topicDiv);
	  }
	  }
	});

	  return false;

}

// Function tp display topics
function genButtons(){

	// Deletes the topics prior to adding new topics to avoid repeat buttons)
	$('#button-view').empty();

	// For loop through array of topics and generate each
	for (var i = 0; i < topics.length; i++){
	    var a = $('<button>');
	    a.addClass('btn btn-danger topic');
	    a.attr('data-name', topics[i]);
	    a.text(topics[i]);
	    $('#button-view').append(a);
	}
	return false;
}

// Function to handle events when button is clicked
$('#addTopic').on('click', function() {
	var topic = $('#topic-input').val().trim();
	topics.push(topic);
	genButtons();

	return false;
});

//Function to animate still gif
function changestate() {

	console.log($(this));
    var state = $(this).attr('data-state');
    console.log(state);
    if (state === 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

}

	// Call genButtons() function
	genButtons();

	// Function for displaying topicInfo
	$(document).on('click', '.topic', displayTopicInfo);

	// Function for calling changestate based class topicImage
	$(document).on('click', '.topicImage', changestate);