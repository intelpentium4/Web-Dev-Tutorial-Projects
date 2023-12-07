
// Write to a file
const fs = require("fs");
fs.writeFile("message.txt", "Hello from NodeJS! \nHello from Angela!", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
});

// Read from a file
fs.readFile("./message.txt", "utf8", (err, data) => {
    if(err) throw err;
    console.log(data);
});

// Asynchronous Reading from a file
const { open } = require('node:fs/promises');
(async () => {
  const file = await open('message.txt');
  for await (const line of file.readLines()) {
    console.log(line);
  }
})();