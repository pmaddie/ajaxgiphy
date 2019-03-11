$(document).ready(function () {
    // Event listener for all button elements
    // $("button").on("click", function() {

    var topicsArray = ["reaction", "frenchies", "sunsets", "babies", "roller coasters", "beaches"];



    function startButtons() {
        $("#buttons").empty();


        for (let i = 0; i < topicsArray.length; i++) {
            var btn = $("<button>");
            // this is javascripts way of saying hey HTML do this.
            btn.addClass("topic");
            btn.attr("data-name", topicsArray[i]);//<button class"nbaButton "data-name"="nba"></button>
            btn.text(topicsArray[i]);
            $("#buttons").append(btn);
        }
    };
        $("#buttonToClick").on("click", function(event){
            event.preventDefault();
            var addedData = $("#userChoice").val().trim();
            if (addedData != "") {
                topicsArray.push(addedData);
                startButtons();
                $("#userChoice").val();
            }
        })

    $(document).on("click", ".topic", function () {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&rating=g&lang=en&api_key=reBu7hG5uVhdgc0Ocacr040Ouwv5LBkV&";

        // performing the AJAX request with the query URL and get method
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data;

            for (i = 0; i < results.length; i++) {
                console.log(results);

                var topicDiv = $("<div>");
                var p = $("<p>").text("Rating: " + results[i].rating);

                var topicImage = $("<img>");
                topicImage.attr("src", results[i].images.fixed_height_still.url);
                topicImage.attr("data-animate", results[i].images.fixed_height.url);
                topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                topicImage.addClass("gif");
                topicImage.attr("data-state", "still");

                topicDiv.append(p);
                topicDiv.append(topicImage);
                

                $("#gifImages").prepend(topicDiv);
            }

        });
   
    })
    //after data comes back
    $("#gifImages").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still"){
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })
    startButtons();

});




// create array of strings of different topics and set it to the "topic" variable. 
// go through the array and make a button for each using a loop
// make the pauseable
