import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Context/Firebase';
import axios from 'axios';

export default function Navbar():React.ReactNode {

  const nav = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [icon, seticon] = useState<boolean>(false);
  const[act, setact] = useState<string>("home");
  const [avat, setavat] = useState<string>("")
  const [name, setname] = useState<string>("")
  const [user, setUser] = useState<any>(null); 
  
  const[clfind, setclfind] = useState<boolean>(false)
  const[prfind, setprfind] = useState<boolean>(false)

  const[show, setShow] = useState<boolean>(false)

  const[role, setRole] = useState<string>("")

  const getMbUserCl = async (uid: string) => {
    const response = await axios.get(`http://localhost:8173/usercl/getpart/${uid}`);
    try {
      if (response) {
        console.log("USER FOUND in usercl");
        setclfind(true)
      } else {
        console.log("USER NOT FOUND in usercl");
        setclfind(false);
      }
      console.log(clfind)
    } catch (error) {
      setclfind(response.data.message)
      console.log(response)
    }
  };

  const getMbUserPr = async (uid: string) => {
    const response = await axios.get(`http://localhost:8173/userpr/getpart/${uid}`);
    try {
      if (response) {
        console.log("USER FOUND in userpr");
        setprfind(true);
      } else {
        console.log("USER NOT FOUND in userpr");
        setprfind(false);
      }
      console.log(response)
    } catch (error) {
      setprfind(response.data.message);
      console.log(response)
    }
  };


  useEffect(() => {
    setRole("")
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRef = db.collection('users').doc(currentUser.uid);
  
        try {
          const userDoc = await userRef.get();
          const userData:any = userDoc.data();
          if(userData){
            setavat(userData.avatar)
          } else {
            setavat(user.avatar)
          }
          
          if (!currentUser.displayName) {
            setname(userData.username);
          } else {
            setname(currentUser.displayName);
          }

          getMbUserCl(currentUser.uid)
          getMbUserPr(currentUser.uid)

        } catch (error) {
          console.error('Error fetching user document: ', error);
          setRole("")
        }
      } else {
        setUser(null);
        setRole("")
        setclfind(false)
        setprfind(false)
      }
    });
  
    return () => unsubscribe();
  }, [user, avat, clfind, prfind, role]);

  const handlelogout = ():void => {
    auth.signOut()
    .then(() => {
      setUser(null);
      setavat("")
      nav('/signin');
    })
    .catch((error) => {
      console.error('Error while logging out:', error);
    });
  }

  useEffect(() => {
    if (user) {
      nav('/'); 
    }
  }, [user]);


  useEffect(() => {
    if(clfind){
      setRole("Consumer")
    }
    else if(prfind){
      setRole("Supplier")
    }
    else {
      setRole("")
    }
  },[clfind, prfind, user, role])

  const toggleMenu = ():void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togicon = ():void => {
    seticon(!icon);
  };

  return (
    <header className="z-10 lg:bg-transparent sm:backdrop-blur-sm fixed w-full top-0 bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center bg-gray-900 p-2 rounded-lg">
          <Link to="/" onClick={() => setact("home")} className="flex hover:text-pink-400 transition-all duration-300 items-center text-white">
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
              <Link to="/explore" onClick={() => setact("explore")} className={`text-sm font-semibold  hover:text-white p-2 rounded-lg transition-all duration-200 ${act === 'explore' ? "bg-gray-900 text-white" : "text-black hov hover:text-white"}`}>
                Explore
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setact("pricing")} className={`text-sm font-semibold hover:text-white p-2 rounded-lg transition-all duration-200 ${act === 'pricing' ? "bg-gray-900 text-white" : "text-black hov hover:text-white"}`}>
                Pricing
              </Link>
            </li>
          </ul>
        </nav>
        {user 

        ?

        <div className="hidden md:flex items-center gap-2">
          <img 
          onClick={() => setShow(!show)}
          src={avat} alt="avat" className='w-9 border-2 border-black p-1 transition-all duration-200 hover:scale-105 rounded-full mx-2 cursor-pointer' />

          { show &&
          <div className='absolute mt-40 bg-gray-300 flex flex-col p-2 rounded-lg ml-[-25px] mx-auto'>
            <div className='backdrop-blur-sm mt-1 mb-1 rounded-lg flex border-2 border-black bg-gray-200/60 sha font-semibold mx-auto w-24 text-center p-2'>
            {role}
            </div>
            <div
            className="inline-flex border cursor-text bg-gray-900 border-gray-300 h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-all duration-200"
          >
            {name}
          </div>
          </div>
          }
           <Link to="/dashboard" onClick={() => setact("")} className='inline-flex border cursor-pointer bg-gray-900 border-gray-300 h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-all duration-200 hover:bg-black/80'>
              Dashboard
            </Link>
          <button
            onClick={handlelogout}
            className="inline-flex h-9 items-center justify-center rounded-md border border-gray-900 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:bg-black hover:text-white hover:border-pink-600 duration-200"
          >
            Log Out
          </button>
        </div>

        :

        <div className="hidden md:flex items-center gap-2">
          <Link
            to="/signin"  onClick={() => setact("#")}
            className="inline-flex border bg-gray-900 border-gray-300 h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white shadow transition-all hover:scale-105 duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/signup" onClick={() => setact("#")}
            className="inline-flex h-9 items-center justify-center rounded-md border border-gray-900 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:scale-105 duration-200"
          >
            Sign Up
          </Link>
        </div>

        }
        <button
          className="md:hidden flex items-center gap-5"
          onClick={toggleMenu}
          >
  
          {user &&
            <img src={avat} alt="avat" className='w-9 border-2 border-black p-1 transition-all duration-200 hover:scale-105 rounded-full mx-2 cursor-pointer lg:hidden' />
          }
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
          <ul className="flex flex-col w-full items-center gap-4 p-4 backdrop-blur-sm bg-white/60">
            <li>
              <Link to="/" onClick={() => setact("home")} className={`text-sm font-semibold hover:underline p-2 rounded-lg transition-all duration-200 ${act === 'home' ? "bg-gray-900 sha text-white" : "text-black hov hover:text-white"}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/explore" onClick={() => setact("explore")} className={`text-sm hover:text-white font-semibold hover:underline p-2 rounded-lg transition-all duration-200 ${act === 'explore' ? "bg-gray-900 sha text-white" : "text-black hov hover:text-white"}`}>
                Explore
              </Link>
            </li>
            <li>
              <Link to="/pricing" onClick={() => setact("pricing")} className={`text-sm font-semibold hover:text-white hover:underline p-2 rounded-lg transition-all duration-200 ${act === 'pricing' ? "bg-gray-900 sha text-white" : "text-black hov hover:text-white"}`}>
                Pricing
              </Link>
            </li>

            {user 
            
            ? 
            
            <>
            <li>
            <Link to="/dashboard" onClick={() => setact("dashboard")} className={`text-sm font-semibold hover:text-white hover:underline p-2 rounded-lg transition-all duration-200 ${act === 'dashboard' ? "bg-gray-900 sha text-white" : "text-black hov hover:text-white"}`}>
              Dashboard
            </Link>
          </li>

            <div className='flex flex-col justify-center items-center gap-y-2 w-full rounded-lg backdrop-blur-sm bg-white/30'>
            <div className='pt-2'>
              <div className='pb-2'>
                <div
                  className="sha inline-flex h-9 items-center justify-center rounded-md border border-gray-900 bg-white px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-gray-300"
                  >
                  {name}
                </div>
              </div>
            </div>
              <div className='pb-2'>
                <div
                  className="sha inline-flex h-9 items-center mx-auto justify-center rounded-md border border-gray-900 bg-transparent px-4 py-2 text-sm font-semibold shadow-sm transition-all duration-200 hover:bg-gray-300"
                  >
                  {role}
                </div>
              </div>
              <button
                onClick={handlelogout}
                className="sha inline-flex bg-gray-900 h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium hover:text-black hover:bg-slate-300 text-white shadow transition-all duration-300 hover:bg-primary/90 mb-2 mx-auto"
                >
                Log Out
              </button>
            </div>
            
            </>

              :

            <div className='flex flex-col items-center gap-y-2 w-full rounded-lg backdrop-blur-sm bg-white/30'>
            <div className='pt-2'>
              <Link
                to="/signin" onClick={() => setact("#")}
                className="sha inline-flex bg-gray-900 h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium hover:text-black hover:bg-slate-300 text-white shadow transition-all duration-300 hover:bg-primary/90"
                >
                Sign In
              </Link>
            </div>
            <div className='pb-2'>
              <Link
                to="/signup" onClick={() => setact("#")}
                className="sha inline-flex h-9 items-center justify-center rounded-md border border-gray-900 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all duration-200 hover:bg-gray-300"
                >
                Sign Up
              </Link>
            </div>
            </div>

            }

          </ul>
        </nav>
      )}
    </header>
  );
}

function MenuIcon(props: any):React.ReactNode {
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

function CrossIcon(props: any):React.ReactNode {
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