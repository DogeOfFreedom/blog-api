const router = require("express").Router();
const { body } = require("express-validator");
const {
  auth,
  createToken,
  invalidateToken,
  verifyToken,
} = require("../controllers/jwt");
const { checkForErrors } = require("../controllers/validation");
const { createUser, uploadProfileImage } = require("../controllers/user");

router.post(
  "/login",
  body("username").trim().escape().notEmpty(),
  body("password").trim().escape().notEmpty(),
  auth,
  createToken
);

router.get("/logout", invalidateToken);

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
  // body("email"),
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
  body("confirmPassword")
    .trim()
    .escape()
    .notEmpty()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords must match"),
  body("hasProfileImg")
    .custom((value) => value === true)
    .withMessage("User must upload a profile picture"),
  checkForErrors,
  createUser,
  auth,
  createToken
);

router.post("/upload", verifyToken, uploadProfileImage);

module.exports = router;
