// Calcuate the equivalent human age of a dog given the dog age. 
dogAge: Number;
humanAge: Number;
dogAge = prompt("Enter the dog's age in years.");
humanAge = (dogAge-2)*4+21;
alert("Your dog is "+humanAge+" years old if it were a human.")