//npm module
var mongoose = require("mongoose");

//create a schema constructor via mongoose
var Schema = mongoose.Schema;

//Make a UserSchema object using the constructor
var ArticleSchema = new Schema({
  //Title of the video
  title: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  //Link to the video
  link: {
    type: String,
    required: true,
  },
  sum: {
    type: String,
  },
  //Save this if the user requests it
  saved: {
    type: Boolean,
    default: false,
  },
});

//This creates our collection(model in sql) "Article"
var Article = mongoose.model("Article", ArticleSchema);

//Export collection
module.exports = Article;