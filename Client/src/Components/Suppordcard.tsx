import React from 'react'

export default function Suppordcard(props:any):React.ReactNode {
  return (
  <div className='bg-white my-3 p-2 flex flex-col md:flex-row border-[2px] border-pink-600 rounded-lg h-auto'>
    <div className='flex items-center mb-2 md:mb-0 md:mr-4'>
      <img src={props.img} alt={props.name} className='rounded-full border-[1px] border-pink-600 shadow w-10 h-10 md:w-12 md:h-12' />
    </div>
    <div className='flex flex-col md:flex-row md:flex-wrap md:gap-4'>
      <h1 className='font-bold text-sm md:text-base mb-1 md:mb-0'><span className='text-pink-600'>Customer: </span>{props.name} <span className='text-xs'>{props.def}</span></h1>
      <h1 className='font-bold text-sm md:text-base mb-1 md:mb-0'><span className='text-pink-600'>Place: </span>{props.place}</h1>
      <h1 className='font-bold text-sm md:text-base mb-1 md:mb-0'><span className='text-pink-600'>On: </span>{props.date}</h1>
      <h1 className='font-bold text-sm md:text-base mb-1 md:mb-0'><span className='text-pink-600'>Cont: </span>{props.con}</h1>
      <h1 className='font-bold text-sm md:text-base'><span className='text-pink-600'>Status: </span>{props.sta}</h1>
    </div>
  </div>
  )
}
