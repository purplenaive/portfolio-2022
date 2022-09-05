const express = require("express");
const router = express.Router();

router.get("/kinder/*", (req, res, next) => {
  console.log("hi");
  res.sendFile(path.join(__dirname, "/public/project/kinderfest"));
});

module.exports = router;