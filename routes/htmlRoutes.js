//export all of this to server, it is html routing
module.exports = (app) => {

  app.get("/", (req, res) => {
    res.render("index", {
      css:["styles.css"],
      js:["dataHandle.js"]
    });
  });

  app.get("/saved", (req, res) => {
    res.render("saved",{
      css:["styles.css"],
      js:["saved.js"]
    });
  });

  app.get("*", (req, res) => {
    res.render("404", {
      css:[],
      js:[]
    });
  });
  
}
