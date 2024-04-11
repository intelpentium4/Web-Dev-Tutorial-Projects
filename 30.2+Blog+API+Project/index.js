import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Decentralized Finance",
    content:
      "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
    author: "Alex Thompson",
    date: "2023-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "The Impact of Artificial Intelligence on Modern Businesses",
    content:
      "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
    author: "Mia Williams",
    date: "2023-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
    content:
      "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
    author: "Samuel Green",
    date: "2023-08-10T09:15:00Z",
  },
];

let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//

//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => { // http://localhost:4000/post
  if(!posts)
    res.sendStatus(404);
  else
    res.json(posts);
});

//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => { // http://localhost:4000/post/1
  const id = parseInt(req.params.id); // parseInt converts string -> integer
  const foundPost = posts.find((item) => item.id === id); // triple check also checks data type (string vs int)
                                                          // object.find returns the object that is found.
  if(foundPost)
    res.json(foundPost);
  else
    res.sendStatus(404);
});

//CHALLENGE 3: POST a new post
app.post("/posts", (req, res) => { // http://localhost:3000/posts
                                  // Body -> x-www-form-urlencoded
  const newPost = {
    id: posts.length+1,
    title: req.body.title, // req.body from server.js which reads from index.ejs
    content: req.body.content, 
    author: req.body.author,
    date: new Date().toJSON(),
  };
  posts.push(newPost);
  console.log(posts.slice(-1)); // Access the last element in the array
  res.status(201).json(posts.slice(-1));
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => { // http://localhost:3000/posts/2
                                        // Body -> x-www-form-urlencoded
  const id = parseInt(req.params.id);
  const existingPost = posts.find((item) => item.id === id); // Find the existing post's ID and set it to existingPost.
  if(!existingPost) return res.status(404).json({ message: "Post not found" }); // If existingPost is not found, return with a 404 error
  const replacementPost = {
    id: id,
    title: req.body.title || existingPost.title, // If req.body.text or existingPost, exist set to title
    content: req.body.content || existingPost.content, // An if, else statement will also work
    author: req.body.author || existingPost.author,
    date: (req.body.title || req.body.content || req.body.author) ? new Date().toJSON() : existingPost.date,
  };
  const searchIndex = posts.findIndex((item) => item.id === id);
  posts[searchIndex] = replacementPost;
  res.json(posts[searchIndex]);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => { // http://localhost:3000/posts/1
  const id = parseInt(req.params.id);
  const searchIndex = posts.findIndex((item) => item.id === id); // Search all the posts and returns the index if found and -1 if not.
  if(searchIndex > -1){
    posts.splice(searchIndex, 1); // Removes the one post with the searchIndex
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: `Post with ID: ${id} was not found. No Posts were deleted.`});
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
