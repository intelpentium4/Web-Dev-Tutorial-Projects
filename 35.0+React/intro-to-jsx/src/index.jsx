// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser

import React from "react";
import ReactDOM from "react-dom";
import List from "./components/List";


var cpr = new Date().getFullYear();

// inline style with if
const heading = {
    color: "blue"
};

ReactDOM.render(
    <div>
        <h1 style={heading}>Hello Woow</h1>
        <p>This is what must be done</p>
        <List />
        <footer>Copyright {cpr}</footer>
    </div>, 
document.getElementById("root"));

var h1 = document.createElement("h1");
h1.innerHTML = "Hello Wew🦁";
document.getElementById("root").appendChild(h1);