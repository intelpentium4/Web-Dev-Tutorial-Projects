import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Using Express, mount middleware: bodyParser 
// and make a post handler to collect the form contents when user clicks the submit button
app.use(bodyParser.urlencoded( {extended: true} )); //urlencoded: is the html form, extended: determines behind the scenes, what is used to parse
app.post("/submit", (req, res) => {
  console.log(req.body);
  // Sends an okay status
  res.sendStatus(201);
});

// This displays the index.html at the landing endpoint
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});


// this runs the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
