//npm packages
const db = require("../models");

//from other files
const fetchArticle = require("../controllers/fetch");

module.exports = (app) => {

  app.get("/api/scrape", (req, res) => {
    res.send(fetchArticle.scrapeArticles());
  });

  app.get("/api/articles", (req, res) => {
    db.Article.find().sort({ title: 1 })
      .then((dbVideo) => {
        res.json(dbVideo);
      })
      .catch((err) => {
        res.json(err);
      })
  });

  app.get("/api/articles/:id", (req, res) => {
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
    db.Article.find({ _id: req.params.id }).remove()
      .then(data => res.json(data))
      .catch(err => err);
  });

  app.post("/api/notes", function(req, res) {
    console.log(req.body);
    db.Note.create(req.body).then(dbNote => res.json(dbNote));
  });

  app.get("/api/notes/:id", (req, res) => {
    db.Note.find({ articleID: req.params.id }).then(dbNote => res.json(dbNote));
  });

  app.get("/api/notes/", (req, res) => {
    db.Note.find().sort({ title: 1 })
      .then((dbVideo) => {
        res.json(dbVideo);
      })
      .catch((err) => {
        res.json(err);
      })
  });

  app.delete("/api/notes/:id", (req, res) => {
    db.Note.find({ _id: req.params.id }).remove()
      .then(data => res.json(data))
      .catch(err => err);
  });
}