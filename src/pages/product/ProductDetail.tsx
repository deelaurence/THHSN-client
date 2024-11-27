import PageHeader from '../../components/PageHeader'
import { Sdk } from '../../utils/sdk'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Slideshow from '../../components/ImageSlide'
const sdk = new Sdk()
import { VariationLevelOne } from '../../interfaces/productInterface'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import { setEditProductMode } from '../../store/adminSlice'
import { useNavigate } from 'react-router-dom'

const ProductDetail = () => {
const { products } = useSelector((state: RootState) => state.product);
// const { editingProduct } = useSelector((state: RootState) => state.admin);
const [currentVariation, setCurrentVariation] = useState(0)
const [innerVariation, setInnerVariation]=useState<VariationLevelOne[]>()
const {name}=useParams()
const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate()

let trimmedName = name ? name.trim() : "";
let product = products.filter((product)=>{
    return product.name.replace(/\s+/g, '')===trimmedName.replace(/\s+/g, '')
})[0]
if(!product){
    product = sdk.getSingleProductDetail()
}
sdk.setSingleProductDetail(product)

// Update `innerVariation` whenever `currentVariation` changes
useEffect(() => {
if (product.variations[currentVariation]) {
    setInnerVariation(product.variations[currentVariation].variations);

}
}, [currentVariation]);


const handleEditMode = ()=>{
    dispatch(setEditProductMode(true))
    navigate(sdk.addProductRoute)
}
 
return (
    <div className='px-6 pb-12 '>
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
        <Button onClick={handleEditMode} label='Edit'  size='large' extraClass='mt-16' loading={false} />
    </div>
    
  )
}

export default ProductDetail