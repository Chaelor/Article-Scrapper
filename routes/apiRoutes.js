//npm packages
const cheerio = require("cheerio");
const axios = require("axios");

//from other files
const db = require("../models");

module.exports = (app) => {

  app.get("/api/scrape", function (req, res) {
    // Get the body using axios
    axios.get("https://www.youtube.com/").then(function (response) {
      // Load cheerio, assign it the $ symbol
      var $ = cheerio.load(response.data);

      // Grab every h3 within a div -- TODO: Better specify this
      $("div h3").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = "https://www.youtube.com" + $(this)
          .children("a")
          .attr("href");
        // result.img = $(this)
        //   .children("img")
        //   .attr("src");

        //Create a new video entry in the result object
        db.Video.create(result)
          .then(function (dbVideo) {
            // View the added result in the console
            console.log(dbVideo);
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });

      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
  });
}