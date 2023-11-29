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

// Gives all button the function of turning the h1 green and animated when clicked
$("button").click(function() {
    $("h1").css("color", "green");
    $("h1").animate({
        margin:"20%",
        opacity: 0.75,
    }).slideToggle();
});

// Logs the keys pressed
$("input").keypress(function(event){
    $("p").text( $("input").val()+event.key );
});

// Changes the color when moused over, and add a new link after
var isGoogle = false;
$("a").on("mouseover", function(){
    $("a").css("color", "purple");
    if(isGoogle == false){
        $("p").after("<a href='https:www.google.com'>Google</a>");
        isGoogle = true;
    }
});