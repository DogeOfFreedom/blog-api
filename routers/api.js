const router = require("express").Router();
const {
  createComment,
  getPostComments,
  deleteComment,
} = require("../controllers/comment");
const { verifyToken } = require("../controllers/jwt");
const {
  createPost,
  getPostById,
  getAllPosts,
  publishPost,
} = require("../controllers/post");
const { body } = require("express-validator");
const { checkForErrors } = require("../controllers/validation");

// Must verify token on all api routes
router.use(verifyToken);

router.get("/", (req, res) => {
  res.send("You are authorized");
});

// Create new Post
router.post(
  "/posts",
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title cannot be empty")
    .isLength({ max: 50 })
    .withMessage("Title cannot be logner than 25 characters"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Text cannot be empty")
    .isLength({ max: 5000 })
    .withMessage("Text cannot be logner than 5000 characters"),
  body("isPublished")
    .trim()
    .notEmpty()
    .withMessage("isPublished cannot be empty"),
  checkForErrors,
  createPost
);

// Get specific post
router.get("/posts/:postid", getPostById);

// Change "isPublished" status of post
router.post("/posts/:postid", publishPost);

// Get all posts
router.get("/posts", getAllPosts);

// Get all comments belonging to post
router.get("/posts/:postid/comments", getPostComments);

// Create new Comment
router.post(
  "/comments",
  body("originPost").trim().notEmpty().withMessage("Post Id cannot be empty"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("Content cannot be empty")
    .isLength({ max: 500 })
    .withMessage("Comment cannot be longer than 500 characters"),
  checkForErrors,
  createComment
);

// Delete Comment
router.delete("/comments/:commentId", deleteComment);

module.exports = router;
