// check if cdn for jQuery is ready
$(document).ready(function(){
    // Sets color of h1 to red
    $("h1").css("color","red");

    // During click of h1, set color to brown
    $("h1").click(function() {
        $("h1").css("color", "brown");
    });
})

// Modify link of all "a" attribute to point elsewhere
$("a").attr("href", "https://www.DuckDuckGo.com");

// Gives all button the function of turning the h1 green when clicked
$("button").click(function() {
    $("h1").css("color", "green");
})

// Logs the keys pressed
$("input").keypress(function(event){
    $("p").text( $("input").val()+event.key );
});

// Changes the color when moused over, and add a new link after
$("a").on("mouseover", function(){
    $("a").css("color", "purple");
    $("p").after("<a href='https:www.google.com'>Google</a>");
});