const Comment = require("../models/Comment");

// Add comment or reply
exports.addComment = async (req, res) => {
  try {
    const { postId, parentCommentId, text } = req.body;

    if (!postId || !text) {
      return res.status(400).json({ message: "PostId and text are required" });
    }

    const comment = await Comment.create({
      postId,
      parentCommentId: parentCommentId || null,
      text
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all comments of a post (flat structure)
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId
    }).sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
