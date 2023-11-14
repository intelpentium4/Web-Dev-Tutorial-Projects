
document.querySelector("button").addEventListener('click', function (){
    var randomNumber1 = Math.floor(1 + Math.random()*6);
    var randomNumber2 = Math.floor(1 + Math.random()*6);

    document.querySelector(".dice .img1").setAttribute("src", "images/dice"+randomNumber1+".png");
    document.querySelector(".dice .img2").setAttribute("src", "images/dice"+randomNumber2+".png");
    if(randomNumber1 > randomNumber2)
        document.querySelector("h1").innerHTML = "🚩 Player 1 Wins!";
    else if (randomNumber1 == randomNumber2)
        document.querySelector("h1").innerHTML = "Draw!";
    else
        document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
})

