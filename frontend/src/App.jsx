import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import { Route, Routes } from 'react-router-dom'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import Dashboard from './Pages/Dashboard'
import BlogDetails from './Pages/BlogDetails'
import Login from './Pages/Login'

const App = () => {
  return (
    <>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin' element={<Dashboard />} />
        <Route path="/blog/:id" element={<BlogDetails/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>



    </>
  )
}

export default App

