const expressAsyncHandler = require("express-async-handler");
const Comment = require("../models/comment");

const createComment = expressAsyncHandler(async (req, res) => {
  const { originPost, content } = req.body;
  const { _id } = req.user;
  const newComment = {
    author: _id,
    originPost,
    content,
  };
  await Comment.create(newComment);
  res.sendStatus(200);
});

const getPostComments = expressAsyncHandler(async (req, res) => {
  const { postid } = req.params;
  const comments = await Comment.find({ originPost: postid }).populate(
    "author",
    "profilePictureURL username"
  );
  res.json(comments);
});

const deleteComment = expressAsyncHandler(async (req, res) => {
  const { commentId } = req.params;
  await Comment.deleteOne({ _id: commentId });
  res.sendStatus(200);
});

module.exports = { createComment, getPostComments, deleteComment };
