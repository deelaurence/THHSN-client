import { fetchProductsPublic } from '../../store/fetchProductSlice'
import ProductListing from '../../components/ProductListing'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch,RootState } from '../../store/store'
import DashboardNav from '../../components/DashboardNav'
import { RxDragHandleDots2 } from 'react-icons/rx'
import { useParams } from 'react-router-dom'  
import SkeletonLoader from '../../components/SkeletonLoader'
const MainShop = () => {
    const param = useParams()
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(fetchProductsPublic())
    },[])
    const {productsPublic,categoriesPublic} = useSelector((state:RootState)=>{
        return state.product
    })
    //Use categories coming from reducer state [Straight from the api]
  const menuItems = categoriesPublic.map((category)=>{
    return {
      label:category,
      icon:<RxDragHandleDots2 className='opacity-60 text-xs' />,
      component:<ProductListing filterProps={category} products={productsPublic}/>
    }
  })
  return (
    <section className='mt-20 px-6 sm:px-16 flex flex-col gap-6'>
        {!productsPublic||!productsPublic[0]&&<div className="grid grid-cols-2 gap-6 -mt-8 mb-44" >
          <>
            {[...Array(6)].map((_, index) => (
            <SkeletonLoader key={index} />
            ))}
          </>
        </div>}
        <DashboardNav showNav={param.name==undefined} menuItems={menuItems}/>
    </section>
  )
}

export default MainShop