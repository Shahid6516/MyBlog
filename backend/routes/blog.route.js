import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import { upload } from "../middleware/multer.js";
import { protect, adminOnly, verifyAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post(
  "/create",
  (req, res, next) => {
    console.log("✅ /api/blogs/create route hit");
    next();
  },
  upload.single("thumbnail"),
  createBlog
);

// router.post("/create", createBlog);
router.post(
  "/create",
  protect,
  adminOnly,
  verifyAdmin,
  upload.single("thumbnail"),
  createBlog
);
router.get("/allblogs", getAllBlogs);
router.get("/:id", getSingleBlog);
router.patch("/:id", protect, adminOnly, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

export default router;
