import React from 'react'
import { Link } from 'react-router-dom'

export default function Premium():React.ReactNode {
  return (
    <>
    <section className="mt-12">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
        <div className="mx-auto max-w-screen-md text-center flex flex-col items-center justify-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-t from-black/60 to-black/90">Subscribe to Vehycle Pro for better opportunities</h2>
            <p className="mb-5 font-light text-black">"Upgrade to Vehycle Pro for exclusive access to top-rated mechanics and priority service to keep your vehicle running smoothly".</p>
        </div>
          <div className="flex flex-col p-6 mx-auto max-w-lg text-center bg-gradient-to-b from-black/70 to-black/90 sha text-white rounded-lg">
              <h3 className="mb-4 text-2xl font-bold"><span className='text-pink-600'>E</span>ntry <span className='text-pink-600'>P</span>ro</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">Best for getting priorities in getting users in need.</p>
              <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold"><span className='text-pink-600'>₹</span>799</span>
                  <span className="text-gray-500 dark:text-gray-400">/ month</span>
              </div>

              <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3">
     
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Priority access to top-rated mechanics</span>
                  </li>
                  <li className="flex items-center space-x-3">
 
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>No setup, or hidden fees</span>
                  </li>
                  <li className="flex items-center space-x-3">

                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Network size: <span className="font-semibold">Extended network of over 500 mechanics</span></span>
                  </li>
                  <li className="flex items-center space-x-3">

                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Premium support: <span className="font-semibold">24/7 availability</span></span>
                  </li>
                  <li className="flex items-center space-x-3">
                      
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                      <span>Exclusive discounts on services</span>
                  </li>
              </ul>
              <Link to="/" className="text-white bg-gradient-to-b from-pink-600 to-pink-800 p-2 rounded-lg font-semibold transition-all duration-300 hover:scale-95">Experience Better</Link>
          </div>
      </div>
  </div>
</section>
    </>
  )
}
