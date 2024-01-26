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

// Using the middlewear dodyPraser to retrieve info from the html.body
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    // Make the get route work and render the index.ejs file.
    res.render("index.ejs", { userName: name, userTitle: title, userMsg: msg, postDate: timeStamp});
});

app.get("/edit", (req, res) => {
    res.render("edit.ejs", { userName: name, userTitle: title, userMsg: msg, postDate: timeStamp});
});

// Gets the post request from /post.ejs and retrieves the data in the form
app.post("/post/submit", (req, res) => {
    name.push(req.body["name"]);
    title.push(req.body["title"]);
    msg.push(req.body["message"]);
    timeStamp.push(new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"long", day:"numeric"}));
    res.render("index.ejs", { userName: name, userTitle: title, userMsg: msg, postDate: timeStamp});
});

// when redirected from edit.ejs, grabs the index and pre-fills the form
app.get("/post", (req, res) => {
    const index = req.query.index;
    res.render("post.ejs", { userName: name[index], userTitle: title[index], userMsg: msg[index], postIndex: index });
});

// After editing the form in post.ejs, collects the index and updates the array with the new data
app.post("/edit/submit", (req, res) => {
    const index = req.query.index;
    console.log("In /edit/submit, The index is: "+index);
    name[index] = req.body["name"];
    title[index] = req.body["title"];
    msg[index] = req.body["message"];
    res.render("index.ejs", { userName: name, userTitle: title, userMsg: msg, postDate: timeStamp});
});

// Inside edit.ejs, takes the index in the delete button and deletes element using splice so the array doesn't have holes.
app.post("/delete-post", (req, res) => {
    const index = req.body.postIndex;
    console.log("In delete, The index is: "+index);
    if (index >= 0 && index < name.length) {
        // Remove the elements at the specified index
        name.splice(index, 1);
        title.splice(index, 1);
        msg.splice(index, 1);
        timeStamp.splice(index, 1);

        // Render the updated data
        res.render("index.ejs", { userName: name, userTitle: title, userMsg: msg, postDate: timeStamp });
    } else {
        // Handle the case where the index is out of bounds
        res.status(400).send('Invalid index');
    }
});

// Starts server on specified port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});