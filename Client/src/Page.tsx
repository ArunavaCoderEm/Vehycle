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
import Catepage from './Pages/Catepage';
import Premium from './Pages/Premium';
import Explore from './Pages/Explore';
import Chat from './Pages/Chat';
import PrivacyPolicy from './Pages/Privacy';


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
            <Route path="/catepage/:id" element={<Catepage />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/privacytnc" element={<PrivacyPolicy />} />
        </Routes>
        </div>
        <Footer />
    </>
  )
}
