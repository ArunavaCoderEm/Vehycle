import React from 'react'

export default function Hero():React.ReactNode {
  return (
    <>
    <h1 className='text-center mt-20 lg:text-5xl text-2xl bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-500 font-extrabold m-3 p-3'>Vehycle : Find Reliable <span className='text-black'>Mechanics Near You</span> - Your Trusted Partner for All Vehicle Needs.</h1>
    <div className='grid lg:grid-cols-2 p-3 sm:grid-cols-1'>
        <div className='  p-2 flex flex-col items-center justify-center'>
          <img src="./heropic.jpg" alt="heropic" />
        </div>
        <div className='p-2 flex flex-col justify-center items-center'>
          <h2 className='text-black text-3xl font-extrabold'><span className='text-pink-600'>Vehycle</span> = <span className='text-pink-600'>Vehi</span>cle + Recy<span className='text-pink-600'>cle</span></h2>
          <ul className='w-3/4 my-5 p-3 rounded-lg'>
            <li className='list-disc my-1 text-[18px]'>
              <span className='font-bold text-pink-600 mr-2'>Convenient Sign-Up :</span>
              Easily register as a consumer or provider for car repair services with a streamlined sign-up flow.
            </li>
            <li className='list-disc my-1 text-[18px]'>
              <span className='font-bold text-pink-600 mr-2'>Fast Service Discovery :</span>
              Quickly find reliable mechanics and service providers in your area with intuitive search and filtering options.
            </li>
            <li className='list-disc my-1 text-[18px]'>
              <span className='font-bold text-pink-600 mr-2'>Secure Transactions :</span>
              Facilitate clear and direct communication between consumers and providers to discuss service details and requirements.
            </li>
            <li className='list-disc my-1 text-[18px]'>
              <span className='font-bold text-pink-600 mr-2'>Transparent Communication :</span>
              Easily register as a consumer or provider for car repair services with a streamlined sign-up flow.
            </li>
          </ul>
        </div>
    </div>
    </>
  )
}
