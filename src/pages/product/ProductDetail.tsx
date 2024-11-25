import React from 'react'
import PageHeader from '../../components/PageHeader'
import { Sdk } from '../../utils/sdk'
import { useParams } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { AppDispatch,RootState } from '../../store/store'
import { useState,useEffect } from 'react'
import Slideshow from '../../components/ImageSlide'
const sdk = new Sdk()
import { VariationLevelOne } from '../../interfaces/productInterface'

const ProductDetail = () => {
const dispatch:AppDispatch = useDispatch();
const { products, categories, status, error } = useSelector((state: RootState) => state.product);
const [currentVariation, setCurrentVariation] = useState(0)
const [innerVariation, setInnerVariation]=useState<VariationLevelOne[]>()
const {name}=useParams()
const product = products.filter(product=>product.name===name)[0]||sdk.getSingleProductDetail()
// const images = [
//     'https://images.unsplash.com/photo-1732423486660-43b0d2909e0b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8',
//     'https://images.unsplash.com/photo-1732465286852-a0b95393a90d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8',
//     'https://images.unsplash.com/photo-1732364756002-5a709ad5d794?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8'
// ]
sdk.setSingleProductDetail(product)

  // Update `innerVariation` whenever `currentVariation` changes
useEffect(() => {
if (product.variations[currentVariation]) {
    setInnerVariation(product.variations[currentVariation].variations);
}
}, [currentVariation]);

 
return (
    <div className='px-6 py-12'>
        <PageHeader heading='' accent='' backToLabel='Inventory List' backToRoute={sdk.manageInventoryRoute}/>
        <Slideshow images={product.images}/>
        <div className='text-[10px] flex gap-1 items-center  pt-6'>
            <p>4.9</p>
            <p className='h-[3px] w-[3px] bg-neutral-300'></p>
            <p className='underline'>21 Reviews</p>
        </div>
        <h2 className='mt-2 mb-4 font-queens text-4xl'>{product.name}</h2>

        <p className='text-[10px]'>{product.description}</p>
        
        <div className='flex gap-4 mt-6'>
        {product.variations.map((variation,index)=>{
            return(
                
                <div key={index}>
                    <div 
                        onClick={()=>{
                            setCurrentVariation(index)
                            setInnerVariation(variation.variations)
                            console.log(innerVariation)
                        }}
                        className={`${currentVariation===index?'':'opacity-30'} px-2 py-1 border border-neutral-600 dark:border-neutral-400 w-fit gap-4`}>
                        {variation.name}
                    </div>
                   <></>
                </div>
            )
        })}
        
        </div>
        <div className='mt-12  border-t-[1px] border-t-neutral-400 dark:border-t-neutral-600 dark:border-t '>
            {
                innerVariation?.map(({variation,price,quantity},index)=>{
                    return(
                        <div
                        className='mt-12 pb-2 border-b-[1px] border-b-neutral-300 dark:border-b-neutral-700 dark:border-b'
                        key={index}>
                            <p className='uppercase font-medium'>
                                {variation}   
                            </p>
                            <p className='text-yellow-600 text-[10px]'>
                                {quantity} units 
                            </p>
                            <p className='text-xs '>
                                &#8358; {new Intl.NumberFormat('en-NG', { minimumFractionDigits: 0 }).format(price)}
                            </p>
                        </div>
                    )
                })
            }
        </div>
    </div>
    
  )
}

export default ProductDetail