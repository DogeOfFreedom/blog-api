const expressAsyncHandler = require("express-async-handler");
const Post = require("../models/post");

const createPost = expressAsyncHandler(async (req, res) => {
  const { userId, title, text, isPublished } = req.body;
  const newPost = {
    author: userId,
    title,
    text,
    isPublished,
  };
  await Post.create(newPost);
  res.sendStatus(200);
});

const getPostById = expressAsyncHandler(async (req, res) => {
  const { postid } = req.params;
  const post = await Post.findById(postid).populate("author", "username");
  res.json(post);
});

const getAllPosts = expressAsyncHandler(async (req, res) => {
  const { isPublished } = req.query;
  let posts;
  if (isPublished === "true") {
    posts = await Post.find({ isPublished: true }).populate(
      "author",
      "username"
    );
  } else {
    posts = await Post.find({}).populate("author", "username");
  }
  res.json(posts);
});

module.exports = { createPost, getPostById, getAllPosts };
