$(document).ready(function() {
    // ### Instructions
    
    // 6. Add a form to your page that takes a value from a user input box and adds it to your `topics` array. Then make a function call that takes each topic in the array and remakes the buttons on the page.
    
    // 7. Deploy your assignment to Github Pages.
    
//Global variables, setup objects

var badassWomen = ["Cleopatra", "Serena Williams", "Beyonce", "Miss Piggy", "Princess Lea"];

for(const cur of badassWomen){
    var btn = $("<button>");
    btn.addClass("woman").attr("data-woman", cur);
    btn.text(cur);
    $("#buttons").append(btn);
}

//Event listeners

$("button").on("click", function(){
    $("#gifs-appear-here").empty();
    var woman = $(this).attr("data-woman");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      woman + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.get(queryURL).done(function(response){
        var results = response.data;
        console.log(results);
    
        results.forEach(i => 
            {var womanDiv = $("<div>");
            var p = $("<p>");
            var womanImage = $("<img>");
            var stillSource = i.images.fixed_height_still.url;
            var animatedSource = i.images.original.url;
            p.text("Rating: " + i.rating);        
            womanImage.attr("src", stillSource).addClass("col-10 giphy").attr("data-state", "still").attr("data-URL", animatedSource);
            womanDiv.append(p);
            womanDiv.append(womanImage).addClass("giphyDiv");
            $("#gifs-appear-here").prepend(womanDiv);
        });

        $("img").on("click", function(){          
            var dataURL = $(this).attr("data-URL"); 
            var srcURL = $(this).attr("src"); 
            $(this).attr("src", dataURL);
            $(this).attr("data-URL", srcURL)      
        })
    })
})






});
