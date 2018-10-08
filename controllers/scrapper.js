
const axios = require("axios");
const cheerio = require("cheerio");

//scrape function
const scrape = (req, res) => {
  // Get the body using axios
  return axios.get("https://www.youtube.com/").then(function (response) {
    // Load cheerio, assign it the $ symbol
    var $ = cheerio.load(response.data);

    //Save gotten data to this array.
    let videos = [];

    // Grab every h3 within a div -- TODO: Better specify this
    $("div h3").each(function (i, element) {

      // Get the title, link, and other things within the div
      let title = $(this)
        .children("a")
        .text();

      let link = "https://www.youtube.com" + $(this)
        .children("a")
        .attr("href");

      // let img = $(this)
      //   .children("img")
      //   .attr("src");

      //If title, link, and whatever else I need to add exists, do this: 
      if (title && link) {

        //Declare an object save the title and link to the 
        let scrappedData = {
          title: title,
          link: link
        }

        //Push the scrapped data into the videos array
        videos.push(scrappedData);
      };
    });

    //After the above forEach is done, return the videos array.
    return videos;
  });
}

module.exports = scrape;