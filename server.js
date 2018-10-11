/* eslint-disable */
//npm packages
var express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    exhbs = require('express-handlebars');
    // bodyParser = require('body-parser');
    
//Constants
const app = express(),
      PORT = 8080,
      db = require('./models');
      // routes = require("./routes");

//express set-up
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

//express handlebars
app.engine("handlebars", exhbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//connect to DB
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/rtArticles";

mongoose.connect(MONGODB_URI, {useNewUrlParser: true});

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});