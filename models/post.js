const mongoose = require("mongoose");

const post = new mongoose.Schema({
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: () => Date.now(),
  },
  isPublished: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Post", post);
