import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../Component/Nav";
import axios from "axios";

const Blog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs/allblogs");
        setPosts(res.data.blogs);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);



  return (
    <div className="bg-black min-h-screen">
      <Nav />

      <div className="mt-20 w-full px-4 md:px-20 font-sans">
        <h1 className="text-5xl font-bold text-white mb-10">Blogs</h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {posts.map((post) => (
            <div
              key={post._id}
              className="w-80 bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img

                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <p className="text-sm text-zinc-300">
                Created at {" "}
                  { new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-xl font-semibold text-white mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-300">{post.content}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Blog;
