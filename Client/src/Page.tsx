import React from 'react'
import { Routes , Route } from 'react-router-dom';
import Home from './Pages/Home'
import Navbar from './Components/Navbar';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import BackgroundBricks from './Components/BGtexture'
import Rolechdt from './Pages/Rolechdt';
import Dashboard from './Pages/Dashboard';
import Footer from './Components/Footer';

export default function Page(): React.ReactNode {
  return (
    <>
        <Navbar />
        <BackgroundBricks />
        <div className='min-h-[70vh]'>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/rolechdt" element={<Rolechdt />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        </div>
        <Footer />
    </>
  )
}
