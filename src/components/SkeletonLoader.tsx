import { Skeleton } from "@mui/material"
import { useTheme } from "../contexts/AppContext"
import React from "react"
const SkeletonLoader:React.FC<{
  extraClass?:string;
  customWidth?:string;
  customHeight?:string;
}> = ({extraClass,customWidth}) => {
const theme = useTheme().theme
  return (
    <div className={`h-64 sm:h-[24rem] relative overflow-hidden cursor-pointer ${extraClass}`}>
      <Skeleton  animation={theme=='dark'?"wave":"pulse"} className={`rounded-lg  dark:bg-primary-light ${customWidth} `} variant="rectangular" width={customWidth?undefined:250} height={200} />
      <Skeleton animation={theme=='dark'?"wave":"pulse"} className="dark:bg-primary-light" variant="text"  height={40} width={200} />
      <Skeleton className="dark:bg-primary-light" animation="wave" variant="text" width={150} />
    </div>
  )
}

export default SkeletonLoader
