const mongoose = require("mongoose");

//create a schema constructor via mongoose
var Schema = mongoose.Schema;

//Make a NoteSchema (mongodb collection) using the constructor
var NoteSchema = new Schema({
  //Title and Body for the note, both are strings
  title: String,
  body: String
});

//Creates our model using the schema
var Note = mongoose.model("Note", NoteSchema);

//export note model
module.exports = Note;