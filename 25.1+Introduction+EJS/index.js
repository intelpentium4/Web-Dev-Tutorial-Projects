
import express from "express";
const app = express();
const port = 3000;
const today = new Date().getDay();

// Starts the server at specified port number
app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});

var day;
var quote;
if(today === 0 || today === 6){
    day = "weekend";
    quote = "have fun";
} else {
    day = "weekday";
    quote = "work hard";
}

app.get("/", (req, res) => {
    res.render("index.ejs", {
        day: day, quote: quote
    });
});