import React from 'react'
import { Routes , Route } from 'react-router-dom';
import Home from './Pages/Home'
import Navbar from './Components/Navbar';

export default function Page(): React.ReactNode {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    </>
  )
}
