import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var name = [];
var title = [];
var msg = [];
var timeStamp = [];

// Make the styling show up.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // Make the get route work and render the index.ejs file.
  res.render("index.ejs");
});
app.get("/post", (req, res) => {
    res.render("post.ejs");
});
app.get("/edit", (req, res) => {
    res.render("edit.ejs");
});

// Gets the post request from /post/submit and retrieves the data in the form
app.post("/post/submit", (req, res) => {
    name.push(req.body["name"]);
    title.push(req.body["title"]);
    msg.push(req.body["message"]);
    timeStamp.push(new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}));
    res.render("index.ejs", { userName: name, userTitle: title, userMsg: msg, postDate: timeStamp});
});
  

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});