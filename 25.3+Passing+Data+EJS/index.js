import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Passing Data from html to ejs
app.post("/submit", (req, res) => {
  const fName = req.body["fName"];
  const lName = req.body["lName"];
  const numLetters = fName.length+lName.length;
  const output = "<h1>You name is "+numLetters+ " letters long.</h1>";
  res.render("index.ejs", { numberOfLetters: numLetters, htmlOutput: output});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
