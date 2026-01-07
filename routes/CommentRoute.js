// routes/commentRoutes.js
const express = require("express");
const mongoose = require("mongoose");
const Comment = require("../models/Comment");
const router = express.Router();

// Add comment or reply
router.post("/", async (req, res) => {
  try {
    const comment = await Comment.create(req.body);
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all comments of a post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
