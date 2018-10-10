
const axios = require("axios");
const cheerio = require("cheerio");

//scrape function
const scrape = (req, res) => {
  // Get the body using axios
  return axios.get("https://www.reuters.com/").then(function (response) {
    // Load cheerio, assign it the $ symbol
    var $ = cheerio.load(response.data);

    //Save gotten data to this array.
    let articles = [];

    // Grab every h3 within a div -- TODO: Better specify this
    $("article.story").each(function (i, element) {

      // Get the title, link, and other things within the div
      let title = $(this)
        .find("h3").text().trim();

      let link = "https://www.reuters.com/" + $(this)
        .find("a").attr("href");

      let sum = $(this)
        .find("p").text().trim();

      //If title, link, and whatever else I need to add exists, do this: 
      if (title && link) {

        //Declare an object save the title and link to the 
        let scrappedData = {
          title: title,
          link: link,
          sum: sum
        }

        //Push the scrapped data into the articles array
        articles.push(scrappedData);
      };
    });

    //After the above forEach is done, return the articles array.
    return articles;
  });
}

module.exports = scrape;