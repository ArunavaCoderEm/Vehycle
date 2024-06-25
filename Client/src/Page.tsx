import React from 'react'
import { Routes , Route } from 'react-router-dom';
import Home from './Pages/Home'
import Navbar from './Components/Navbar';
import Signup from './Pages/Signup';
import Signin from './Pages/Signin';
import BackgroundBricks from './Components/BGtexture'
import Rolechdt from './Pages/Rolechdt';

export default function Page(): React.ReactNode {
  return (
    <>
        <Navbar />
        <BackgroundBricks />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/rolechdt" element={<Rolechdt />} />
        </Routes>
    </>
  )
}
