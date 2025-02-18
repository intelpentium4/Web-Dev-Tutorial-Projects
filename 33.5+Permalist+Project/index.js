import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "DownWithCoding",
  post: 5432
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Become a CEO" },
  { id: 2, title: "Fire everyone who's surname is longer than 3 characters" },
];

app.get("/", async (req, res) => {
  try{
    const result = await db.query("SELECT * FROM items ORDER BY id");
    items = result.rows;
  } catch (err) {
    console.log(err);
  }
  res.render("index.ejs", {
    listTitle: "To do list",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try{
    await db.query(
      "INSERT INTO items (title) VALUES ($1)",
      [item]
    );
  } catch (err){ 
    console.log(err);
    items.push({ title: item }); 
  }
  res.redirect("/");
});

async function editItems(item, id) {
  try {
    await db.query(
      "UPDATE items SET title = ($1) WHERE id = $2",
      [item, id]
    );
  } catch (err) {
    console.log(err);
  }
}
app.post("/edit", async (req, res) => {
  const item = req.body.updatedItemTitle;
  const id = req.body.updatedItemId;
  editItems(item, id);
  res.redirect("/");
});

async function deleteItem(trash){
  try{
    const result = await db.query(
      "DELETE from items where id = $1 returning *",
      [trash]
    )
    console.log("Deleted: " + result);
  } catch (err) {
    console.log(err);
  }
}
app.post("/delete", (req, res) => {
  const id = req.body.deleteItemId;
  deleteItem(id);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
