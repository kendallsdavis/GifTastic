$(document).ready(function(){

console.log("hello");



// Event listener for all button elements
 $("button").on("click", function() {

// create a variable called "selection" and assign it to the value of the button clicked by the user
    var selection = $(this).attr("value");
    console.log(selection);

// store the GIPHY API and URL as variables
    var api = "0iZNa3R3DppVLV3nQAOYuHOrerfSGntH";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + api + "&q=" + selection + "&limit=10&lang=en"


// Performing AJAX GET request
   $.ajax({
    url: queryURL,
    method: "GET"
  })
// After the data comes back from the API
    .then(function(response) {
        console.log(response);
// Assign the data element of the response to a new variable called results"

        var results = response.data
        // console.log(newImage.attr);


        for (var i = 0; i < results.length; i++) {
        
            if(results[i].rating === "g" | results[i].rating === "pg" ){
                var gifDiv = $("<div>");
                var newImage = $("<img>");
                var p = $("<p>").text(results[i].rating);
                console.log(results[i].rating);


                newImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.prepend(p);
                gifDiv.append(newImage);
                $("#gifs").prepend(gifDiv);
            } 

}
 })



    });
});
