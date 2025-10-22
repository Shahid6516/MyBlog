import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getSingleBlog, updateBlog } from "../controllers/blog.controller.js";
const router = express.Router();
router.post("/create", createBlog);
router.get("/allblogs", getAllBlogs);
router.get("/:id", getSingleBlog);
router.patch("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
