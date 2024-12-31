import { Skeleton } from "@mui/material"
import { useTheme } from "../contexts/AppContext"
const SkeletonLoader = () => {
const theme = useTheme().theme
  return (
    <div className="h-64 sm:h-[24rem] relative overflow-hidden cursor-pointer">
      <Skeleton  animation={theme=='dark'?"wave":"pulse"} className="rounded-lg dark:bg-primary-light" variant="rectangular" width={250} height={200} />
      <Skeleton animation={theme=='dark'?"wave":"pulse"} className="dark:bg-primary-light" variant="text"  height={40} width={200} />
      <Skeleton className="dark:bg-primary-light" animation="wave" variant="text" width={150} />
    </div>
  )
}

export default SkeletonLoader
