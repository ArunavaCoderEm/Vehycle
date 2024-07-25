import React, { useEffect, useState } from 'react';
import { auth } from '../Context/Firebase';
import axios from 'axios';
import Mechcard from '../Components/Mechcard';
import Clicard from '../Components/Clicard';

export default function Explore():React.ReactNode {

  const [user, setUser] = useState<any>(null);
  const [clfind, setclfind] = useState<boolean>(false);
  const [prfind, setprfind] = useState<boolean>(false);
  const [mypin, setmypin] = useState<number>(0);
  const [prarr, setPrarr] = useState<any[]>([]);
  const [fil, setfil] = useState<string>("none");
  const [role, setRole] = useState<string>("");
  const [nftext, setNFtext] = useState<string>("");


  const getMbUserCl = async (uid: string) => {
    try {
      const response = await axios.get(`http://localhost:8173/usercl/getpart/${uid}`);
      if (response.data) {
        console.log("USER FOUND in usercl");
        setclfind(true);
        setmypin(response.data[0].pin)
      } else {
        console.log("USER NOT FOUND in usercl");
        setclfind(false);
      }
    } catch (error) {
      console.error("Error fetching usercl data:", error);
      setclfind(false);
      setmypin(0)
      console.log(user);
    }
  };

  const getMbUserPr = async (uid: string) => {
    try {
      const response = await axios.get(`http://localhost:8173/userpr/getpart/${uid}`);
      if (response.data) {
        console.log("USER FOUND in userpr");
        setprfind(true);
        console.log(response.data[0].pin)
        setmypin(response.data[0].pin)
      } else {
        console.log("USER NOT FOUND in userpr");
        setprfind(false);
      }
    } catch (error) {
      console.error("Error fetching userpr data:", error);
      setprfind(false);
      setmypin(0)
    }
  };

  const getMechall = async () => {
    try {
      const res = await axios.get(`http://localhost:8173/userpr/getdata`);
      setPrarr(res.data);
    } catch (e) {
      console.log("error ", e);
      setNFtext("Looks Like You Dont Have Any Mechanic")
    }
  };

  const getClall = async () => {
    try {
      const res = await axios.get(`http://localhost:8173/usercl/getdata`);
      setPrarr(res.data);
    } catch (e) {
      console.log("error ", e);
      setNFtext("Looks Like You Dont Have Any Client")
    }
  };

  const getfillCl = async (params: number) => {
    try {
      const res = await axios.get(`http://localhost:8173/seasor/nearyousp/${params}`);
      setPrarr(res.data);
      if (!res.data.length) {
      }
    } catch (e) {
      console.log("error ", e);
    }
  };

  const getfillSp = async (params: number) => {
    try {
      const res = await axios.get(`http://localhost:8173/seasor/nearyousp/${params}`);
      setPrarr(res.data);
      if (!res.data.length) {
      }
    } catch (e) {
      console.log("error ", e);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        getMbUserCl(currentUser.uid)
        getMbUserPr(currentUser.uid);
      } else {
        setUser(null);
        setRole("");
        setclfind(false);
        setprfind(false);
      }
    });

    return () => unsubscribe();
  }, [user, fil, role, clfind, prfind]);

  useEffect(() => {
    if (clfind) {
      setRole("Consumer");
    } else if (prfind) {
      setRole("Supplier");
    } else {
      setRole("");
    }
  }, [clfind, prfind]);

  useEffect(() => {
    if (role === "Consumer" && fil === 'none') {
      getMechall();
    } 
    else if (role === "Supplier" && fil === 'none') {
      getClall();
    }

    if (role === "Consumer" && fil === "near") {
      getfillCl(mypin)
    } else if (role === "Supplier" && fil === "near") {
      getfillSp(mypin)
    }
  }, [role, fil, mypin]);


  return (
    <div className='mt-24'>
      {role === "Consumer" && (
        <>
          <h1 className='text-4xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'>
            <span className='text-pink-600'>E</span>xplore <span className='text-pink-600'>Y</span>our <span className='text-pink-600'>M</span>echanics
          </h1>
          <div className="md:col-span-2 font-semibold flex flex-col">
            <label htmlFor="state" className='text-center font-bold'>Filters to choose</label>
            <div className="h-10 w-36 mx-auto bg-gray-50 flex border border-gray-200 sha rounded items-center m-1">
              <select 
                value={fil}
                onChange={(e: any) => setfil(e.target.value)}
                className='w-full h-full bg-white p-2'>
                <option value="" disabled>Select Below</option>
                <option value="none">None</option>
                <option value="near">Near You</option>
              </select>
            </div>
          </div>
      
          <div className='grid lg:grid-cols-3 gap-4 p-2'>
            {prarr.map((item, index) => (
              <div key={index}>
                <Mechcard
                  img={item.img}
                  alt={item.name}
                  name={item.name}
                  desc={item.desc}
                  specialist={item.specialist}
                  hourlyrate={item.hourlyrate}
                  contact={item.contact}
                  rating={item.rating}
                />
              </div>
            ))}
          </div>

        </>
      )}

      {role === "Supplier" && (
        <>
          <div className='mt-20'>{prfind}</div>
          <h1 className='text-4xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'>
            <span className='text-pink-600'>E</span>xplore <span className='text-pink-600'>Y</span>our <span className='text-pink-600'>C</span>ustomers
          </h1>
          <div className="md:col-span-2 font-semibold flex flex-col">
            <label htmlFor="state" className='text-center font-bold'>Filters to choose</label>
            <div className="h-10 w-36 mx-auto bg-gray-50 flex border border-gray-200 sha rounded items-center m-1">
              <select 
                value={fil}
                onChange={(e: any) => setfil(e.target.value)}
                className='w-full h-full bg-white p-2'>
                <option value="" disabled>Select Below</option>
                <option value="none">None</option>
                <option value="near">Near You</option>
              </select>
            </div>
          </div>
         
          <div className='grid lg:grid-cols-3 gap-4 p-2'>
            {prarr.map((item, index) => (
              <div key={index}>
                <Clicard
                  img={item.img}
                  alt={item.name}
                  name={item.name}  
                  contact={item.contact}
                />
              </div>
            ))}
          </div>

        </>
      )}
    </div>
  );
}
