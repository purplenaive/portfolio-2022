var express = require('express');
var router = express.Router();

/* GET home page. */
router.get("/kinder/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/public/project/kinderfest"));
});

module.exports = router;
