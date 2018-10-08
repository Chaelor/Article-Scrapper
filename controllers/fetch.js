//npm packages
const db = require("../models");
const scrape = require("./scrapper");

//export these videos and urls
module.exports = {
  scrapeVideos: (req, res) => {
    return scrape()
      .then((video) => {
        return db.Video.create(video);
      })
      .then((dbVideo) => {
        //TODO: WHEN WORKING REMOVE THIS
        console.log(dbVideo);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}