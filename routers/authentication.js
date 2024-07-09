const router = require("express").Router();
const { body } = require("express-validator");
const { auth, createToken } = require("../controllers/jwt");
const { checkForErrors } = require("../controllers/validation");
const { createUser } = require("../controllers/user");

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

router.post(
  "/sign-up",
  body("firstname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("First Name cannot be empty")
    .isLength({ max: 30 })
    .withMessage("First Name cannot be longer than 20 characters"),
  body("lastname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Last Name cannot be empty")
    .isLength({ max: 30 })
    .withMessage("Last Name cannot be longer than 20 characters"),
  body("email"),
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isLength({ max: 20 })
    .withMessage("Username cannot be longer than 20 characters"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 5 })
    .withMessage("Password must be atleast 5 characters long"),
  body("confirm_password")
    .trim()
    .escape()
    .notEmpty()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
  body("profilePictureURL")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Profile Picture URL cannot be empty")
    .matches(
      /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/
    )
    .withMessage("Profile Picture URL must be a properly formatted URL"),
  checkForErrors,
  createUser
);

module.exports = router;
