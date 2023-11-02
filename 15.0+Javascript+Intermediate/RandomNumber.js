// Generate a whole number between 0-100
var n = Math.random();
n = Math.floor(n*100);

if(n>51)
    alert("Pleased "+n+"%");
else if(n=50)
    alert("Neutral "+n+"%");
else
    alert("Perturbed "+n+"%");