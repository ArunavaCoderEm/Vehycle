import React from 'react'
import { Routes , Route } from 'react-router-dom';
import Home from './Pages/Home'
import Navbar from './Components/Navbar';
import Signup from './Pages/Signup';
import BackgroundBricks from './Components/BGtexture'

export default function Page(): React.ReactNode {
  return (
    <>
        <Navbar />
        <BackgroundBricks />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </>
  )
}
