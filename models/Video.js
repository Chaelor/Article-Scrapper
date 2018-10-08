//npm module
var mongoose = require("mongoose");

//create a schema constructor via mongoose
var Schema = mongoose.Schema;

//Make a UserSchema object using the constructor
var VideoSchema = new Schema({
  //Title of the video
  title: {
    type: String,
    required: true
  },
  //Link to the video
  link: {
    type: String,
    required: true
  },
  // img: {
    // type: String,
    // required: true
  // },
  //Date that this was gotten
  date: {
    type: Date,
    default: Date.now
  },
  //Save this if the user requests it
  saved: {
    type: Boolean,
    default: false,
  }
});

//This creates our collection(model in sql) "User"
var Video = mongoose.model("Video", VideoSchema);

//Export collection
module.exports = Video;