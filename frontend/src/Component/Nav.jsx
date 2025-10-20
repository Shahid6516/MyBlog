import React from 'react'

const Nav = () => {
    return (
        <div>
            <nav className='w-full h-15 flex items-center justify-between px-10 py-2'>
                <h3 className='text-xl font-bold'>Logo</h3>
                <div className=' flex items-center gap-20 text-xl font-semibold'>
                    <h2>Home</h2>
                    <h2>About</h2>
                    <h2>Blog</h2>
                    <h2>Contact</h2>
                </div>
            </nav>

        </div>
    )
}

export default Nav