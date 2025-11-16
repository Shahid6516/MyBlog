import Blog from "../models/blog.model.js";
import cloudinary from '../config/cloudinary.js'
import fs from "fs"

// Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body; // include image from frontend
    let imageUrl = image || null;

    // Only upload if a file is sent (Postman case)
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_thumbnails",
      });

      imageUrl = uploadResponse.secure_url;

      // Delete local file
      if (req.file.path && !req.file.path.startsWith("http")) {
        fs.unlinkSync(req.file.path);
      }
    }

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title or content required",
      });
    }

    const newBlog = new Blog({
      title,
      content,
      image: imageUrl, // store Cloudinary URL (frontend or backend upload)
    });

    const savedBlog = await newBlog.save();
    return res.status(201).json({
      success: true,
      message: "Blog created Successfully",
      savedBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// get All Blog
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({
      success: true,
      message: "Here is all of your blog",
      blogs,
    });
  } catch (error) {
    console.log(error);
  }
};

// get single blog only
export const getSingleBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog find successfully !",
      blog,
    });
  } catch (error) {
    console.log(error);
  }
};

// update blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content, image } = req.body; // include image
    const updatedData = { title, content, image };

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog, // return updated blog
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error updating blog",
    });
  }
};


// delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBlog = await Blog.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      deleteBlog,
    });
  } catch (error) {
    console.log(error);
  }
};

