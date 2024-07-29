import React from 'react'

export default function Alert(props:any):React.ReactNode {
  return (
    <>
    <div className='mt-20'>
    <div className="bg-pink-100 border w-96 mx-auto z-[42] border-pink-400 text-pink-500 px-4 py-3 rounded relative" role="alert">
    <strong className="font-bold">{props.title}</strong>
    <span className="block sm:inline mx-10">{props.descr}</span>
    </div>
    </div>
    </>
  )
}
