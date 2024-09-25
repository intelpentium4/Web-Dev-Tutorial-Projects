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

async function checkVisisted(){
  const globe = await db.query("SELECT country_code FROM visited_countries;");
  let countries = [];
  globe.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  console.log(globe.rows);
  return countries;
}

// Get homepage
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", { countries: countries, total: countries.length });
});

// Insert country
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';", // ignores capitalization and can check parts of the word
      [input.toLowerCase()]
    );

    const countryCode = result.rows[0].country_code; // Selects first result that returns from the db
    try {
      await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)", [countryCode]);
      res.redirect("/");
    } catch (err) {
      console.log(err);
      const countries = await checkVisisted();
      errorMessage("Country has already been added, try again.", res);
    }
  } catch (err) {
    console.log(err);
    const countries = await checkVisisted();
    errorMessage("Country name does not exist, try again.", res);
  }
});

async function errorMessage(message, res){
  const reCheck = await checkVisisted();
    res.render("index.ejs", {
      countries: reCheck,
      total: reCheck.length,
      error: message,
    });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
