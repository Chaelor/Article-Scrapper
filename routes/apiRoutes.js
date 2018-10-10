//npm packages
const db = require("../models");

//from other files
const fetchArticle = require("../controllers/fetch");
const fetchDB = require("../controllers/article");

module.exports = (app) => {

  app.get("/api/scrape", (req, res) => {
    res.send(fetchArticle.scrapeArticles());
  });

  app.get("/api/articles", (req, res) => {
    db.Article.find({ saved: false }).sort({ title: 1 })
      .then((dbVideo) => {
        res.json(dbVideo);
      })
      .catch((err) => {
        res.json(err);
      })
  });

  app.get("/api/articles/:id", (req, res) => {
    // console.log("HERE DUMMY: " + req.body);
    db.Article.findOne({ _id: req.params.id })
      .then(data => res.json(data))
      .catch(err => err);
  });

  app.put("/api/articles/:id", (req, res) => {
    db.Article.update({ _id: req.params.id }, { $set: { saved: true } }, { new: true })
      .then(data => res.json(data))
      .catch(err => err);
  });

  app.delete("/api/articles/:id", (req, res) => {
    // console.log("HERE DUMMY: " + req.body);
    db.Article.find({ _id: req.params.id }).remove()
      .then(data => res.json(data))
      .catch(err => err);
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