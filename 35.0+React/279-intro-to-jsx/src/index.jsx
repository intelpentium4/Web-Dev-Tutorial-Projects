// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

import React from "react";
import ReactDOM from "react-dom";

var maxLength = Math.floor(2+(Math.random() * 2)); // Random between 2-3
var cpr = new Date().getFullYear();

ReactDOM.render(
    <div>
        <h1>Hello Woow</h1>
        <p>This is what must be done</p>
        <ol>
            <li>Hostile takeover of Cognizant and TheHartford</li>
            <li>Fire everyone with last names longer than {maxLength} characters</li>
            <li>Profit???</li>
        </ol>
        <footer>Copyright {cpr}</footer>
    </div>, 
document.getElementById("root"));

var h1 = document.createElement("h1");
h1.innerHTML = "Hello Wew🦁";
document.getElementById("root").appendChild(h1);