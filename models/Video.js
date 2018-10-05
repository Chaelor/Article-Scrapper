//npm module
var mongoose = require("mongoose");

//create a schema constructor via mongoose
var Schema = mongoose.Schema;

//Make a UserSchema object using the constructor
var VideoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  //This is what associates a note to a particular user
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

//This creates our collection(model in sql) "User"
var Video = mongoose.model("Video", VideoSchema);

//Export collection
module.exports = Video;