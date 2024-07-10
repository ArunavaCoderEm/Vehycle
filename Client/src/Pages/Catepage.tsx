import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Catepage():React.ReactNode {

    const [par, setPar] = useState<string>("")

    const params : any = useParams()

    useEffect(() => {
        const id = params.id;
        window.scrollTo(0,0)
        setPar(id);
    },[par])

    console.log(par)

  return (
    <div className='mt-24'>{par}</div>
  )
}
