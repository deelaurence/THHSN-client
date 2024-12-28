import PageHeader from '../../components/PageHeader'
import { Sdk } from '../../utils/sdk'
import { Link, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Slideshow from '../../components/ImageSlide'
const sdk = new Sdk()
import { VariationLevelOne } from '../../interfaces/productInterface'
import Button from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store.ts';
import { setEditProductMode,addBestsellerAndNewArrival } from '../../store/adminSlice'
import { useNavigate } from 'react-router-dom'
import { LiaShippingFastSolid } from "react-icons/lia";
import { BsStars } from "react-icons/bs";
import Loader from '../../components/Loader.tsx'
import { useTheme } from '../../contexts/AppContext.tsx'
import ImagePicker from '../../components/ImagePicker.tsx'
import { IoMdCheckmark } from "react-icons/io";




const ProductDetail = () => {

    const { isAdmin } = useTheme();
    const [isNewArrival, setIsNewArrival] = useState(false);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const { products } = useSelector((state: RootState) => state.product);
    const {productsPublic} = useSelector((state:RootState)=>state.product)
    const { status } = useSelector((state: RootState) => state.admin);
    const [currentVariation, setCurrentVariation] = useState(0)
    const [innerVariation, setInnerVariation]=useState<VariationLevelOne[]>()
    const [selectedVariant,setSelectedVariant]=useState(0)



    const {name}=useParams()
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    let trimmedName = name ? name.trim() : "";
    let product = products.filter((product)=>{
        return product.name.replace(/\s+/g, '')===trimmedName.replace(/\s+/g, '')
    })[0]
    if(!product){
        product = productsPublic.filter((product)=>{
            return product.name.replace(/\s+/g, '')===trimmedName.replace(/\s+/g, '')
        })[0]
    }
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


    //update the state of bestseller and newArrival
    useEffect(()=>{
        setIsBestSeller(product.bestSeller)
        setIsNewArrival(product.newArrival)
    },[])


    const handleEditMode = ()=>{
        dispatch(setEditProductMode(true))
        navigate(sdk.addProductRoute)
    }
    
    return (
        <div className='px-6 pb-12 '>
            <PageHeader 
            heading='' 
            accent='' 
            backToLabel={isAdmin?`Inventory List`:'Back'} 
            backToRoute={isAdmin?sdk.manageInventoryRoute:'/'}/>
            <Slideshow images={product.coverImage ? [product.coverImage, ...product.images] : product.images}/>
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
                    setSelectedVariant(0)
                    }}
                    className={`${currentVariation===index?'':'opacity-40'} px-2 py-1 border border-neutral-600 dark:border-neutral-400 w-fit gap-4`}>
                    {variation.name}
                </div>
                <></>
                </div>
            )
            })}
            
            </div>




            {/* Choose Variant to cart */}
            <div className='mt-12  '>
            {
                innerVariation?.map(({variation,price,quantity},index)=>{
                return(
                    <div
                    className={`${selectedVariant===index?'border-b-yellow-600':'border-b-neutral-300 dark:border-b-neutral-600  opacity-80'}  p-1 pl-3  pr-6 relative border-b mt-6`}
                    key={index}
                    onClick={()=>{setSelectedVariant(index)}}
                    >
                    {selectedVariant===index&&<IoMdCheckmark className='text-secondary rounded-bl-lg p-[1px] bg-yellow-600 absolute top-0 right-0'/>}
                    <p className='uppercase -mb-1 font-medium'>
                        {variation}   
                    </p>
                    <p className='text-yellow-600 text-[10px]'>
                        {quantity} units 
                    </p>
                    <p className='text absolute right-1 -bottom-1 font-queens font-bold  '>
                        &#8358; {new Intl.NumberFormat('en-NG', { minimumFractionDigits: 0 }).format(price)}
                    </p>
                    </div>
                )
                })
            }
            </div>

            {/* BESTSELLER AND NEW ARRIVAL TOGGLE */}
            
            {isAdmin&&<div className='flex flex-col min-h-12  mt-12'>
            <div className={`flex justify-center relative z-0 -mb-6 items-center duration-1000  w-full ${status==='loading'?'opacity-100':'opacity-0'}`}>
                <Loader/>
            </div>
            <section className={`flex relative z-10 duration-1000 gap-4 ${status==='loading'?'opacity-0':'opacity-100'}`}>
                <div 
                className='flex  items-center gap-2 cursor-pointer'
                onClick={() =>{
                setIsNewArrival(!isNewArrival)
                dispatch(addBestsellerAndNewArrival(
                    {bestSeller:isBestSeller,newArrival:!isNewArrival}
                ))
                }}>
                <LiaShippingFastSolid className={`text-xl    ${isNewArrival ? 'text-green-500' : ' opacity-40'}`} />
                <span className={`text-sm   ${isNewArrival ? 'text-green-500 ' : ' opacity-40'}`}>Make New Arrival</span>
                </div>
                <div 
                className='flex  items-center gap-2 cursor-pointer'
                onClick={() => {
                setIsBestSeller(!isBestSeller)
                dispatch(addBestsellerAndNewArrival(
                {bestSeller:!isBestSeller,newArrival:isNewArrival}
                ))
                }
                }>
                <BsStars className={`text-xl   ${isBestSeller ? 'text-yellow-600' : ' opacity-40'}`} />
                <span className={`text-sm   ${isBestSeller ? ' text-yellow-600' : ' opacity-40'}`}>Make Best Seller</span>
                </div>
            </section>
            
            </div>}

            {isAdmin&&<ImagePicker images={sdk.bestSellersAndNewArrivalsCoverImages} onPick={()=>{console.log("picked")}}/>}

            {isAdmin?<Button onClick={handleEditMode} label='Edit'  size='large' extraClass='mt-16 font-thin bg-primary text-secondary py-3' loading={false} />:
            <Link
            className='mt-16 block'
            onClick={()=>{
                const currentlySelectedVariant = product.variations[currentVariation].variations[selectedVariant]
                sdk.setCart({product,price:currentlySelectedVariant.price,quantity:1,variant:{type:product.variations[currentVariation].name,name:currentlySelectedVariant.variation}})
            }}
            to={sdk.cartRoute+`/${product.name}`}>
            <Button label='Add to Cart'  size='large' extraClass=' font-thin bg-primary text-secondary py-3' loading={false} />
            </Link>}
        </div>
        
    )
}

export default ProductDetail