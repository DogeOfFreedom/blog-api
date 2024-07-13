const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createUser = expressAsyncHandler(async (req, res, next) => {
  const { firstname, lastname, email, username, password } = req.body;

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.sendStatus(500);
    }

    const newUser = {
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    };
    await User.create(newUser);
    return next();
  });
});

const uploadProfileImage = expressAsyncHandler(async (req, res) => {
  const { imgUrl } = req.body;
  const { _id } = req.user;
  const user = await User.findById(_id);
  user.profilePictureURL = imgUrl;
  await user.save();
  return res.sendStatus(200);
});

module.exports = { createUser, uploadProfileImage };
