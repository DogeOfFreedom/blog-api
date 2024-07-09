const router = require("express").Router();
const { body } = require("express-validator");
const { auth, createToken } = require("../controllers/jwt");

router.post(
  "/login",
  body("username").trim().escape().notEmpty(),
  body("password").trim().escape().notEmpty(),
  auth,
  createToken
);

router.post("/logout", (req, res) => {
  res.send("placeholder logout");
});

router.post("/sign-up", (req, res) => {
  res.send("placeholder sign-up");
});

module.exports = router;
