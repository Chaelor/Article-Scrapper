//export all of this to server, it is html routing
module.exports = (app) => {

  app.get("/", (req, res) => {
    res.render("index", {
      css:["reset.css"],
      js:["text.js"]
    });
  });

  app.get("*", (req, res) => {
    res.render("404", {
      css:[],
      js:[]
    });
  });
  
}
