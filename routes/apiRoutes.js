//npm packages
const db = require("../models");

//from other files
const fetchVideos = require("../controllers/fetch");
const fetchDB = require("../controllers/videos");

module.exports = (app) => {

  app.get("/api/scrape", (req, res) => {
    res.send(fetchVideos.scrapeVideos());
  });

  app.get("/api/videos", (req, res) => {
    db.Video.find({ saved : false }).sort({ title: 1 })
      .then((dbVideo) => {
        res.json(dbVideo);
      })
      .catch((err) => {
        res.json(err);
      })
  });
  // app.get("/api/data", (req,res) => {
  //   db.Video.find({})
  //   .then((dbVideo) => {
  //     res.json(dbVideo);
  //   })
  //   .catch((err) => {
  //     res.json(err);
  //   })
  // });
}