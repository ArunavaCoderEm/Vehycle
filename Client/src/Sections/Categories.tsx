import React, { useEffect, useState } from 'react'
import { auth } from '../Context/Firebase';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Categories():React.ReactNode {

    const [user, setUser] = useState<any | null>(null)
    const [role, setRole] = useState<string>("")
    const[clfind, setclfind] = useState<boolean>(false)
    const[prfind, setprfind] = useState<boolean>(false)

    useEffect(() => {
        setRole("")
        const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
          if (currentUser) {
            setUser(currentUser);
    
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
      }, [user, clfind, prfind, role]);


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

  return (
    <>
        { role === 'Consumer'

        &&

        <>
           <h1 className='text-4xl text-center underline underline-offset-4 my-5 font-extrabold'><span className='text-pink-600'>M</span>echanics <span className='text-pink-600'>Y</span>ou <span className='text-pink-600'>N</span>eed</h1>

           <div className='grid lg:grid-cols-6 grid-cols-3 px-5 py-3 gap-4'>
                <Link to="/" className='bg-gradient-to-b transition-all duration-300 sha hover:scale-95 p-2 from-black/50 to-black/80 rounded-lg'>
                    <img className='w-full mx-auto border-2 border-pink-600 rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_fMx5jrJuLInUMwbNKwrYxFCJ2_x_2ynFw&s" alt="engine" />
                    <h2 className='text-center my-2 font-bold text-white'>Engine related</h2>
                </Link>
                <Link to="/" className='bg-gradient-to-b transition-all duration-300 sha hover:scale-95 p-2 from-black/50 to-black/80 rounded-lg'>
                     <img className='w-full mx-auto border-2 border-pink-600 rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_fMx5jrJuLInUMwbNKwrYxFCJ2_x_2ynFw&s" alt="engine" />
                    <h2 className='text-center my-2 font-bold text-white'>Engine related</h2>
                </Link>
                <Link to="/" className='bg-gradient-to-b transition-all duration-300 sha hover:scale-95 p-2 from-black/50 to-black/80 rounded-lg'>
                     <img className='w-full mx-auto border-2 border-pink-600 rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_fMx5jrJuLInUMwbNKwrYxFCJ2_x_2ynFw&s" alt="engine" />
                    <h2 className='text-center my-2 font-bold text-white'>Engine related</h2>
                </Link>
                <Link to="/" className='bg-gradient-to-b transition-all duration-300 sha hover:scale-95 p-2 from-black/50 to-black/80 rounded-lg'>
                     <img className='w-full mx-auto border-2 border-pink-600 rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_fMx5jrJuLInUMwbNKwrYxFCJ2_x_2ynFw&s" alt="engine" />
                    <h2 className='text-center my-2 font-bold text-white'>Engine related</h2>
                </Link>
                <Link to="/" className='bg-gradient-to-b transition-all duration-300 sha hover:scale-95 p-2 from-black/50 to-black/80 rounded-lg'>
                     <img className='w-full border-2 border-pink-600 mx-auto rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_fMx5jrJuLInUMwbNKwrYxFCJ2_x_2ynFw&s" alt="engine" />
                    <h2 className='text-center my-2 font-bold text-white'>Engine related</h2>
                </Link>
                <Link to="/" className='bg-gradient-to-b transition-all duration-300 sha hover:scale-95 p-2 from-black/50 to-black/80 rounded-lg'>
                     <img className='w-full mx-auto border-2 border-pink-600 rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG_fMx5jrJuLInUMwbNKwrYxFCJ2_x_2ynFw&s" alt="engine" />
                    <h2 className='text-center my-2 font-bold text-white'>Engine related</h2>
                </Link>
           </div>
        </>

        }
        { role === 'Supplier'

        &&

        <>
           <h1 className='text-4xl text-center underline underline-offset-4 my-5 font-extrabold'><span className='text-pink-600'>C</span>ustomers <span className='text-pink-600'>Y</span>ou <span className='text-pink-600'>N</span>eed</h1>
        </>

        }
        { role === ''

        &&

        <>
           <h1 className='text-4xl text-center my-5 font-extrabold'><span className='text-pink-600'>S</span>ign <span className='text-pink-600'>U</span>p <span className='text-pink-600'>F</span>or <span className='text-pink-600'>U</span>sers</h1>
        </>

        }
    </>
  )
}
