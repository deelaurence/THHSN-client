import BestSellersAndNewArrivals from './_BestSellersAndNewArrivals'
import image1 from "../../assets/images/BestSellers/1.png"
import image2 from "../../assets/images/BestSellers/2.png"
import image3 from "../../assets/images/BestSellers/3.png"
import image4 from "../../assets/images/BestSellers/4.png"
import image5 from "../../assets/images/BestSellers/5.png"
import image6 from "../../assets/images/BestSellers/6.png"
import { useEffect } from 'react'
import { AppDispatch,RootState } from '../../store/store'
import { useSelector,useDispatch } from 'react-redux'
import { fetchProductsPublic } from '../../store/fetchProductSlice'
import { Sdk } from '../../utils/sdk' 

const{mergeProductInDatabaseWithStaticImages}=new Sdk()


//static data not being used
let store=[
    {
        text:"Curly wavy hair extension",
        image:image4,
        secondaryImage:image2,
        price:200,
        path:"/"

    },
    {
        text:"hair extension Wavy",
        image:image2,
        secondaryImage:image6,
        price:200,
        path:"/"
    },
    {
        text:"Straight hair extension",
        image:image3,
        secondaryImage:image2,
        price:200,
        path:"/"
    },
    {
        text:"Lace Frontal",
        image:image1,
        secondaryImage:image6,
        price:200,
        path:"/"
    },
    {
        text:"Bundles",
        image:image5,
        secondaryImage:image1,
        price:200,
        path:"/"
    }
]




const BestSellers = () => {
    /**
     * The store contains the hardcoded value 
     * while the name and price has to be changed 
     * dynamically based on the items with
     * bestsellers=true in the database
     * 
     */
    const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
        dispatch(fetchProductsPublic())
    },[])
    const {productsPublic,statusPublic} = useSelector((state:RootState)=>{
        return state.product
    })

    const bestsellersInDatabase=productsPublic
    .filter((product => product.bestSeller))
    
  return (
    <div className='mt-32'>
        <BestSellersAndNewArrivals 
        title='Best Sellers' 
        subtitle='From wigs to bundles. to waves to curlies, shop our best sellers' 
        store={mergeProductInDatabaseWithStaticImages(store,bestsellersInDatabase,statusPublic!=="succeeded")}/>
    </div>
  )
}

export default BestSellers