import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { auth, db } from '../Context/Firebase';
import Updatedetcl from '../Sections/UpdatedetCl';


export default function Dashboard():React.ReactNode {
  const [user, setUser] = useState<any | null>(null)
  const [role, setRole] = useState<string>("")
  const[clfind, setclfind] = useState<boolean>(false)
  const[prfind, setprfind] = useState<boolean>(false)
  const[avat, setavat] = useState<string>("")
  const[name, setname] = useState<string>("")

  const [address, setaddress] = useState<string>("")
  const [def, setdef] = useState<string>("")
  const [spe, setspe] = useState<string>("")
  const [con, setcon] = useState<number>(0)
  const [pin, setpin] = useState<number>(0)
  const [hr, sethr] = useState<number>(0)
  const [av, setav] = useState<boolean | null>(null)
  const [desc, setdesc] = useState<string>("")

  const [modal, setmodal] = useState<boolean>(false);


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
  
          getMbUserCl(currentUser.uid)
          getMbUserPr(currentUser.uid)
  
          } 
        else {
          setUser(null);
          setRole("")
          setclfind(false)
          setprfind(false)
        }
      });
    
      return () => unsubscribe();
    }, [modal, user, clfind, prfind, role, address, pin, def, spe, hr, con, desc]);


    const getMbUserCl = async (uid: string) => {
      const response = await axios.get(`http://localhost:8173/usercl/getpart/${uid}`);
      try {
        if (response) {
          setaddress(response.data[0].nearby)
          setdef(response.data[0].current_defect)
          setcon(response.data[0].contact)
          setpin(response.data[0].pin)
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
          setaddress(response.data[0].nearby)
          setspe(response.data[0].specialist)
          setcon(response.data[0].contact)
          sethr(response.data[0].hourlyrate)
          setav(response.data[0].available)
          setdesc(response.data[0].desc)
          setpin(response.data[0].pin)
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

    const openmodal = ():void => {
        setmodal(true);
    }

    const closemodal = ():void => {
        setmodal(false);
    }

  return (
    <>
      <div className='mt-20'>
        <div className='flex justify-center items-center'>
        <h1 className='text-4xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>Y</span>our <span className='text-pink-600'>D</span>ashboard</h1>
        <svg 
        onClick={openmodal}
        xmlns="http://www.w3.org/2000/svg" className='w-10 p-2 h-10 bg-pink-400 ml-5 cursor-pointer hover:bg-pink-500 transition-all duration-200 rounded-full' viewBox="0 0 512 512"><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1 0 32c0 8.8 7.2 16 16 16l32 0zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
        </div>
          <div className="p-4 mx-10 mt-8">

            {modal && 
            <>
            <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
            <div className='bg-white rounded-lg absolute z-[50] w-[90%] left-0 right-0 mx-auto px-4 py-3'>
              <button 
              onClick={closemodal}
              className='absolute right-10 mt-8 text-xl bg-pink-400 hover:bg-pink-500 transition-all duration-200 font-bold p-2 hover:text-white rounded-full'>
                X
              </button>
              {role === "Consumer" ? 
                <Updatedetcl
                
                con = {con}
                pin = {pin}
                def = {def}
                city = {address}
                close = {closemodal}
                
                />
                :
                <div>Hi</div>
              }
            </div>
            </>
            }

            <div className="mt-1">
              <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <img src={avat} alt="" />
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Your Name</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{name}</h4>
                  </div>
                </div>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-pink-600 to-pink-400 text-white shadow-pink-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                      <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Your Address</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{address}</h4>
                    <h4 className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">{pin}</h4>
                  </div>
                </div>

                {role === "Consumer" &&
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Current Defect</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{def}</h4>
                  </div>
                </div>
                }

                {role === "Supplier" &&
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                      <path d="M6.25 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM3.25 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM19.75 7.5a.75.75 0 00-1.5 0v2.25H16a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H22a.75.75 0 000-1.5h-2.25V7.5z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Specialist In</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{spe}</h4>
                  </div>
                </div>
                }

                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                  <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-orange-600 to-orange-400 text-white shadow-orange-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z"></path>
                    </svg>
                  </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Contact</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{con}</h4>
                  </div>
                </div>

                {role === "Supplier" &&
                <>
                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                    <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v8.173l4.084 2.278a.75.75 0 11-.668 1.348l-4.5-2.5a.75.75 0 01-.416-.671V3a.75.75 0 01.75-.75zM12 21a9 9 0 100-18 9 9 0 000 18zm0-1.5a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Available</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">{av ? "Yes" : "No"}</h4>
                  </div>
                </div>

                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-green-600 to-green-400 text-white shadow-green-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                    <path fill-rule="evenodd" d="M12 2a10 10 0 100 20 10 10 0 000-20zM9.293 13.707a1 1 0 010-1.414L11 10.586V7a1 1 0 112 0v4a1 1 0 01-.293.707l-3 3a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                  <div className="p-4 text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Hourly Rate</p>
                    <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">Rs. {hr}/hr</h4>
                  </div>
                </div>

                <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
                <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-purple-600 to-purple-400 text-white shadow-purple-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-6 h-6 text-white">
                    <path fill-rule="evenodd" d="M6 2.25a.75.75 0 00-1.5 0v19.5a.75.75 0 001.5 0V2.25zm12 0a.75.75 0 00-1.5 0v19.5a.75.75 0 001.5 0V2.25zm-7.5 3A.75.75 0 0111.25 6h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm0 3A.75.75 0 0111.25 9h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm0 3A.75.75 0 0111.25 12h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm0 3A.75.75 0 0111.25 15h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm0 3A.75.75 0 0111.25 18h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                  <div className="p-4 flex flex-col items-end text-right">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">Description</p>
                    <h4 className="antialiased w-2/3 tracking-normal flex items-end justify-end font-sans text-sm font-semibold text-right leading-snug text-blue-gray-900">{desc}</h4>
                  </div>
                </div>
                </>
                }


              </div>
              <div>
              <h1 className='text-xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>Y</span>our <span className='text-pink-600'>P</span>revious <span className='text-pink-600'>B</span>ookings</h1>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
