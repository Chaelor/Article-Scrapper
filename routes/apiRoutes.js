//npm packages
const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");
var router = require("express").Router();

//from other files
const fetchVideos = require("../controllers/fetch");
const fetchDB = require("../controllers/videos");

module.exports = (app) => {

  app.get("/api/scrape", (req, res) => {
    res.send(fetchVideos.scrapeVideos());
});

  app.get("/api/db", (req, res) => {
    res.send(fetchDB.findAll());
  })
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