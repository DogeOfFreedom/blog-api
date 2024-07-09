const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  originPost: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", comment);
