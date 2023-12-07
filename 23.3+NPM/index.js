// This is ECMAScript + importing from node_modules
import generateName from "sillyName";
import superHeroName from "superheroes";

let sillyName = generateName();
console.log(`Silly name is ${sillyName}.`);

let superHero = superHeroName.random();
console.log(`The hero's name is ${superHero}.`);