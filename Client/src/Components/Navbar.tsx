import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar():React.ReactNode {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [icon, seticon] = useState(false);
  const[act, setact] = useState("home")

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togicon = () => {
    seticon(!icon);
  };

  return (
    <header className="lg:bg-transparent sm:backdrop-blur-sm bg-white/50 bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center bg-gray-900 p-2 rounded-lg">
          <Link to="/" onClick={() => setact("home")} className="flex items-center text-white">
            <img src="./logoveh.jpg" alt="logo" className='w-8 rounded-full mr-2' />
            <span className="text-lg text-white font-bold">V</span>ehycle
          </Link>
        </div>
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-10 backdrop-blur-sm bg-white/50 p-3 rounded-md sha">
            <li>
              <Link to="/" onClick={() => setact("home")} className={`text-sm font-semibold  hover:text-white p-2 rounded-lg transition-all duration-200 ${act === 'home' ? "bg-gray-900 text-white" : "text-black hov hover:text-white"}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setact("about")} className={`text-sm font-semibold  hover:text-white p-2 rounded-lg transition-all duration-200 ${act === 'about' ? "bg-gray-900 text-white" : "text-black hov hover:text-white"}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setact("features")} className={`text-sm font-semibold  hover:text-white p-2 rounded-lg transition-all duration-200 ${act === 'features' ? "bg-gray-900 text-white" : "text-black hov hover:text-white"}`}>
                Features
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setact("team")} className={`text-sm font-semibold  hover:text-white p-2 rounded-lg transition-all duration-200 ${act === 'team' ? "bg-gray-900 text-white" : "text-black hov hover:text-white"}`}>
                Team
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setact("pricing")} className={`text-sm font-semibold hover:text-white p-2 rounded-lg transition-all duration-200 ${act === 'pricing' ? "bg-gray-900 text-white" : "text-black hov hover:text-white"}`}>
                Pricing
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/sign-in"  onClick={() => setact("#")}
            className="inline-flex border bg-gray-900 border-gray-300 h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-all hover:scale-105 duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/sign-up" onClick={() => setact("#")}
            className="inline-flex h-9 items-center justify-center rounded-md border border-gray-900 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:scale-105 duration-200"
          >
            Sign Up
          </Link>
        </div>
        <button
          className="md:hidden flex items-center"
          onClick={toggleMenu}
        >
            {icon 
            ?
            <CrossIcon onClick={togicon} className="h-6 w-6" />
             :
            <MenuIcon onClick={togicon} className="h-6 w-6" />
            }
        </button>
      </div>
      {isMenuOpen && ( 
        <nav className="md:hidden">
          <ul className="flex flex-col w-full items-center gap-4 p-4 backdrop-blur-sm bg-slate-600/60">
            <li>
              <Link to="/" onClick={() => setact("home")} className={`text-sm font-semibold hover:underline p-2 rounded-lg transition-all duration-200 ${act === 'home' ? "bg-gray-900 sha text-white" : "text-black hov hover:text-white"}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setact("about")} className={`text-sm hover:text-white font-semibold hover:underline p-2 rounded-lg transition-all duration-200 ${act === 'about' ? "bg-gray-900 sha text-white" : "text-black hov hover:text-white"}`}>
                About
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => setact("features")} className={`text-sm hover:text-white font-semibold hover:underline p-2 rounded-lg transition-all duration-200 ${act === 'features' ? "bg-gray-900 sha text-white" : "text-black hov hover:text-white"}`}>
                Features
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setact("team")} className={`text-sm hover:text-white font-semibold hover:underline p-2 rounded-lg transition-all duration-200 ${act === 'team' ? "bg-gray-900 sha text-white" : "text-black hov hover:text-white"}`}>
                Team
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setact("pricing")} className={`text-sm font-semibold hover:text-white hover:underline p-2 rounded-lg transition-all duration-200 ${act === 'pricing' ? "bg-gray-900 sha text-white" : "text-black hov hover:text-white"}`}>
                Pricing
              </Link>
            </li>

            <div className='flex flex-col items-center gap-y-2 w-full rounded-lg backdrop-blur-sm bg-white/30'>
            <div className='pt-2'>
              <Link
                to="/sign-in" onClick={() => setact("#")}
                className="sha inline-flex bg-gray-900 h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium hover:text-black hover:bg-slate-300 text-white shadow transition-all duration-300 hover:bg-primary/90"
                >
                Sign In
              </Link>
            </div>
            <div className='pb-2'>
              <Link
                to="/sign-up" onClick={() => setact("#")}
                className="sha inline-flex h-9 items-center justify-center rounded-md border border-gray-900 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-gray-300"
                >
                Sign Up
              </Link>
            </div>
            </div>
          </ul>
        </nav>
      )}
    </header>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function CrossIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="6"
        height="6"
        viewBox="0 0 6 6"
        fill="#DC143C"
        stroke="#DC143C"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="1" y1="1" x2="5" y2="5" />
        <line x1="5" y1="1" x2="1" y2="5" />
      </svg>
    );
  }  