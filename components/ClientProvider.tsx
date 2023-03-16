"use client"
import { Toaster } from 'react-hot-toast'

const ClientProvider = () => {
  return (
    // The following is called a react fragment
    <> 
        <Toaster position="top-right"/>
    </>
  )
}

export default ClientProvider