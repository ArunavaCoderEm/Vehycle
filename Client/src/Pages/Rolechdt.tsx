import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { auth } from '../Context/Firebase';
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
  const[pin, setpin] = useState<number>(0)
  const [fbid, setfbid] = useState<string | null>(null)

  const[clfind, setclfind] = useState<boolean>(false)
  const[prfind, setprfind] = useState<boolean>(false)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser:any) => {
      if (currentUser) {
        setUser(currentUser)
        setfbid(currentUser.uid);
        getMbUserCl(currentUser.uid);
        getMbUserPr(currentUser.uid);
      } else {
        setfbid(null);
      }
    });
    return () => unsubscribe();
  }, [fbid, clfind, user]);

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
    console.log(clfind, prfind)
    if(clfind){
      setTimeout(() => {
        nav("/")
      }, 500);
    }
    else if(prfind){
      setTimeout(() => {
        nav("/")
      }, 500);
    }
    else {
      setTimeout(() => {
        nav("/rolechdt")
      }, 500);
    }
  }, [clfind, prfind, user])


  const handleMDBup = async () => {
    if(role === "consumer"){
      const data = {
        fbid : fbid,
        role : role,
        contact : con,
        nearby : city,
        pin : pin,
        bookingscl : []
      }
      const response = await axios.post("http://localhost:8173/usercl/create",data);
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
        nearby : city,
        available : true,
        specialist : spe,
        hourlyrate : hr,
        desc : des,
        pin : pin,
        rating : [],
        bookings : []
      }
      const response = await axios.post("http://localhost:8173/userpr/create",data);
      console.log(response)
      setTimeout(() => {
        nav("/")
      }, 1300);
    }
  }

  return (
    <div className="min-h-screen p-6 bg-transparent flex items-center justify-center">
      <div className="container max-w-screen-lg mx-auto">
        <div>
          <div className="bg-gradient-to-b from-gray-200 to-gray-300 sha rounded shadow-lg p-4 px-4 md:p-8 mb-6">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
              <div className="text-gray-600">
                <p className="text-xl font-extrabold">Your Details</p>
                <p>Please fill out all the required fields.</p>
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
                {role === "supplier" &&
                <>
                    <div className="md:col-span-2 font-semibold">
                    <label htmlFor="state">Specialist</label>
                    <div className="h-10 bg-gray-50 flex border border-gray-200 sha rounded items-center mt-1">
                      <input
                      value={spe}
                      onChange={(e:any) => setspe(e.target.value)}
                        type='name'
                        placeholder="Cleaner ..."
                        className="px-4 appearance-none outline-none font-thin text-gray-800 w-full bg-transparent"
                        defaultValue=""
                      />
                      
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
