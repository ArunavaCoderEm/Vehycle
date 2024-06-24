import React, { useState } from "react"
import Page from './Page'
import Loader from "./Components/Loader";

export default function App(): React.ReactNode {

  const [load, setload] = useState<boolean>(true);

  setTimeout(() => {
    setload(false)
  }, 2500);

  return (
    <>
      {load 
      
      ?

        <Loader />

      :

        <Page />

      }
    </>
  )
}