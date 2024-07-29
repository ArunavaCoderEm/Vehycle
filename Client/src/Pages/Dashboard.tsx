import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { auth, db } from '../Context/Firebase';
import Updatedetcl from '../Sections/UpdatedetCl';
import Updatedetpr from '../Sections/Updatedetpr';
import Clordcard from '../Components/Clordcard';
import Suppordcard from '../Components/Suppordcard';
import Clnoti from '../Components/Clnoti';
import Prnoti from '../Components/Prnoti';
import Alert from '../Components/Alert';


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
  const [alert, setalert] = useState<boolean>(false);

  const [booking, setbooking] = useState<any[]>([]);
  const [noti, setnoti] = useState<any[]>([]);


  const [alde, setalde] = useState<string>("")
  const [altit, setaltit] = useState<string>("")


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
    }, [role ,modal, user, clfind, prfind]);


    useEffect(() => {
      if (user) {
        getMbUserCl(user.uid);
        getMbUserPr(user.uid);
      }
    }, [user, noti]);


    const getMbUserCl = async (uid: string) => {
      const response = await axios.get(`http://localhost:8173/usercl/getpart/${uid}`);
      try {
        if (response) {
          setaddress(response.data[0].nearby)
          setdef(response.data[0].current_defect)
          setcon(response.data[0].contact)
          setpin(response.data[0].pin)
          setbooking(response.data[0].bookingscl)
          setnoti(response.data[0].notification)
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

    function formatToDateString(isoDate: string): string {
      return new Date(isoDate).toISOString().split('T')[0];
    }
  
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
          setbooking(response.data[0].bookings)
          setnoti(response.data[0].notification)
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

    const handleconfirmp = async (provid: string) => {
        const data = {
          bookingId : provid,
          confirm : "yes"
        }
        try {
          const res = await axios.post("http://localhost:8173/book/bookpr/confirm", data);
          console.log(res)
          getMbUserCl(user.uid)
          getMbUserPr(user.uid)
          setaltit("Confirmed")
          setalde("Customer confirmed")
           setalert(true)
          setTimeout(() => {
            setalert(false)
          }, 1200);
        } catch (e) {
          console.log(e);
        }
    }

    const handlerejectp = async (provid:string) => {
      const data = {
        bookingId : provid,
        confirm : "no"
      }
      try {
        const res = await axios.post("http://localhost:8173/book/bookpr/confirm", data);
        console.log(res)
        getMbUserCl(user.uid)
        getMbUserPr(user.uid)
        setaltit("Rejected")
          setalde("Customer rejected")
           setalert(true)
          setTimeout(() => {
            setalert(false)
          }, 1200);
      } catch (e) {
        console.log(e);
      }
    }

    const handleconfirmc = async (cliid: string) => {
        const data = {
          bookingId : cliid,
          confirm : "yes"
        }
        try {
          const res = await axios.post("http://localhost:8173/book/bookcl/confirm", data);
          console.log(res)
          getMbUserCl(user.uid)
          getMbUserPr(user.uid)
          setaltit("Confirmed")
          setalde("Mechanic confirmed")
           setalert(true)
          setTimeout(() => {
            setalert(false)
          }, 1200);
        } catch (e) {
          console.log(e);
        }
    }

    const handlerejectc = async (cliid:string) => {
      const data = {
        bookingId : cliid,
        confirm : "no"
      }
      try {
        const res = await axios.post("http://localhost:8173/book/bookcl/confirm", data);
        console.log(res)
        getMbUserCl(user.uid)
        getMbUserPr(user.uid)
        setaltit("Rejected")
        setalde("Mechanic rejected")
         setalert(true)
        setTimeout(() => {
          setalert(false)
        }, 1200);
      } catch (e) {
        console.log(e);
      }
    }

  return (
    <>
      <div className='mt-20'>
        <div className='flex justify-center items-center'>
        <h1 className='text-4xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>Y</span>our <span className='text-pink-600'>D</span>ashboard</h1>
        </div>
        <div className='flex justify-end mr-5'>
        <button
          onClick={openmodal}
          className='bg-gradient-to-b from-pink-600 to-pink-800 flex justify-center items-center p-2 rounded-lg gap-x-2 font-semibold text-white hover:scale-95 transition-all duration-200'
          >
          Edit
        <svg 
        xmlns="http://www.w3.org/2000/svg" className='w-4' viewBox="0 0 512 512"><path fill='white' d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.7-9.2L288 94.6z"/></svg>
        </button>
        </div>

        {alert &&

        <div className='transition-all duration-200 fixed  z-[50] left-0 right-0'>
        <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
        <Alert 
          title = {altit}
          descr = {alde}
          />
        </div>

        }

          <div className="p-4 mx-10 mt-1">

            {modal && 
            <>
            <div className="fixed inset-0 bg-black opacity-70 z-40"></div>
            <div className='bg-white rounded-lg absolute z-[50] w-[90%] left-0 top-32 right-0 mx-auto px-4 py-3'>
              <button 
              onClick={closemodal}
              className='absolute right-10 mt-8 text-xl bg-pink-800 text-white hover:bg-pink-700 transition-all duration-200 w-8 h-8 font-semibold rounded-full'>
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
                
                <Updatedetpr
                
                con = {con}
                pin = {pin}
                spe = {spe}
                city = {address}
                hr = {hr}
                avl = {av}
                desc = {desc}
                close = {closemodal}
                
                />

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
              <h1 className='text-xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>Y</span>our <span className='text-pink-600'>R</span>ecent <span className='text-pink-600'>B</span>ookings</h1>

                <div className='w-[90%] p-2 h-48 bg-gray-300 mx-auto rounded-md overflow-auto'>

                {role === "Consumer" &&
                <>
                {booking.length ? 
                <>
                {booking.map((item, index) => (
                  <div key={index}>
                  <Clordcard 
                    img = {item.imgpr}
                    name = {item.provname}
                    date = {formatToDateString(item.date)}
                    place = {item.place}
                    con = {item.contact}
                    sta = {item.status}
                    spe = {item.spe}
                  />
                  </div>
                ))}
                </>
                : 
                <h1 className='font-bold text-lg my-3 text-center text-pink-600'>No bookings yet.</h1>
                }
                </>
              }

                {role === "Supplier" &&
                <>
                {booking.length ? 
                <>
                {booking.map((item, index) => (
                  <div key={index}>
                  <Suppordcard 
                    img = {item.imgcl}
                    name = {item.clientname}
                    date = {formatToDateString(item.date)}
                    place = {item.place}
                    sta = {item.status}
                    con = {item.contact}
                    def = {item.def}
                  />
                  </div>
                ))}
                </>
                : 
                <h1 className='font-bold text-lg my-3 text-center text-pink-600'>No bookings yet.</h1>
                }
                </>
              }
                </div>


                <h1 className='text-xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>Y</span>our <span className='text-pink-600'>N</span>otifications</h1>

                <div className='w-[90%] mt-5 p-2 h-48 bg-gray-300 mx-auto rounded-md overflow-auto'>

                {role === "Consumer" &&
                <>
                {noti.length ? 
                <>
                {noti.map((item, index) => (
                  <div key={index}>
                    <Clnoti 
                    date = {formatToDateString(item.date)}
                    place = {item.place}
                    name = {item.providername}
                    handleconfirmc = {() => handleconfirmc(item.consumerBookingId)}
                    handlerejectc = {() => handlerejectc(item.consumerBookingId)}
                    spe = {item.spe}
                    />
                  </div>
                ))}
                </>
                : 
                <h1 className='font-bold text-lg my-3 text-center text-pink-600'>No bookings yet.</h1>
                }
                </>
              }

                {role === "Supplier" &&
                <>
                {noti.length ? 
                <>
                {noti.map((item, index) => (
                  <div key={index}>
                    <Prnoti 
                      date = {formatToDateString(item.date)}
                      place = {item.place}
                      name = {item.clientname}
                      def = {item.def}
                      handleconfirmp = {() => handleconfirmp(item.providerBookingId)}
                      handlerejectp = {() => handlerejectp(item.providerBookingId)}
                    />
                  </div>
                ))}
                </>
                : 
                <h1 className='font-bold text-lg my-3 text-center text-pink-600'>No bookings yet.</h1>
                }
                </>
              }
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
