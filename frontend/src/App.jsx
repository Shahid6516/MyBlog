import React from 'react'
import Home from './Pages/Home'
import About from './Pages/About'
import { Route, Routes } from 'react-router-dom'
import Blog from './Pages/Blog'
import Contact from './Pages/Contact'
import Dashboard from './Pages/Dashboard'
import BlogDetails from './Pages/BlogDetails'
import Login from './Pages/Login'
import ProtectedRoute from './Component/ProtectedRoute'

const App = () => {
  return (
    <>


      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/admin' element={
          < ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>



    </>
  )
}

export default App

