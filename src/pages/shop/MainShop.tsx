import { fetchProductsPublic } from '../../store/fetchProductSlice'
import ProductListing from '../../components/ProductListing'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { AppDispatch,RootState } from '../../store/store'
import DashboardNav from '../../components/DashboardNav'
import { RxDragHandleDots2 } from 'react-icons/rx'
import { useParams } from 'react-router-dom'  

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
    <section className='mt-12 px-6 flex flex-col gap-6'>
        <DashboardNav showNav={param.name==undefined} menuItems={menuItems}/>
    </section>
  )
}

export default MainShop