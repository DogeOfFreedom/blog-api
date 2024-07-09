const { verifyToken } = require("../controllers/jwt");

const router = require("express").Router();

router.get("/", verifyToken, (req, res) => {
  res.send("Empty GET Request");
});

module.exports = router;
