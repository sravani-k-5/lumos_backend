// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const postRoutes = require("./routes/Postroutes");
// const commentRoutes = require("./routes/CommentRoute");

// dotenv.config();
// connectDB();

// // Seed sample post if not exists
// const seedSamplePost = async () => {
//   const Post = require("./models/Post");
//   const samplePostId = "66c9a4d4e0f5b23a91d8b123";
//   try {
//     const existingPost = await Post.findById(samplePostId);
//     if (!existingPost) {
//       await Post.create({
//         _id: samplePostId,
//         title: "Sample Post",
//         content: "This is a sample post for demonstration purposes."
//       });
//       console.log("Sample post created");
//     }
//   } catch (error) {
//     console.error("Error seeding sample post:", error.message);
//   }
// };

// seedSamplePost();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/posts", postRoutes);
// app.use("/api/comments", commentRoutes);

// app.get("/", (req, res) => {
//   res.send("Thread System Backend Running");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(`Server running on http://localhost:5000`)
// );




const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const postRoutes = require("./routes/Postroutes");
const commentRoutes = require("./routes/CommentRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("Thread System Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* =========================
   Connect DB AFTER server starts
========================= */
connectDB()
  .then(async () => {
    console.log("MongoDB connected");

    // Seed sample post
    const Post = require("./models/Post");
    const samplePostId = "66c9a4d4e0f5b23a91d8b123";

    const existingPost = await Post.findById(samplePostId);
    if (!existingPost) {
      await Post.create({
        _id: samplePostId,
        title: "Sample Post",
        content: "This is a sample post for demonstration purposes."
      });
      console.log("Sample post created");
    }
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
