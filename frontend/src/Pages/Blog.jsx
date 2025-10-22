import React from 'react'
import { useNavigate } from "react-router-dom"
import Nav from '../Component/Nav'

const Blog = () => {

  const navigate = useNavigate()
  return (

    <div className=''>
      <Nav />
      <div className="bg-black text-white w-full h-screen px-10">

        <h1 className='text-5xl font-bold pt-10'>Blogs</h1>

        <div className=' mt-10 flex flex-wrap justify-between px-20 gap-5 '>

          <div className="bg-yellow-400 w-75 h-52 rounded-lg"></div>
          <div className="bg-yellow-400 w-75 h-52 rounded-lg"></div>
          <div className="bg-yellow-400 w-75 h-52 rounded-lg"></div>
          <div className="bg-yellow-400 w-75 h-52 rounded-lg"></div>
          <div className="bg-yellow-400 w-75 h-52 rounded-lg"></div>
          <div className="bg-yellow-400 w-75 h-52 rounded-lg"></div>
          
        </div>



      </div>
    </div>
  )
}

export default Blog