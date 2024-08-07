import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../Context/Firebase';
import { useNavigate } from 'react-router-dom';

const Rolechdt: React.FC = () => {

  const nav = useNavigate()

  const[role, setrole] = useState<string>("consumer")
  const [user, setUser] = useState<any>(null)
  const[add, setadd] = useState<string>("")
  const[city, setcity] = useState<string>("")
  const[land, setland] = useState<string>("")
  const[con, setcon] = useState<number>(0)
  const[spe, setspe] = useState<string>("")
  const[hr, sethr] = useState<number>(0)
  const[des, setdes] = useState<string>("")
  const[def, setdef] = useState<string>("")
  const[pin, setpin] = useState<number>(0)
  const [fbid, setfbid] = useState<string | null>(null)

  const [avat, setavat] = useState<string>("")
  const [name, setname] = useState<string>("")

  const[clfind, setclfind] = useState<boolean>(false)
  const[prfind, setprfind] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setfbid(currentUser.uid)
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
        }
      } else {
        setUser(null);
        setclfind(false)
        setfbid(null);
        setprfind(false)
      }
    });
  
    return () => unsubscribe();
  }, [user, avat, clfind, prfind, role, fbid]);

  const getMbUserCl = async (uid: string) => {
    const response = await axios.get(`https://vehycle-server.vercel.app/usercl/getpart/${uid}`);
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
    const response = await axios.get(`https://vehycle-server.vercel.app/userpr/getpart/${uid}`);
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
    console.log(clfind, prfind)
    if(clfind){
        nav("/")
    }
    else if(prfind){
        nav("/")
    }
    else {
        nav("/rolechdt")
    }
  }, [user, clfind, prfind])


  const handleMDBup = async () => {
    if(role === "consumer"){
      const data = {
        fbid : fbid,
        role : role,
        name : name,
        img : avat,
        contact : con,
        nearby : city,
        pin : pin,
        current_defect : def,
        bookingscl : []
      }
      const response = await axios.post("https://vehycle-server.vercel.app/usercl/create",data);
      console.log(response)
      setTimeout(() => {
        nav("/")
      }, 1300);
    }
    if(role === 'supplier'){
      const data = {
        fbid : fbid,
        role : role,
        contact : con,
        name : name,
        img : avat,
        nearby : city,
        available : true,
        specialist : spe,
        hourlyrate : hr,
        desc : des,
        pin : pin,
        rating : [],
        bookings : []
      }
      const response = await axios.post("https://vehycle-server.vercel.app/userpr/create",data);
      console.log(response)
      setTimeout(() => {
        nav("/")
      }, 1300);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-transparent mt-10 flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-gradient-to-b from-gray-200 to-gray-300 sha rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="text-xl font-extrabold">Your Details</p>
                <p>Please fill out all the required fields.</p>
                <div className='pr-5'>
                <p className='font-bold mt-10'><span className='text-pink-600'>Every filed</span> is a <span className='text-pink-600'>required</span> field so you must fill out everything according to the <span className='text-pink-600'>role</span> that you choose.</p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3 font-semibold">
                    <label htmlFor="address">Address / Street</label>
                    <input
                      value={add}
                      onChange={(e:any) => setadd(e.target.value)}
                      type="text"
                      name="address"
                      id="address"
                      className="h-10 font-thin border mt-1 rounded px-4 focus:outline-none sha w-full bg-gray-50"
                      defaultValue=""
                      placeholder="4th cross of MG road ..."
                    />
                  </div>

                  <div className="md:col-span-2 font-semibold">
                    <label htmlFor="city">City</label>
                    <input
                      value={city}
                      onChange={(e:any) => setcity(e.target.value)}
                      type="text"
                      name="city"
                      id="city"
                      className="h-10 font-thin border mt-1 focus:outline-none sha rounded px-4 w-full bg-gray-50"
                      defaultValue=""
                      placeholder="Kolkata ..."
                    />
                  </div>

                  <div className="md:col-span-2 font-semibold">
                    <label htmlFor="country">Landmark</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 sha rounded items-center mt-1">
                      <input
                      value={land}
                      onChange={(e:any) => setland(e.target.value)}
                        name="country"
                        id="country"
                        placeholder="Near the statue ..."
                        className="px-4 appearance-none outline-none font-thin text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />

                    </div>
                  <div className="md:col-span-2 mt-2 font-semibold">
                    <label htmlFor="country">Pin</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 sha rounded items-center mt-1">
                      <input
                      value={pin}
                      onChange={(e:any) => setpin(e.target.value)}
                        name="country"
                        id="country"
                        placeholder="7773319 ..."
                        className="px-4 appearance-none outline-none font-thin text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />

                    </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Contact</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 sha rounded items-center mt-1">
                      <input
                      value={con}
                      onChange={(e:any) => setcon(e.target.value)}
                        type='number'
                        placeholder="9883623445 ..."
                        className="px-4 appearance-none outline-none font-thin text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />
                      
                    </div>
                  </div>

                  <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Role</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 sha rounded items-center mt-1">
                     
                     <select 
                     value={role}
                     onChange={(e:any) => setrole(e.target.value)}
                     className='w-full h-full bg-white p-2'>
                      <option value="" disabled>Select Below</option>
                      <option value="consumer">Consumer</option>
                      <option value="supplier">Supplier</option>
                     </select>
                      
                    </div>
                  </div>

                  {role === "consumer" &&
                  <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Current Defect</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 sha rounded items-center mt-1">
                     
                     <select 
                     value={def}
                     onChange={(e:any) => setdef(e.target.value)}
                     className='w-full h-full bg-white p-2'>
                      <option value="" disabled>Select Below</option>
                      <option value="engine">Car Engine</option>
                      <option value="diagonistic">Car Diagonistic</option>
                      <option value="performance">Car Performance</option>
                      <option value="body">Car Body</option>
                      <option value="paint">Car Paint</option>
                      <option value="detailing">Car Detailing</option>
                     </select>
                      
                    </div>
                  </div>
                  } 

                {role === "supplier" &&
                <>
                    <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Specialist</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 sha rounded items-center mt-1">
                    <select 
                     value={spe}
                     onChange={(e:any) => setspe(e.target.value)}
                     className='w-full h-full bg-white p-2'>
                      <option value="" disabled>Select Below</option>
                      <option value="engine">Engine Rebuilder</option>
                      <option value="diagonistic">Diagnostic Specialist</option>
                      <option value="performance">Performance Tuner</option>
                      <option value="body">Body Specialist</option>
                      <option value="paint">Paint Specialist</option>
                      <option value="detailing">Detailing Specialist</option>
                     </select>
                    </div>
                  </div>
                    <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Hourly Rate Rs.</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 sha rounded items-center mt-1">
                      <input
                      value={hr}
                      onChange={(e:any) => sethr(e.target.value)}
                        type='number'
                        placeholder="351 ..."
                        className="px-4 appearance-none outline-none font-thin text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />
                      
                    </div>
                  </div>
                    <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Description</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 sha rounded items-center mt-1">
                      <input
                      value={des}
                      onChange={(e:any) => setdes(e.target.value)}
                        type='name'
                        placeholder="I am a pretty good worker ..."
                        className="px-4 appearance-none outline-none font-thin text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />
                      
                    </div>
                  </div>
                  </>
                }

                  <div className="md:col-span-5 my-2 text-right">
                    <div className="flex items-center">
                      <button 
                      onClick={handleMDBup}
                      className="bg-gray-500 hover:bg-gray-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded flex relative hover:fill-white">
                        Next
                      <svg xmlns="http://www.w3.org/2000/svg" className='w-3 mx-2' viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rolechdt;
