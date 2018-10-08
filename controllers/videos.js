//npm packages
const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Video.find(req.query).sort({ title: 1 })
    .then((dbVideo) => {
      res.json(dbVideo);
    })
  }
}