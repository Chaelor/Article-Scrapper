//npm packages
const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Video.find({}).sort({ title: 1 })
      .then((dbVideo) => {
        res.json(dbVideo);
      })
      .catch((err) => {
        res.json(err);
      })
  }
}