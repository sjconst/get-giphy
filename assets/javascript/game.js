$(document).ready(function() {
   
//Global variables, setup objects

var badassWomen = ["Cleopatra", "Serena Williams", "Beyonce", "Miss Piggy", "Princess Lea", "Cher", "Abby Wambach", "Ruth Bader Ginsburg"]; 

for(const cur of badassWomen){
    var btn = $("<button>");
    btn.addClass("woman").attr("data-woman", cur);
    btn.text(cur);
    $("#buttons").append(btn);
};

var getImages = {
    getResults: function(response) {
        var results = response.data;       
        results.forEach(i => {
            var womanDiv = $("<div>");
            var p = $("<p>");
            var womanImage = $("<img>");
            var stillSource = i.images.fixed_width_still.url;
            var smallStillSource = i.images.fixed_width_small_still.url;
            var animatedSource = i.images.original.url;           
            p.text("Rating: " + i.rating);        
            womanImage.attr("src", stillSource).addClass("col-10 giphy").attr("data-state", "still").attr("data-URL", animatedSource);
            womanDiv.append(p);
            womanDiv.append(womanImage).addClass("giphyDiv");
            $("#gifs-appear-here").append(womanDiv);                     
            var icon = $("<i>");            
            icon.addClass("fas fa-heart imageHeart").attr("data-favorite", smallStillSource).attr("data-state", "still").attr("data-URL", animatedSource);
            p.append(icon);
            icon.wrap("<button class='btn btn-link btn-sm'></button>")
        });
    } 
} 

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

$(document.body).on("click", ".woman", ".addMore", function(){
    var $gifsHere = $("#gifs-appear-here");
    $gifsHere.empty();
    var woman = $(this).attr("data-woman");
    var button = $("<button>");
    button.addClass("addMore").addClass("animated").addClass("bounce").addClass("infinite").text("Add 10!");
    $("#add-ten").html(button);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      woman + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.get(queryURL).done(getImages.getResults)

    $(".addMore").on("click", function(){
        var tenMore = 10;
        var moreURL = queryURL + "&offset=" + tenMore;       
        $.get(moreURL).done(getImages.getResults);
        tenMore += 10;
    })
})

$(document.body).on("click", "img", function(){            
    var dataURL = $(this).attr("data-URL"); 
    var srcURL = $(this).attr("src"); 
    $(this).attr("src", dataURL);
    $(this).attr("data-URL", srcURL)   
})
var allGifs = [];
$(document.body).on("click", ".imageHeart", function(){    
    var thisGif = $(this).attr("data-favorite");
    var thisAnimated = $(this).attr("data-URL");
    allGifs.push(thisGif);      
    localStorage.setItem("Item", allGifs.toString());
    var favGif = $("<img>").attr("src", thisGif).addClass("favImage").attr("data-state", "still").attr("data-URL", thisAnimated);
    $(".favs-go-here").append(favGif);        
})
});
