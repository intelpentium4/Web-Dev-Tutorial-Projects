// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

// 3. Use the public folder for static files.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// 4. When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    // 5. Use axios 
    try {
        const result = await axios.get(API_URL + "/random");
        res.render("index.ejs", { secret: result.data.secret, user: result.data.username });
      } catch (error) {
        res.render("index.ejs", { secret: error.response.data, user: "ERROR DETECTED" });
      }
});

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });