// Create a prompt asking the user for the name then capitalize the first letter in it.
var name = prompt("Name here");
alert("Hello "+name.slice(0,1).toUpperCase()+name.slice(1,name.length));