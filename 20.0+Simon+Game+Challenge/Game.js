var buttonColours = [ "red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var isOver = false;

function nextSequence(){
    // Generates a number between 0-3
    var randomNumber = Math.floor(Math.random()*4);

    // Saves the name of the chosen color in a variable
    var randomChosenColour = buttonColours[randomNumber];

    // Adds the chosen color to the gamePattern Array
    gamePattern.push(randomChosenColour);

    // Plays the sound, animates the random button chosen at random and updates the level
    playSound(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    $("h1").text( "Level "+ (++level) );
}

// dom-wide check for a key press, then initiates the game
var isStarted = false;
$(document).keypress(function(event){
    if (!isStarted){
        nextSequence();
        $("h1").text( "Level "+level );
        isStarted = true;
    }
});

// Plays the sound based on the name passed in
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// Animates the button by adding the "pressed" class for 100ms, then removing it
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){ 
                            $("#"+currentColour).removeClass("pressed");
                         }, 100);
}

// Detects when any of the buttons are clicked and trigger a handler function.
$(".btn").click(function() {

    // userChosenColour stores the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
  
    //4. Add the contents of the variable userChosenColour to the end of userClickedPattern
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

// Checks to see if the pattern of the user if the same as the randomly generated pattern
function checkAnswer(currentLevel) {
    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      console.log("wrong");
    }
}
