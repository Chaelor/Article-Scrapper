//npm packages
var express = require('express'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    exhbs = require('express-handlebars');
    
//Constants
const app = express(),
      PORT = 8080,
      db = require('./models');

//express set-up
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//express handlebars
app.engine("handlebars", exhbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//connect to DB
mongoose.connect("mongodb://localhost/ytScrapper", {useNewUrlParser: true});

app.listen(PORT, () => {
  console.log(`App running on port: ${PORT}`);
});