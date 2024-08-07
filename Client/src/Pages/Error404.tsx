import React from 'react'

function Error404():React.ReactNode {
  return (
    <div className='mt-20 h-[50vh] flex flex-col justify-center items-center'>
      <h1 className='text-6xl text-black font-extrabold text-center'>
        <span className='text-pink-600'>4</span>0<span className='text-pink-600'>4</span>
      </h1>
      <h1 className='text-2xl mt-4 text-black font-extrabold text-center'>
        <span className='text-pink-600'>O</span>ops <span className='text-pink-600'>P</span>age<span className='text-pink-600'> N</span>ot <span className='text-pink-600'>F</span>ound !!
      </h1>
    </div>
  )
}

export default Error404