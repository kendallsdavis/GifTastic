$(document).ready(function(){

    var topics = ["Cats","Goats","Dogs","T-Rex","Squirrels","Hamsters"]

    // ====================================================================================

// Define function to clear #buttons div, and populate it with a button for each element of the topic array
// Function adds text, class, id, value, category, and styling to each new button
    button_fun = function(){
        $("#buttons").empty();
    for(var i = 0; i<topics.length; i++){
        var new_button_val = topics[i];
        var new_button =  $("<button>").text(new_button_val).addClass("btn btn-info").attr("id", new_button_val).attr("value", new_button_val).attr("category","animal").attr("type","button");
        new_button.css({width:"80px", margin:"4px", padding:"5px"});
        $("#buttons").append(new_button);
    }
}

    // Generate buttons for all values in the topics array
        button_fun();

    // =====================================================================================  
    // function to turn on and off animation
    $('body').on('click','img',function(){
        console.log('it works');
    
        var state = $(this).attr("state");
                
        if (state === "still") {
            // on click, if the img state = still, change the image url to the animated url and the state to animated
        $(this).attr("src", $(this).attr("animated_url"));
        $(this).attr("state", "animated");
        } else {
            // otehrwise change the image url to the still url and the state to still
        $(this).attr("src", $(this).attr("still_url"));
        $(this).attr("state", "still");
        }
    })
    // ====================================================================================
    // Event listener for all button elements on the page with class "btn btn-info"
     $(document).on("click", ".btn.btn-info",function() {
    
    // If the button clicked is to submit a new animal....
        if($(this).attr("id")==="submit"){
            new_animal = $("#new").val().trim();
            topics.push(new_animal);
            button_fun();
         } else { 
                
    // ====================================================================================
    
    // Otherwise, if the button clicked is to select an existing animal...
         if($(this).attr("category")==="animal"){         
    
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
    
            // After the data comes back from the API, assign the data element of the response to a new variable called "results", 
            // and execute the for statement
            .then(function(response) {
                console.log(response);
                var results = response.data;
    // =====================================================================================
                for (var i = 0; i < results.length; i++) {
                    // If the gif is rated "g" or "pg", create a new empty div, a new empty image tag, and a <p> holding rating info
                    // Add attributes to each image for source, state, animated url, and still url
                    // Append the <p> and image together into the div, then append the div into the #gifs portion of the page
                    if(results[i].rating === "g" | results[i].rating === "pg" ){
                        var gifDiv = $("<div>");
                        var newImage = $("<img>");
                        var p = $("<p>").text("Rating: " + results[i].rating);
                        console.log(results[i].rating);
    
                        newImage.attr("src", results[i].images.fixed_height_still.url);
                        newImage.attr("state", "still");
                        newImage.attr("animated_url", results[i].images.fixed_height.url);
                        newImage.attr("still_url", results[i].images.fixed_height_still.url);
                        newImage.addClass("gif");
    
                        gifDiv.prepend(p);
                        gifDiv.append(newImage);
                        $("#gifs").prepend(gifDiv);
                        }
                    }    
    // =====================================================================================
    // To close "then" statement
    })
    //  To close second if statement
    }  
    //  To close else statement
    }
    // To close document on click listener
    });
    // To close document ready function
    });
    // ==========================================================================
    