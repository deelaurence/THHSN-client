import React from 'react'
import { SlInfo } from 'react-icons/sl'

const SingleLineError:React.FC<{errorMessage:string}> = ({errorMessage}) => {
  return (
    <p className="dark:text-danger-light text-danger text-[10px] py-2 flex gap-1 items-center input-errors">
    <SlInfo /> {errorMessage} 
  </p>
  )
}

export default SingleLineError