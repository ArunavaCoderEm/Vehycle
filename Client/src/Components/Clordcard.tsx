import React from 'react'

export default function Clordcard(props:any):React.ReactNode {
  return (
    <>
    <div className='bg-white my-3 flex border-[2px] border-pink-600 justify-between items-center p-2 rounded-lg h-auto'>
        <img src={props.img} alt={props.name} className='rounded-full border-[1px] border-pink-600 sha  w-10' />
        <h1 className='font-bold'><span className='text-pink-600'>Mechanic : </span> {props.name}</h1>
        <h1 className='font-bold'><span className='text-pink-600'>Place : </span> {props.place}</h1>
        <h1 className='font-bold'><span className='text-pink-600'>On : </span> {props.date}</h1>
        <h1 className='font-bold'><span className='text-pink-600'>Contact : </span> {props.con}</h1>
        <h1 className='font-bold'><span className='text-pink-600'>Status : </span> {props.sta}</h1>
    </div>
    </>
  )
}
