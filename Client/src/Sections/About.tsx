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
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mt-5'>Once you sign up, you'll be directed to a page to fill in your customer details.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg'>After completing the form, you'll be taken to the homepage where you can find providers to meet your needs.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mb-5'>Each provider will have a "Book Now" option based on their availability and proximity. You can book them based on categories in advance.</li>
                </ul>
            </div>
            <div className='bg-gradient-to-b sha from-black/70 rounded-lg to-black/80 p-2'>
                <h1 className='text-white text-2xl font-bold text-center'>Using as a provider ?</h1>
                <ul className='py-2 px-4 text-white font-bold flex flex-col gap-y-5'>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mt-5'>Once you sign up, you'll be directed to a page to fill in your provider details.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg'>After completing the form, you'll be taken to the homepage where you can find customers who might need you.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mb-5'>Each customer will have an "Apply Now" option based on their requirements. You can apply to address their issues, and if they are interested, they will book you in advance.</li>
                </ul>
            </div>
            <div className='bg-gradient-to-b sha from-black/70 rounded-lg to-black/80 p-2'>
                <h1 className='text-white text-2xl font-bold text-center'>About Vehycle !</h1>
                <ul className='py-2 px-4 text-white font-bold flex flex-col gap-y-5'>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mt-5'>Vehycle helps the customers find the mechanic providedrs near them to help them out and providers find the needy customers near them and earn money through that.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg'>Vehycle keeps 15% of the earnings of the providers of each service they provide.</li>
                    <li className='list-disc bg-pink-600 p-2 rounded-lg mb-5'>Buying a subscription from the "Premium" section gives both customers and providers priority in finding matches.</li>
                </ul>
            </div>
        </div>
    </div>
    </>
  )
}
