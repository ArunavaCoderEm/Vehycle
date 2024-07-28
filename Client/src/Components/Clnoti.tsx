import React from 'react'

export default function Clnoti(props:any):React.ReactNode {

    const handlereject = ():any => {
        props.handlerejectc();
    }

    const handleconfirm = ():any => {
        props.handleconfirmc();
    }

  return (
    <>
    <div className='flex my-3 bg-white rounded-md p-2 justify-between items-center'>
        <p className='font-bold text-sm'>{props.name}</p>
        <p className='font-bold text-sm'>{props.place}</p>
        <p className='font-bold text-sm'>{props.date}</p>
        <div className='flex gap-x-4'>
            <button 
            onClick={handleconfirm}
            className='p-2 bg-pink-600 text-white text-sm  rounded-md font-semibold transition-all duration-200 hover:scale-95'>Confirm</button>
            <button 
            onClick={handlereject}
            className='p-2 bg-pink-600 text-white text-sm  rounded-md font-semibold transition-all duration-200 hover:scale-95'>Reject</button>
        </div>
    </div>
    </>
  )
}
