import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../public/logo.png"
import { IoMenu, IoClose } from "react-icons/io5";

const Nav = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const toggleNavbar = () => setIsOpen(!isOpen)

    return (
        <nav className="w-full fixed top-0 left-0 z-50">
            <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
                <img className="w-20 h-12 object-contain" src={logo} alt="logo" />

                <div className="hidden md:flex items-center gap-10 text-lg font-semibold">
                    <h2 onClick={() => navigate("/")} className="cursor-pointer hover:text-gray-300 transition">Home</h2>
                    <h2 onClick={() => navigate("/about")} className="cursor-pointer hover:text-gray-300 transition">About</h2>
                    <h2 onClick={() => navigate("/blog")} className="cursor-pointer hover:text-gray-300 transition">Blog</h2>
                    <h2 onClick={() => navigate("/contact")} className="cursor-pointer hover:text-gray-300 transition">Contact</h2>
                </div>

                <button
                    className="md:hidden text-3xl focus:outline-none"
                    onClick={toggleNavbar}
                >
                    {isOpen ? <IoClose /> : <IoMenu />}
                </button>
            </div>

            <div
                className={`md:hidden bg-black flex flex-col items-center gap-6 text-lg font-semibold transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    }`}
            >
                <h2 onClick={() => { navigate("/"); setIsOpen(false); }} className="cursor-pointer hover:text-gray-300">Home</h2>
                <h2 onClick={() => { navigate("/about"); setIsOpen(false); }} className="cursor-pointer hover:text-gray-300">About</h2>
                <h2 onClick={() => { navigate("/blog"); setIsOpen(false); }} className="cursor-pointer hover:text-gray-300">Blog</h2>
                <h2 onClick={() => { navigate("/contact"); setIsOpen(false); }} className="cursor-pointer hover:text-gray-300">Contact</h2>
            </div>
        </nav>
    )
}

export default Nav
