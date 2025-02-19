import PageHeader from '../../components/PageHeader'
import { Sdk } from '../../utils/sdk'
import { Link, useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import Slideshow from '../../components/ImageSlide'
const sdk = new Sdk()
import { IProduct, IProductDraft, VariationLevelOne } from '../../interfaces/productInterface'
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
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { FaShare } from 'react-icons/fa'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import PriceToast from '../../components/PriceToast.tsx'
// import { RiCheckboxBlankCircleLine, RiCircleFill } from 'react-icons/ri'
import { fetchExchangeRate,fetchProductsPublic } from '../../store/fetchProductSlice.ts'
import SkeletonLoader from '../../components/SkeletonLoader.tsx'

const ProductDetail = () => {

    const { isAdmin,setSuccessFeedback } = useTheme();
    const [isNewArrival, setIsNewArrival] = useState(false);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const {products} = useSelector((state: RootState) => state.product);
    const {productsPublic,productsDrafts} = useSelector((state:RootState)=>state.product)
    const {status} = useSelector((state: RootState) => state.admin);
    const [currentVariation, setCurrentVariation] = useState(0)
    const [innerVariation, setInnerVariation]=useState<VariationLevelOne[]>()
    const [selectedVariant,setSelectedVariant]=useState(0)
    const [isFav,setisFav]=useState(false)
    const [showVariants, setShowVariants] = useState(false);    
    const [product,setProduct] = useState<IProduct|IProductDraft>()


    const {name}=useParams()
    const nameFromParams = name
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    
    //if for no reason the productsPubic is not in 
    //state for example if user is shared the URL
    //link by thier friend

    useEffect(()=>{
        if(productsPublic.length===0){
            dispatch(fetchProductsPublic())
            dispatch(fetchExchangeRate())
        }
    },[])
    

    //utility function to trim and remove whitespace
    const trimmedName = (name:string) => name.replace(/\s+/g, '').trim()


    const getSingleProduct=(arrayOfProducts:IProduct[]|IProductDraft[])=>{
        return arrayOfProducts.find((product)=>{
            return trimmedName(product.name)===trimmedName(nameFromParams||"")
        })
    }

    //Try and get product from either the drafts, 
    //products or productsPublic arrays
    useEffect(()=>{
        for (let list of [productsDrafts, products, productsPublic,]){
            const foundProduct = getSingleProduct(list);
            if (foundProduct) setProduct(foundProduct)
            if (product) break    
        }
    },[products,productsPublic,productsDrafts])
    

    
    // Update `innerVariation` whenever `currentVariation` changes
    useEffect(() => {
    
    if (product&&product.variations&&product.variations[currentVariation]) {
        setInnerVariation(product.variations[currentVariation].variations);
        sdk.setSingleProductDetail(product)
    }
    }, [product]);
    console.log(isAdmin)

    //update the state of bestseller and newArrival
    useEffect(()=>{
        if(!product){
            return
        }
        setIsBestSeller(product.bestSeller)
        setIsNewArrival(product.newArrival)
    },[])


    const handleEditMode = ()=>{
        dispatch(setEditProductMode(true))
        navigate(sdk.addProductRoute)
    }
    useEffect(() => {
        if(!product){
            return
        }  
        document.title = product.name;
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', product.name);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', product.description || "Default description");
        if(product.images)
        document.querySelector('meta[property="og:image"]')?.setAttribute('content', product.coverImage ?? product.images[0]);
    }, [product]);
    return (
        <HelmetProvider>
        {product&&product.name?
            <div 
            className='px-6 tablet:px-16 sm:px-44 pb-12 '>
                <Helmet>
                    <title>{product.name}</title>
                    <meta property="og:title" content={product.name} />
                    <meta property="og:description" content={product.description} />
                    {product.images&&product.images[0]&&<meta property="og:image" content={product.coverImage??product.images[0]} />}
                    <meta property="og:type" content="product" />
                </Helmet>
                <PageHeader 
                heading='' 
                accent='' />
                
                <main className='tablet:flex tablet:gap-14 md:flex md:gap-14 '>
                <div className='flex-[2]'>
                    {!product.images||!product.images[0]&&<Slideshow images={[sdk.placeholderImage]}/>}
                    {product.images&&product.images[0]&&<Slideshow images={product.coverImage ? [product.coverImage, ...product.images] : product.images}/>}
                </div>
                

                <section className='flex-[3] md:flex-[3]'>
                
                <div className='text-[10px] flex gap-1 items-center pt-6'>
                <p>4.9</p>
                <p className='h-[3px] w-[3px] bg-neutral-300'></p>
                <p className='underline'>21 Reviews</p>
                </div>
                <h2 className='mt-2 mb-4 font-queens text-4xl '>{product.name}</h2>

                <p className='text-[10px]  '>{product.description}</p>

                
                
                
                <div className='pt-6 mt-8 border-t-2 border-t-neutral-200 dark:border-t-primary-light  flex justify-between items-start'>
                    {/* variation price */}
                    {/* variation price */}
                    {innerVariation&&
                    <PriceToast className='text-2xl font-semibold font-queens' price={innerVariation[selectedVariant].price}/>
                    }
                    
                
                
                    {/* 💖 icon */}
                <div 
                
                className='flex gap-2 items-center' >
                        <div 
                            onClick={()=>{setisFav(!isFav)}}
                            className={`${isFav?'bg-red-200':'bg-neutral-200'} dark:bg-primary-light  w-fit p-2 rounded-full`}>
                            {!isFav?<GoHeart/>:
                            <GoHeartFill className='text-red-400'/>}
                        </div>
                        {/* Share button */}
                        <div className='flex items-center gap-2'>
                            <button 
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: product.name,
                                            text: `Hey, Check this out: ${product.name}`,
                                            url: window.location.href,
                                        }).catch((error) => console.error('Error sharing', error));
                                    } else {
                                        // Fallback for browsers that do not support the Web Share API
                                        alert('Web Share API is not supported in your browser.');
                                    }
                                }}
                                className='bg-yellow-600 text-secondary p-2 text-sm rounded-full'
                            >
                                <FaShare/>
                            </button>
                        </div>
                    </div>
                </div>
            


                {/* dropdown to toggle variation*/}
                {product.variations&&<div className='flex opacity-70 items-center'>
                    
                    <select 
                        value={currentVariation} 
                        onChange={(e) => {
                            const index = parseInt(e.target.value);
                            setCurrentVariation(index);
                            if(product.variations&&product.variations[index])
                            setInnerVariation(product.variations[index].variations);
                            setSelectedVariant(0);
                        }}
                        className='py-1  focus:outline-none capitalize bg-transparent w-fit gap-4'
                    >
                        {product.variations.map((variation, index) => (
                            <option key={index} value={index}>
                                {variation.name}
                            </option>
                        ))}
                    </select>
                    <MdOutlineKeyboardArrowDown className='text-xl opacity-70'/>
                </div>}

                {/* Choose Variant to cart */}
                <div className='mt-6 z-[99] relative'>
                    {/* <label htmlFor="variant-select" className='block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300'>
                        Choose a Variant
                    </label> */}
                    <div className='relative'>
                        <button
                            onClick={() => setShowVariants(!showVariants)}
                            className='py-2 px-4 border border-neutral-400 dark:border-neutral-600 bg-transparent w-full rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex justify-between items-center'
                        >
                            <p className='text-left text-xs'>
                                {innerVariation && innerVariation[selectedVariant] ? innerVariation[selectedVariant].variation : 'Select a variant'}
                            </p>
                            <MdOutlineKeyboardArrowDown className='text-xl opacity-70' />
                        </button>
                        {showVariants && (
                            <div className='absolute z-10 mt-2 w-full bg-white dark:bg-primary-light border border-neutral-400 dark:border-neutral-600 rounded-md shadow-lg'>
                                <ul className='max-h-60  overflow-y-auto'>
                                    {innerVariation?.map(({ variation,  quantity }, index) => (
                                        <div
                                        className='flex items-center border-b dark:border-b-neutral-600 justify-between py-2 px-4 hover:bg-neutral-200 dark:hover:bg-neutral-700 cursor-pointer'
                                        key={index}>
                                            <li
                                                onClick={() => {
                                                    setSelectedVariant(index);
                                                    setShowVariants(false);
                                                }}
                                                className='w-[90%] text-sm'>
                                                {variation}
                                                {isAdmin&&<span className=' text-[10px] opacity-40 italic'>  *{quantity} in stock</span>}  
                                            </li>
                                            {index===selectedVariant&&<IoMdCheckmark className=''/>}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
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
                    {bestSeller:!isBestSeller,newArrival:isNewArrival}))}}>
                    <BsStars className={`text-xl   ${isBestSeller ? 'text-yellow-600' : ' opacity-40'}`} />
                    <span className={`text-sm   ${isBestSeller ? ' text-yellow-600' : ' opacity-40'}`}>Make Best Seller</span>
                    </div>
                </section>
                
                </div>}


                {/* additional information */}
                <div className='py-6 mt-16 border-t  border-neutral-300 dark:border-neutral-800'>
                    <div className='flex gap-2 items-start'>
                        <LiaShippingFastSolid className='opacity-60' />
                        <p className='text-[10px] w-[90%] opacity-70'>Shipping costs will be calculated and added during the checkout process, ensuring transparency and accurate rates based on your delivery address and selected shipping method.</p>
                    </div>
                    
                </div>



                {isAdmin&&<ImagePicker images={sdk.bestSellersAndNewArrivalsCoverImages} onPick={()=>{}}/>}

                {isAdmin?<Button onClick={handleEditMode} label='Edit This Product'  size='large' extraClass='mt-16 capitalize font-thin dark:radial-gradient-bg bg-primary text-secondary py-2' loading={false} />:
                <Link
                className='mt-16 block'
                onClick={()=>{
                    if(!product.variations)return
                    const currentlySelectedVariant = product.variations[currentVariation].variations[selectedVariant]
                    // @ts-ignore
                    sdk.setCart({product,price:currentlySelectedVariant.price,quantity:1,variant:{type:product.variations[currentVariation].name,name:currentlySelectedVariant.variation}})
                    setSuccessFeedback(`${product.name} Added to cart`)
                }}
                to={sdk.cartRoute}>
                <Button label='Add to Cart'  size='large' extraClass=' font-thin  bg-primary text-secondary py-3' loading={false} />
                </Link>}
                </section>
                </main>
            </div>:
            <div className='flex my-12 px-6 sm:px-16 items-center justify-center'>
                <SkeletonLoader customWidth='w-full' customHeight='h-108' extraClass='w-screen h-screen'/>
            </div>
        }
        </HelmetProvider>
        
    )
}

export default ProductDetail