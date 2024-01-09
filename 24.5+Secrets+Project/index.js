//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is IHateProgramming

import express from "express";
import bodyParser from "body-parser"; // A middleware that parses post requests

// Next 3 lines grabs the full path of the server machine
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded( {extended: true} ));

// This displays the index.html at the landing endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// /check in index.html
app.post("/check", (req, res) => {
    if(req.body.password == "IHateProgramming") // Using BodyParser, grabs request body and access password in index.html
        res.sendFile(__dirname + "/public/secret.html"); // redirects by sending the local html file
    else
        res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
