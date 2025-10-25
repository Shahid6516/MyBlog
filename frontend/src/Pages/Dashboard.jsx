import React from "react";
import Nav from "../Component/Nav";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Create from "../Component/Create";

const Dashboard = () => {
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
    return (
        <div className="w-full h-full">
            <Nav />
            <div className="mt-20 px-4 md:px-20">
                <h1 className="text-5xl font-bold text-shadow-orange-50">Dashboard</h1>
                <div className="border mt-10 rounded-2xl h-10 py-8 px-3 md:px-10 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">All Posts</h1>
                    <button className="px-5 md:px-8 py-2 text-xl ease-in-out bg-red-600 hover:bg-red-700 rounded-2xl">
                        Create Post
                    </button>
                </div>


                <div className="">
                    <Create />
                </div>



                <div className="All Blogs mt-10 ">
                    <div className="flex flex-wrap gap-6 justify-center">
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                className="w-80 relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <img src={post.image} className="w-full h-48 object-cover" />

                                <div className="edit-delete-icon left-50 mt-3  absolute flex gap-5">
                                    <FaRegEdit className="text-[25px] shadow shadow-amber-100 rounded-full p-1 hover:scale-120" />
                                    <MdOutlineDeleteOutline className="text-[25px] shadow shadow-amber-100 rounded-full p-1 hover:scale-120" />
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
        </div>
    );
};

export default Dashboard;
