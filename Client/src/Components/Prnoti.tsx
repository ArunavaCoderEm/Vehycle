import React from 'react'

export default function Prnoti(props:any):React.ReactNode {

    const handlereject = ():any => {
        props.handlerejectp();
    }

    const handleconfirm = ():any => {
        props.handleconfirmp();
    }

  return (
    <>
    <div className='flex flex-col md:flex-row my-3 bg-white rounded-md p-2 justify-between items-start md:items-center'>
        <div className='flex flex-col md:flex-row md:items-center md:gap-4 w-full md:w-auto'>
            <p className='font-bold text-sm md:text-base mb-2 md:mb-0'>
            {props.name} <span className='text-xs'>{props.def}</span>
            </p>
            <p className='font-bold text-sm md:text-base mb-2 md:mb-0'>
            {props.place}
            </p>
            <p className='font-bold text-sm md:text-base mb-2 md:mb-0'>
            {props.date}
            </p>
        </div>
        <div className='flex gap-4 mt-2 md:mt-0'>
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
