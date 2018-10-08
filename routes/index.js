//NPM packages
var router = require("express").Router();

//Other files
const apiRoutes = require("./api");
const htmlRoutes = require("./html");

router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

module.exports = router;