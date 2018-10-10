//npm packages
const db = require("../models");
const scrape = require("./scrapper");

//export these videos and urls
module.exports = {
  scrapeArticles: (req, res) => {
    return scrape()
      .then((article) => {
        return db.Article.create(article);
      })
      .then((dbArticle) => {
        //TODO: WHEN WORKING REMOVE THIS
        console.log(dbArticle);
      })
      .catch((err) => {
        console.log(err);
      })
  }
}