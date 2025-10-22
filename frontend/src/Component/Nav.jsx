import React from 'react'
import { useNavigate } from 'react-router-dom'

const Nav = () => {
    const navigate = useNavigate()

    return (
        <div>
            <nav className='w-full h-15 bg-black text-white flex items-center justify-between px-10 py-2'>
                <h3 className='text-xl font-bold'>Logo</h3>
                <div className=' flex items-center gap-20 text-xl font-semibold'>
                    <h2 onClick={()=>navigate("/")}>Home</h2>
                    <h2 onClick={()=>navigate("/about")}>About</h2>
                    <h2 onClick={()=>navigate("/blog")}>Blog</h2>
                    <h2 onClick={()=>navigate("/contact")}>Contact</h2>
                </div>
            </nav>

        </div>
    )
}

export default Nav