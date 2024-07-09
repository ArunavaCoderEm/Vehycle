import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Context/Firebase';

export default function Footer():React.ReactNode {

    const [user, setUser] = useState<any | null>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
        }, [user]);

  return (
    <>
    <footer className="bg-gradient-to-b from-black/90 to-black rounded-lg  m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
            <div className="sm:flex sm:items-center sm:justify-between">
                <Link to="/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                    <img src="./logoveh.jpg" className="h-8 rounded-full" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">V<span className='font-light'>ehycle</span></span>
                </Link>
                <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <Link to="/" className="hover:underline me-4 md:me-6">Home</Link>
                    </li>
                    <li>
                        <Link to="/explore" className="hover:underline me-4 md:me-6">Explore</Link>
                    </li>
                    <li>
                        <Link to="/premium" className="hover:underline me-4 md:me-6">Premium</Link>
                    </li>
                    {user 

                    && 

                    <li>
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    </li>

                    }
                </ul>
            </div>
            <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400"><span className='text-pink-600'>©</span> 2024 <Link to="https://vehycle.vercel.app" className="hover:underline"><span className='text-pink-600'>V<span className='font-sm'>ehycle</span></span></Link>. All Rights Reserved.</span>
        </div>
    </footer>
    </>
  )
}
