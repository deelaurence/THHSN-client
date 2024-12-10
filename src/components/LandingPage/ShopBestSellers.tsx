import { useEffect } from 'react'
import { AppDispatch,RootState } from '../../store/store'
import { useSelector,useDispatch } from 'react-redux'
import Loader from '../Loader'
import { fetchProductsPublic } from '../../store/fetchProductSlice'
import ProductListing from '../ProductListing'
const ShopBestSellers = () => {
  
    
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(fetchProductsPublic())
    },[])
    const {productsPublic,statusPublic} = useSelector((state:RootState)=>{
        return state.product
    })


    


  return (
    <section>
        {statusPublic==='loading'&&<Loader/>}
        {statusPublic==='succeeded'&&(
        <div className='px-6'>
            <h2 className='text-3xl mt-14 mb-10 text-center font-queens' >Shop Best Sellers</h2>
            <ProductListing products={productsPublic.slice(0,6)} />
        </div>
        )}
    </section>
  )
}

export default ShopBestSellers