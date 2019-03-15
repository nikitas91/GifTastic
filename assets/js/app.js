
var topics = ["hockey", "football", "baseball", "curling", "volleyball", "basketball", "skiing", "snowboarding"];
var apiKey = "GXXIPKE7dL9zNyQLgPJCHj85PQe7eNyL";

$("#add-topic").on("click", function () {
    event.preventDefault();
    var topicName = $("#topic-input").val().trim().toLowerCase();
    if (!topicName) {
        alert("Enter a sport!")
    }
    else if (topics.indexOf(topicName) >= 0) {
        alert("Topic already added!");
    }
    else {
        topics.push(topicName);
        $("#topic-input").val("");
        renderButtons();
    }
});

$("#giphy-buttons").on("click", ".btn-giphy", function () {
    $("#giphy-images").empty();

    $("#giphy-buttons button").removeClass("active");
    $(this).addClass("active");

    var topicValue = $(this).attr("data-topic");

    var queryUrl = "https://api.giphy.com/v1/gifs/search?" +
        $.param({
            api_key: apiKey,
            q: topicValue,
            limit: 10,
            rating: "PG-13",
            lang: "en"
        });

    $.ajax({
        url: queryUrl,
        method: "GET"
    })
        .done(function (response) {
            var giphyResults = response.data;

            for (var i = 0; i < giphyResults.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("giphy-img");
                var gifRating = $("<p>").text("Rating: " + giphyResults[i].rating);
                var gifImage = $("<img>").attr("src", giphyResults[i].images.fixed_height_still.url);
                gifImage.attr("data-still", giphyResults[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", giphyResults[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.addClass("gif");
                gifDiv.append(gifRating);
                gifDiv.append(gifImage);
                $("#giphy-images").append(gifDiv);
            }
        });
});

$("#giphy-images").on("click", ".gif", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

function renderButtons() {
    $("#giphy-buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        newButton.attr("data-topic", topics[i]);
        newButton.addClass("btn btn-primary btn-giphy");
        newButton.text(topics[i]);
        $("#giphy-buttons").append(newButton);
    }
}

renderButtons();