import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Component/Nav";
import axios from "axios";
import { Link } from "react-router-dom";


const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs/allblogs");
        setPosts(res.data.blogs);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);
const truncateHTML = (html, maxLength = 150) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    let text = tempDiv.textContent || tempDiv.innerText || "";
    if (text.length > maxLength) text = text.substring(0, maxLength) + "...";
    return text;
  };


  return (
    <div className="bg-black min-h-screen">
      <Nav />

      <div className="mt-20 w-full px-4 md:px-20 font-sans">
        <h1 className="text-5xl font-bold text-white mb-10">Blogs</h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {posts.map((post) => (
            <Link key={post._id} to={`/blog/${post._id}`} className="no-underline">
              <div
                className="w-80 relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={
                    post.image
                      ? post.image.startsWith("http")
                        ? post.image
                        : `http://localhost:5000/${post.image}`
                      : "/default-blog.png"
                  }
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />

               

                <div className="p-4">
                  <p className="text-sm text-zinc-300">
                    Created at{" "}
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <h2 className="text-xl font-semibold text-white mb-2">{post.title}</h2>
                  <p className="text-gray-300">{truncateHTML(post.content, 100)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;
