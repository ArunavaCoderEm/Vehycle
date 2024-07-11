import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth } from '../Context/Firebase';
import axios from 'axios';
import Mechcard from '../Components/Mechcard';

export default function Catepage():React.ReactNode {

    const [user, setUser] = useState<any | null>(null)
    const [role, setRole] = useState<string>("")
    const[clfind, setclfind] = useState<boolean>(false)
    const[prfind, setprfind] = useState<boolean>(false)
    const[sea, setsea] = useState<string>("")

    const [maparr, setMaparr] = useState<any[]>([])

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

    const [par, setPar] = useState<string>("")

    const params : any = useParams()

    useEffect(() => {
        const id = params.id;
        setsea(id)
        const capid = id.charAt(0).toUpperCase() + id.slice(1);
        window.scrollTo(0,0)
        setPar(capid);
    },[par])

    const getmechs = async () => {
      try {
        const res = await axios.get(`http://localhost:8173/seasor/getmech/${sea}`)
        setMaparr(res.data)
      } catch (e) {
        console.log("Error");
      }
    }

    useEffect(() => {
      getmechs();
    }, [par])

    console.log(maparr)

  return (
    <div className='mt-24'>

        {(role === "Consumer" && maparr.length) ?
            <>
                 <h1 className='text-4xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>Y</span>our <span className='text-pink-600'>{par}</span> <span className='text-pink-600'>M</span>echanics</h1>

                <div className='grid lg:grid-cols-3 gap-3 p-2'>

                 {(maparr).map((item, index) => (
                   <div className='' key={index}>
                    <Mechcard
                      img = {item.img}
                      alt = {item.name}
                      name= {item.name}
                      desc = {item.desc}
                      specialist = {item.specialist}
                      hourlyrate = {item.hourlyrate}
                      contact = {item.contact}
                      rating = {item.rating}
                      />
                   </div>
                ))}

           
                </div>   

               </>  

                :

                <h1 className='text-4xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>N</span>o <span className='text-pink-600'>M</span>echanics <span className='text-pink-600'>Y</span>et </h1> 

         
        }

        {role === "Supplier" &&
            <>
                 <h1 className='text-4xl text-center underline underline-offset-4 my-5 p-2 font-extrabold'><span className='text-pink-600'>Y</span>our <span className='text-pink-600'>{par}</span> <span className='text-pink-600'>C</span>ustomers</h1>
            </>
        }
        
    </div>
  )
}
