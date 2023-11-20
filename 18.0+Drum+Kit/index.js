// Adding an eventListener to each button corresponding to the instrument

// Detecting mouse click on button
function addSound(){
        var buttonInnerHTML = this.innerHTML;
        buttonAnimation(buttonInnerHTML);
        switch(buttonInnerHTML){
            case "w": var tom1 = new Audio("sounds/tom-1.mp3");
                      tom1.play();
                break;
            case "a": var tom2 = new Audio("sounds/tom-2.mp3");
                      tom2.play();
                break;
            case "s": var tom3 = new Audio("sounds/tom-3.mp3");
                      tom3.play();
                break;
            case "d": var tom4 = new Audio("sounds/tom-4.mp3");
                      tom4.play();
                break;
            case "k": var snare = new Audio("sounds/snare.mp3");
                      snare.play();
                break;
            case "j": var crash = new Audio("sounds/crash.mp3");
                      crash.play();
                break;
            case "l": var kickBass = new Audio("sounds/kick-bass.mp3");
                      kickBass.play();
                break;
            default: console.log(buttonInnerHTML);
        }
}


for(var i=0; i<document.querySelectorAll(".drum").length; ++i){
    document.querySelectorAll(".drum")[i].addEventListener('click', addSound);

    // Detecting keyboard keydown event
    document.querySelectorAll(".drum")[i].addEventListener('keydown', function(event){
        var key = event.key;
        buttonAnimation(key);
        switch(key){
            case "w": var tom1 = new Audio("sounds/tom-1.mp3");
                      tom1.play();
                break;
            case "a": var tom2 = new Audio("sounds/tom-2.mp3");
                      tom2.play();
                break;
            case "s": var tom3 = new Audio("sounds/tom-3.mp3");
                      tom3.play();
                break;
            case "d": var tom4 = new Audio("sounds/tom-4.mp3");
                      tom4.play();
                break;
            case "k": var snare = new Audio("sounds/snare.mp3");
                      snare.play();
                break;
            case "j": var crash = new Audio("sounds/crash.mp3");
                      crash.play();
                break;
            case "l": var kickBass = new Audio("sounds/kick-bass.mp3");
                      kickBass.play();
                break;
            default: console.log(event);
        }
    });
}

// Animates the buttons
function buttonAnimation(currentKey){
    var activeButton = document.querySelector("."+currentKey);
    activeButton.classList.add("pressed");
    setTimeout(function(){ 
                            activeButton.classList.remove("pressed");
                         }, 100);
}