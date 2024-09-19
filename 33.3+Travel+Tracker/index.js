import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "DownWithCoding",
  post: 5432
});
db.connect();

app.get("/", async (req, res) => {
  //Write your code here.
  const globe = await db.query("SELECT flag FROM flags WHERE name NOT LIKE 'I%' AND name LIKE '%a';");
  let countries = [];
  globe.rows.forEach((flags) => {
    countries.push(flags.flag);
  });
  console.log(globe.rows);
  res.render("index.ejs", { countries: countries, total: countries.length });
  db.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
