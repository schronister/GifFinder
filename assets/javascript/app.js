var buttons = ["Jon Snow", "Cersei Lannister", "Tyrion Lannister", "Arya Stark", "Sansa Stark", "Khal Drogo", "Joffrey Baratheon", "Daenerys Targaryen"];


function renderButtons(){
	$("#buttons").empty();
	for (var i = 0; i < buttons.length; i++){

		$("#buttons").append("<button class='gifButton' id='"+buttons[i]+"'>"+buttons[i]+"</button>");
	}

	
}





function loadGifs(){
	$("#gifs").empty();
	var gifTitle = this.id;
	$("#gifs").append("<h2>"+gifTitle+" Gifs</h2>");
	$("#gifs").append("<p>Click an image below to play. Click again to stop.</p>");
	$.ajax({url:"http://api.giphy.com/v1/gifs/search?q="+gifTitle+"&api_key=dc6zaTOxFJmzC&limit=10",method:"GET"})
	.done(function(response){
		for (var i = 0; i < response.data.length; i++){
			var staticImage = response.data[i].images.original_still.url;
			var imageID = response.data[i].id;
			$("#gifs").append("<div class='gifHolder' id='gif"+i+"'></div>")
			$("#gif"+i).append("<img class='stillImage' id='"+imageID+"' src='"+staticImage+"'>");
			$("#gif"+i).append("<p>Rating: "+response.data[i].rating.toUpperCase()+"</p>");
		}
	})

}

function playGif(){
	var gifID = this.id;
	$.ajax({url:"http://api.giphy.com/v1/gifs/"+gifID+"?api_key=dc6zaTOxFJmzC", method:"GET"})
	.done(function(response){
		var gifURL = response.data.images.fixed_height.url;
		$("#"+gifID).attr("src", gifURL);
		$("#"+gifID).attr("class", "gif");
	})


}

function stopGif(){
	var gifID = this.id;
	$.ajax({url:"http://api.giphy.com/v1/gifs/"+gifID+"?api_key=dc6zaTOxFJmzC", method:"GET"})
	.done(function(response){
		var staticImage = response.data.images.original_still.url;
		$("#"+gifID).attr("src", staticImage);
		$("#"+gifID).attr("class", "stillImage");
	})
}



$('#addItem').on('click', function(){

	// Grab the new item
	var newItem = $('#newItem').val().trim();

	buttons.push(newItem);
	renderButtons();

	// Prevents moving to the next page
	return false;
});


$(document).ready(function(){
	renderButtons();
})

$(document).on("click",".gifButton",loadGifs);

$(document).on("click",".stillImage",playGif);

$(document).on("click",".gif",stopGif);