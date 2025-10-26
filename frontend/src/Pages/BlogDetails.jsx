import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Nav from "../Component/Nav";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
      setBlog(res.data.blog);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (!blog) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="w-full h-full">
      <Nav />
      <div className="mt-20 px-4 md:px-20">
        <Link
          to="/admin"
          className="text-blue-500 hover:underline mb-4 inline-block"
        >
        </Link>

        <h1 className="text-5xl font-bold text-shadow-orange-50 mb-6">
          {blog.title}
        </h1>

        {blog.image && (
          <img
            src={
              blog.image.startsWith("http")
                ? blog.image
                : `http://localhost:5000/${blog.image}`
            }
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
        )}

        {/* Full blog content with formatting */}
        <div
          className="text-gray-300 text-lg"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        ></div>

        <p className="text-sm text-zinc-400 mt-6">
          Created at{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default BlogDetails;
