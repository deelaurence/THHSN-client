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
import { RiCheckboxBlankCircleLine } from 'react-icons/ri'



const ProductDetail = () => {

    const { isAdmin } = useTheme();
    const [isNewArrival, setIsNewArrival] = useState(false);
    const [isBestSeller, setIsBestSeller] = useState(false);
    const { products } = useSelector((state: RootState) => state.product);
    const {productsPublic,productsDrafts} = useSelector((state:RootState)=>state.product)
    const { status } = useSelector((state: RootState) => state.admin);
    const [currentVariation, setCurrentVariation] = useState(0)
    const [innerVariation, setInnerVariation]=useState<VariationLevelOne[]>()
    const [selectedVariant,setSelectedVariant]=useState(0)
    const [isFav,setisFav]=useState(false)


    const {name}=useParams()
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()

    let trimmedName = name ? name.trim() : "";
    let product:IProduct|IProductDraft = products.filter((product)=>{
        return product.name.replace(/\s+/g, '')===trimmedName.replace(/\s+/g, '')
    })[0]
    if(!product){
        product = productsPublic.filter((product)=>{
            return product.name.replace(/\s+/g, '')===trimmedName.replace(/\s+/g, '')
        })[0]
    }
    if(!product){
        product = productsDrafts.filter((product)=>{
            return product.name.replace(/\s+/g, '')===trimmedName.replace(/\s+/g, '')
        })[0]
    }
    if(!product){
        product = sdk.getSingleProductDetail()
    }
    sdk.setSingleProductDetail(product)
    // Update `innerVariation` whenever `currentVariation` changes
    useEffect(() => {
    if (product.variations&&product.variations[currentVariation]) {
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
    useEffect(() => {
        document.title = product.name;
        document.querySelector('meta[property="og:title"]')?.setAttribute('content', product.name);
        document.querySelector('meta[property="og:description"]')?.setAttribute('content', product.description || "Default description");
        if(product.images)
        document.querySelector('meta[property="og:image"]')?.setAttribute('content', product.coverImage ?? product.images[0]);
    }, [product]);
    return (
        <HelmetProvider>
        <div className='px-6 pb-12 '>
            <Helmet>
                <title>{product.name}</title>
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description} />
                {product.images&&product.images[0]&&<meta property="og:image" content={product.coverImage??product.images[0]} />}
                <meta property="og:type" content="product" />
            </Helmet>
            <PageHeader 
            heading='' 
            accent='' 
            backToLabel={isAdmin?`Inventory List`:'Back'} 
            backToRoute={isAdmin?sdk.manageInventoryRoute:'/'}/>
            {!product.images||!product.images[0]&&<Slideshow images={[sdk.placeholderImage]}/>}
            {product.images&&product.images[0]&&<Slideshow images={product.coverImage ? [product.coverImage, ...product.images] : product.images}/>}
            <div className='text-[10px] flex gap-1 items-center  pt-6'>
            <p>4.9</p>
            <p className='h-[3px] w-[3px] bg-neutral-300'></p>
            <p className='underline'>21 Reviews</p>
            </div>
            <h2 className='mt-2 mb-4 font-queens text-4xl'>{product.name}</h2>

            <p className='text-[10px]'>{product.description}</p>

            
            
            
            <div className='pt-6 mt-8 border-t-2 border-t-neutral-200 dark:border-t-primary-light  flex justify-between items-start'>
                {/* variation price */}
                {/* variation price */}
                {innerVariation&&<p className='text-2xl font-semibold font-queens'>
                    &#8358;{new Intl.NumberFormat('en-NG', { minimumFractionDigits: 0 }).format(innerVariation[selectedVariant].price)}
                </p>}
                
               
               
                {/* 💖 icon */}
               <div className='flex gap-2 items-center' >
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
            <div className=' flex gap-2 mt-6 flex-wrap'>
            {
                innerVariation?.map(({variation,price,quantity},index)=>{
                return(
                    <div
                    className={`w-fit flex items-center gap-4  ${selectedVariant===index?' border shadow border-yellow-600 bg-gradient-to-t from-secondary-darker to-secondary via-secondary dark:bg-gradient-to-tr dark:from-primary-light dark-to-primary dark:via-primary  ':'border-neutral-400 border dark:border-neutral-600 opacity-80 '}  p-3 px-4 relative  `}
                    key={index}
                    onClick={()=>{setSelectedVariant(index)}}>
                        <div>

                            <p className='uppercase -mb-1 text-[10px] font-medium'>
                                {variation}   
                            </p>
                            <p className='text-yellow-600 mt-1 hidden  opacity- text-[10px]'>
                                {quantity} in stock
                            </p>
                            <p className='text absolute opacity-0 right-2 bottom-0 font-serif '>
                                &#8358; {new Intl.NumberFormat('en-NG', { minimumFractionDigits: 0 }).format(price)}
                            </p>
                        </div>
                        {selectedVariant===index&&<IoMdCheckmark className='text-secondary text-xs rounded-full  p-[1px] bg-yellow-600 opacity-90 top-0 right-0'/>}
                        {selectedVariant!==index&&<RiCheckboxBlankCircleLine className=' text-xs rounded-full  p-[1px] opacity-90 top-0 right-0'/>}
                        
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
                {bestSeller:!isBestSeller,newArrival:isNewArrival}))}}>
                <BsStars className={`text-xl   ${isBestSeller ? 'text-yellow-600' : ' opacity-40'}`} />
                <span className={`text-sm   ${isBestSeller ? ' text-yellow-600' : ' opacity-40'}`}>Make Best Seller</span>
                </div>
            </section>
            
            </div>}

            {isAdmin&&<ImagePicker images={sdk.bestSellersAndNewArrivalsCoverImages} onPick={()=>{}}/>}

            {isAdmin?<Button onClick={handleEditMode} label='Edit'  size='large' extraClass='mt-16 font-thin bg-primary text-secondary py-3' loading={false} />:
            <Link
            className='mt-16 block'
            onClick={()=>{
                if(!product.variations)return
                const currentlySelectedVariant = product.variations[currentVariation].variations[selectedVariant]
                // @ts-ignore
                sdk.setCart({product,price:currentlySelectedVariant.price,quantity:1,variant:{type:product.variations[currentVariation].name,name:currentlySelectedVariant.variation}})
            }}
            to={sdk.cartRoute}>
            <Button label='Add to Cart'  size='large' extraClass=' font-thin bg-primary text-secondary py-3' loading={false} />
            </Link>}
        </div>
        </HelmetProvider>
        
    )
}

export default ProductDetail