import Blog from "../models/blog.model.js";

// Create blog
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    // const thumbnail = req.file ? req.file.filename : null;
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title or content required",
      });
    }

    const newBlog = new Blog({
      title,
      content,
      // image: thumbnail,
    });

    const savedBlog = await newBlog.save();
    return res.status(201).json({
      success: true,
      message: "Blog created Successfully",
      savedBlog,
    });
  } catch (error) {
    console.log(error);
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
    const { title, content } = req.body;
    const updatedData = { title, content };

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(400).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.log(error);
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
