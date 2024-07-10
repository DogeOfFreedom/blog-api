const expressAsyncHandler = require("express-async-handler");
const Comment = require("../models/comment");

const createComment = expressAsyncHandler(async (req, res) => {
  const { postid, userid, content } = req.body;
  const newComment = {
    author: userid,
    originPost: postid,
    content,
  };
  await Comment.create(newComment);
  res.sendStatus(200);
});

const getPostComments = expressAsyncHandler(async (req, res) => {
  const { postid } = req.params;
  const comments = await Comment.find({ originPost: postid });
  res.json(comments);
});

module.exports = { createComment, getPostComments };
