const { verifyToken } = require("../controllers/jwt");

const router = require("express").Router();

router.get("/", verifyToken, (req, res) => {
  res.send("You are authorized");
});

module.exports = router;
