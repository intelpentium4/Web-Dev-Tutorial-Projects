// Imports the files downloaded by npm
import express from "express";
const app = express();
const port = 3000;

// Starts the server at specified port number
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});


// Setup an endpoint at "/" (homepage), logs the request target and sends text as a response
app.get("/", (req, res) => {
    console.log(req.rawHeaders);
    res.send("<h1>Hello, visitor.</h1><p>This message was send from the back-end via express.js.</p>");
});

app.get("/contact", (req, res) => {
    res.send("<h1 style='font-size:50px;'>You can find me at yo mums house.</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1 style='color:blue;'>I am <strong>unemployed</strong> for 5 years and pissed af.</h1>");
});