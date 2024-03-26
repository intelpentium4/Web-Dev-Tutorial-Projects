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
    try {
        // 5. Use axios to fetch data from the API
        const response = await axios.get(API_URL + "pikachu");
        
        // Extracting relevant data from the response
        const name = response.data.name;
        const image = response.data.sprites.front_default;
        const sprite = response.data.sprites.versions['generation-v']['black-white'].animated.front_default;
        const cries = response.data.cries.latest;
        
        // Rendering the index.ejs template with the extracted data
        res.render("index.ejs", { name, image, sprite, cries });
    } catch (error) {
        // Handling errors
        console.error("Error fetching data from the API:", error);
        res.render("index.ejs", { name: "ERROR DETECTED" });
    }
});

app.post("/submit", async (req, res) => {
    // 5. Use axios to fetch data from the API
    try {
        const response = await axios.get(API_URL + req.body.name);

        // Extracting relevant data from the response
        const name = response.data.name;
        const image = response.data.sprites.front_default;
        const sprite = response.data.sprites.versions['generation-v']['black-white'].animated.front_default;
        const cries = response.data.cries.latest;

        // Rendering the index.ejs template with the extracted data
        res.render("index.ejs", { name, image, sprite, cries });
    } catch (error) {
        // Handling errors
        console.error("Error fetching data from the API:", error);
        res.render("index.ejs", { name: "ERROR DETECTED" });
    }
});

// 6. Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });