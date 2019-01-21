$(document).ready(function(){

console.log("hello");



// Event listener for all button elements
 $("button").on("click", function() {

// If the button clicked is to submit a new animal....
    if($(this).attr("id")==="submit"){
        console.log($("#new").val());
        // Assign the user input to a new variable, "new_button_val"
        var new_button_val = $("#new").val().trim();
        // Add text, class, id, and value to the new button 
        var new_button = $("<button>").text(new_button_val).addClass("btn btn-info").attr("id", new_button_val).attr("value", new_button_val);
        // Clear input field after user presses submit
        $('input[name=new-gif').val('');
        // Add a new button for the animal input by user
        $("#buttons").append(new_button);    

    } else {

// If the button clicked is one of the existing buttons...

// var search = function (){

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

        var results = response.data;

        for (var i = 0; i < results.length; i++) {
        
            if(results[i].rating === "g" | results[i].rating === "pg" ){
                var gifDiv = $("<div>");
                var newImage = $("<img>");
                var p = $("<p>").text("Rating: " + results[i].rating);
                console.log(results[i].rating);

                newImage.attr("src", results[i].images.original_still.url);
                newImage.attr("state", "still");
                newImage.attr("animated_url", results[i].images.fixed_height.url);
                newImage.attr("still_url", results[i].images.original_still.url);

                gifDiv.prepend(p);
                gifDiv.append(newImage);
                $("#gifs").prepend(gifDiv);

            }    

                $(".gif").on("click", function() {                 
        
                    var state = $(this).attr("state");
                            
                    if (state === "still") {
                    $(this).attr("src", $(this).attr("animated_url"));
                    $(this).attr("state", "animated");
                    } else {
                    $(this).attr("src", $(this).attr("still_url"));
                    $(this).attr("state", "still");
                    }
        //To close animated to still conversion if statement 
        });
// To close for statement
}


// To close ".then" statement
 })

//  To close search function
    // }

// To close else statement
    }

// To close on click function
    });
// To close document ready function
});
