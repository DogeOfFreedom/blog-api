const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Empty GET Request");
});

module.exports = router;
