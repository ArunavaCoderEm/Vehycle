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
        <div className='flex flex-col md:flex-row my-3 bg-white rounded-md p-2 justify-between items-start md:items-center'>
        <div className='mb-2 md:mb-0'>
            <p className='font-bold text-sm md:text-base'>{props.name} <span className='text-xs'>{props.spe}</span></p>
        </div>
        <div className='mb-2 md:mb-0'>
            <p className='font-bold text-sm md:text-base'>{props.place}</p>
        </div>
        <div className='mb-2 md:mb-0'>
            <p className='font-bold text-sm md:text-base'>{props.date}</p>
        </div>
        <div className='flex gap-x-4 mt-2 md:mt-0'>
            <button 
            onClick={handleconfirm}
            className='p-2 bg-pink-600 text-white text-sm md:text-base rounded-md font-semibold transition-all duration-200 hover:scale-95'>
            Confirm
            </button>
            <button 
            onClick={handlereject}
            className='p-2 bg-pink-600 text-white text-sm md:text-base rounded-md font-semibold transition-all duration-200 hover:scale-95'>
            Reject
            </button>
        </div>
        </div>
    </>
  )
}
