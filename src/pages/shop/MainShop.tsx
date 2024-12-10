import { fetchProductsPublic } from '../../store/fetchProductSlice'
import ProductListing from '../../components/ProductListing'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch,RootState } from '../../store/store'
import DashboardNav from '../../components/DashboardNav'
import { RxDragHandleDots2 } from 'react-icons/rx'

  

const MainShop = () => {
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
    //   component:<InventoryUnit filterProp={category}/>
    }
  })
  return (
    <section className='mt-12 px-6 flex flex-col gap-6'>
        <DashboardNav menuItems={menuItems}/>
        <ProductListing products={productsPublic}/>
    </section>
  )
}

export default MainShop