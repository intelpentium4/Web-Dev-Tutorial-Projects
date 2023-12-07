/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inq from "inquirer";
import qr from "qr-image";
import fs from "fs";

// Accepts input from user
inq
  .prompt([
    {
        message: "Input url to be turned into QR-code: ",
        name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Generate QR-code png file
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr_img.png'));

    // Write the url to a txt file
    fs.writeFile("URL.txt", url, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });



