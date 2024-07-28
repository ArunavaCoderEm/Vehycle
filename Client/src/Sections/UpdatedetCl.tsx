import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { auth } from '../Context/Firebase';

export default function Updatedetcl(props:any):React.ReactNode {

    const[city, setcity] = useState<string>(props.city)
    const[con, setcon] = useState<number>(props.con)
    const[def, setdef] = useState<string>(props.def)
    const[pin, setpin] = useState<number>(props.pin)
    const [uid, setuid] = useState<string>("")

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          setuid(currentUser.uid)
        }
        else {
          setuid("")
        }
      })
      return () => unsubscribe();
    }, [uid])

    const close = () => {
      props.close()
    }


    const handleMDBupfromupcl = async () => {
      const data = {
        contact : con,
        nearby : city,
        pin : pin,
        current_defect : def,
      }
      try {
        const response = await axios.put(`http://localhost:8173/usercl/update/${uid}`,data);
        console.log(response)
        close();
      } catch (e) {
        console.log(e);
      }
    }
    
  return (
    <div className='py-2'>
      <h1 className='text-2xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>Y</span>our <span className='text-pink-600'>D</span>etails</h1>
      <div className=' grid gap-y-6 gap-x-6 md:grid-cols-4 xl:grid-cols-4'>

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

        <div className="md:col-span-5 my-2 text-right">
          <div className="flex items-center justify-center">
            <button 
            onClick={handleMDBupfromupcl}
            className="bg-gray-500 hover:bg-gray-700 transition-all duration-200 text-white font-bold py-2 px-4 rounded flex items-center justify-center relative hover:fill-white">
              Save
            <svg xmlns="http://www.w3.org/2000/svg" className='w-3 mx-2' viewBox="0 0 448 512"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
