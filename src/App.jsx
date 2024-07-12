import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './features/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Routes, Route } from "react-router-dom"
import { AddPost, AllPosts, EditPost, Home, Login, Post, Signup } from './pages';
import { AuthLayout } from './components';
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between text-center bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <Routes>
          < Route index path='/' element={<Home />} />
          < Route path='/login' element={<AuthLayout authentication={false}><Login /></AuthLayout>} />
          < Route path='/signup' element={<AuthLayout authentication={false}><Signup /></AuthLayout>} />
          < Route path='/all-posts' element={<AuthLayout authentication><AllPosts /></AuthLayout>} />
          < Route path='/add-post' element={<AuthLayout authentication><AddPost /></AuthLayout>} />
          < Route path='/edit-post/:slug' element={<AuthLayout authentication><EditPost /></AuthLayout>} />
          < Route path='/post/:slug' element={<Post />} />
        </Routes>
        <Footer />
      </div>
    </div>
  ) : "loading..."
}

export default App;