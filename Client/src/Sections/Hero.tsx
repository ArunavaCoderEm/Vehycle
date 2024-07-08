import React from 'react'
import ImageFade from '../Components/Imgfade'

export default function Hero():React.ReactNode {
  return (
    <>
    <h1 className='text-center mt-20 lg:text-5xl text-2xl bg-clip-text text-transparent bg-gradient-to-b from-gray-800 to-gray-500 font-extrabold m-3 p-3'>Vehycle : Find Reliable <span className='text-black'>Mechanics Near You</span> - Your Trusted Partner for All Vehicle Needs.</h1>
    <div className='grid lg:grid-cols-2 p-3 sm:grid-cols-1'>
        <div className='  p-2 flex flex-col rounded-lg items-center justify-center'>
          <ImageFade />
        </div>
        <div className='p-2 flex flex-col justify-center items-center'>
          <h2 className='text-black text-3xl font-extrabold'><span className='text-pink-600'>Vehycle</span> = <span className='text-pink-600'>Vehi</span>cle + Recy<span className='text-pink-600'>cle</span></h2>
          <h3 className='mt-4 bg-gradient-to-b from-black/30 font-semibold sha py-2 px-3 rounded-full'>💁🏻‍♂️ Helper at you door 💁🏻‍♂️</h3>
          <ul className='w-3/4 my-2 p-3 rounded-lg'>
            <li className='list-disc my-1 text-[18px]'>
              <span className='font-bold text-pink-600 mr-2'>Convenient Sign-Up :</span>
              Register quickly as a consumer or provider for car repair services with a streamlined process.
            </li>
            <li className='list-disc my-1 text-[18px]'>
              <span className='font-bold text-pink-600 mr-2'>Fast Service Discovery :</span>
              Easily locate reliable mechanics and service providers nearby with intuitive search and filters.
            </li>
            <li className='list-disc my-1 text-[18px]'>
              <span className='font-bold text-pink-600 mr-2'>Secure Transactions :</span>
              Enable clear and direct communication between consumers and providers to discuss service details efficiently
            </li>
            <li className='list-disc my-1 text-[18px]'>
              <span className='font-bold text-pink-600 mr-2'>Transparent Communication :</span>
              Quickly sign up as a consumer or provider for car repair services with a streamlined registration process.
            </li>
          </ul>
        </div>
    </div>
    </>
  )
}
