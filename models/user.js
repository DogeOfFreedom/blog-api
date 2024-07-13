const mongoose = require("mongoose");

const validateEmail = (email) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

const user = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: validateEmail,
      message: "Invalid Email Format",
    },
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePictureURL: {
    type: String,
  },
  isAuthor: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", user);
