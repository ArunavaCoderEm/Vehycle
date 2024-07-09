import React from 'react'

export default function About():React.ReactNode {
  return (
    <>
    <div>
        <h1 className='text-4xl text-center underline underline-offset-4 my-5 font-extrabold'><span className='text-pink-600'>A</span>bout <span className='text-pink-600'>V</span>ehycle</h1>
        <div className='grid p-2 lg:grid-cols-3 gap-2 sm:grid-cols-1'>
            <div className='bg-gradient-to-b from-black/70 sha rounded-lg p-2 to-black/80'>
                <h1 className='text-white text-2xl font-bold text-center'>Using as a consumer ?</h1>
                <ul className='py-2 px-4 text-white font-bold flex flex-col gap-y-5'>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mt-5'>Once you signup you will land to a page to fill your details as an customer.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg'>After you fill the form with required details you'll land in home page from there you can find the providers as per your need.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mb-5'>Once you signup you will land to a page to fill your details as an customer.</li>
                </ul>
            </div>
            <div className='bg-gradient-to-b from-black/70 rounded-lg to-black/80 p-2'>
                <h1 className='text-white text-2xl font-bold text-center'>Using as a provider ?</h1>
                <ul className='py-2 px-4 text-white font-bold flex flex-col gap-y-5'>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mt-5'>Once you signup you will land to a page to fill your details as an customer.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg'>After you fill the form with required details you'll land in home page from there you can find the providers as per your need.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mb-5'>Once you signup you will land to a page to fill your details as an customer.</li>
                </ul>
            </div>
            <div className='bg-gradient-to-b from-black/70 rounded-lg to-black/80 p-2'>
                <h1 className='text-white text-2xl font-bold text-center'>About Vehycle !</h1>
                <ul className='py-2 px-4 text-white font-bold flex flex-col gap-y-5'>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mt-5'>Once you signup you will land to a page to fill your details as an customer.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg'>After you fill the form with required details you'll land in home page from there you can find the providers as per your need.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mb-5'>Once you signup you will land to a page to fill your details as an customer.</li>
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}
