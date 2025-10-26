import React, { useState, useEffect } from "react";
import Nav from "../Component/Nav";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import CreateBlog from "../Component/CreateBlog";
import { Link } from "react-router-dom";


const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleShowEditor = () => {
    setIsVisible((prev) => !prev);
  };

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs/allblogs");
      setPosts(res.data.blogs);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Helper to truncate HTML content safely
  const truncateHTML = (html, maxLength = 150) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    let text = tempDiv.textContent || tempDiv.innerText || "";
    if (text.length > maxLength) text = text.substring(0, maxLength) + "...";
    return text;
  };


  return (
    <div className="w-full h-full">
      <Nav />
      <div className="mt-20 px-4 md:px-20">
        <h1 className="text-5xl font-bold text-shadow-orange-50">Dashboard</h1>

        <div className="border mt-10 rounded-xl h-10 py-8 px-3 md:px-10 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">All Posts</h1>
          <button
            className="px-5 md:px-8 py-2 text-xl ease-in-out bg-red-600 hover:bg-red-700 rounded-2xl"
            onClick={handleShowEditor}
          >
            {isVisible ? "Close Editor" : "Create Post"}
          </button>
        </div>

        {isVisible && <CreateBlog onBlogCreated={fetchPosts} />}

        <div className="All Blogs mt-10">
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

                  <div className="edit-delete-icon left-50 mt-3 absolute flex gap-5 p-2">
                    <FaRegEdit className="text-[25px] shadow shadow-amber-100 rounded-full p-1 hover:scale-120 cursor-pointer" />
                    <MdOutlineDeleteOutline className="text-[25px] shadow shadow-amber-100 rounded-full p-1 hover:scale-120 cursor-pointer" />
                  </div>

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
                    <p className="text-gray-300">{truncateHTML(post.content, 120)}</p>
                    {/* <div
                      className="text-gray-300 overflow-hidden h-28"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    ></div> */}
                  </div>
                </div>
              </Link>
            ))}



          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
