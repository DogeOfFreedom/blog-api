const mongoose = require("mongoose");

const comment = new mongoose.Schema({
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
