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
  const post = await Post.findById(postid);
  res.json(post);
});

const getAllPosts = expressAsyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

module.exports = { createPost, getPostById, getAllPosts };
