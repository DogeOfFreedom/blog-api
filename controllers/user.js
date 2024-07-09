const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createUser = expressAsyncHandler(async (req, res) => {
  const { firstname, lastname, email, username, password, profilePictureURL } =
    req.body;

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      res.sendStatus(500);
    }

    const newUser = {
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
      profilePictureURL,
    };
    await User.create(newUser);
    res.redirect("/");
  });
});

module.exports = { createUser };
