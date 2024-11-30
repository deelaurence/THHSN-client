import React, { useEffect } from 'react'
import { AppDispatch,RootState } from '../../store/store'
import { useSelector,useDispatch } from 'react-redux'
import Loader from '../Loader'
import { fetchProductsPublic } from '../../store/fetchProductSlice'
const ShopBestSellers = () => {
  
    
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(fetchProductsPublic())
    },[])
    const {productsPublic,errorPublic,statusPublic} = useSelector((state:RootState)=>{
        return state.product
    })

    
    
    


  return (
    <section>
        {statusPublic==='loading'&&<Loader/>}
        {statusPublic==='succeeded'&&(
        <div>
            <h2 className='text-3xl mt-14 mb-10 text-center font-queens' >Shop Best Sellers</h2>
            
        </div>
        )}
    </section>
  )
}

export default ShopBestSellers