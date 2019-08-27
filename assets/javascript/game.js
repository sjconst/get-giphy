$(document).ready(function() {
   
//Global variables, setup objects

var badassWomen = ["Cleopatra", "Serena Williams", "Beyonce", "Miss Piggy", "Princess Lea", "Cher", "Abby Wambach", "Ruth Bader Ginsburg"]; 


for(const cur of badassWomen){
    var btn = $("<button>");
    btn.addClass("woman").attr("data-woman", cur);
    btn.text(cur);
    $("#buttons").append(btn);
};

//Event listeners
$("#submit-button").on("click", function(){
    event.preventDefault();
    var btn2 = $("<button>");
    var inputTerm = $("#term").val();  
    btn2.addClass("woman").attr("data-woman", inputTerm);
    btn2.text(inputTerm);
    $("#buttons").append(btn2);
    badassWomen.push(inputTerm);
    $("form").trigger("reset"); 
});

$(document.body).on("click", ".woman", function(){
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
            womanImage.attr("src", stillSource).addClass("col-10 giphy btn-new").attr("data-state", "still").attr("data-URL", animatedSource);
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
